import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type Position = {
  x: number;
  y: number;
};

export type Food = {
  id: string;
  label: string;
  points: number;
  position: Position;
};

export type Direction = "up" | "down" | "left" | "right";
export type GameStatus = "idle" | "running" | "over";

export type SnakeFood = Food & {
  kind: "tech" | "bug" | "coffee" | "deploy";
};

export type FloatingScore = {
  id: string;
  label: string;
  points: number;
  position: Position;
};

const BOARD_SIZE = 20;
const INITIAL_SPEED = 210;
const MIN_SPEED = 88;
const SPEED_STEP = 18;
const BEST_SCORE_STORAGE_KEY = "stack-snake-best-score";
const BEST_LENGTH_STORAGE_KEY = "stack-snake-best-length";
const LAST_SCORE_STORAGE_KEY = "stack-snake-last-score";
const ACHIEVEMENTS_STORAGE_KEY = "stack-snake-achievements";
const COFFEE_DURATION = 5000;

const INITIAL_SNAKE: Position[] = [
  { x: 9, y: 10 },
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];

const TECHNOLOGIES: Array<Omit<SnakeFood, "id" | "position" | "kind">> = [
  { label: "React", points: 10 },
  { label: "TypeScript", points: 15 },
  { label: "Next.js", points: 20 },
  { label: "Tailwind", points: 10 },
  { label: "Node.js", points: 15 },
  { label: "Git", points: 10 },
  { label: "Prisma", points: 20 },
  { label: "Docker", points: 25 },
];

const SPECIAL_FOODS: Array<Omit<SnakeFood, "id" | "position">> = [
  { kind: "bug", label: "Bug", points: -20 },
  { kind: "coffee", label: "Coffee", points: 25 },
  { kind: "deploy", label: "Deploy", points: 75 },
];

const ACHIEVEMENTS = [
  {
    id: "first-production-app",
    minLength: 20,
    label: "🏆 Primeira aplicação em produção",
  },
  {
    id: "bugless-deploy",
    minLength: 40,
    label: "🏆 Deploy sem bugs",
  },
  {
    id: "frontend-master",
    minLength: 60,
    label: "🏆 Mestre do Front-End",
  },
] as const;

const DIRECTION_DELTAS: Record<Direction, Position> = {
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: -1 },
};

const KEY_DIRECTIONS: Record<string, Direction> = {
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  KeyA: "left",
  KeyD: "right",
  KeyS: "down",
  KeyW: "up",
};

const isSamePosition = (position: Position, target: Position) =>
  position.x === target.x && position.y === target.y;

const isOppositeDirection = (direction: Direction, nextDirection: Direction) =>
  (direction === "up" && nextDirection === "down") ||
  (direction === "down" && nextDirection === "up") ||
  (direction === "left" && nextDirection === "right") ||
  (direction === "right" && nextDirection === "left");

const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const getRanking = (score: number) => {
  if (score >= 1201) return "Lenda do Stack Overflow";
  if (score >= 801) return "Arquiteta Front-End";
  if (score >= 501) return "Front-End Sênior";
  if (score >= 251) return "Front-End Pleno";
  if (score >= 101) return "Front-End Júnior";

  return "HTML Apprentice";
};

const getSpeed = (score: number, coffeeUntil: number) => {
  const baseSpeed = Math.max(
    MIN_SPEED,
    INITIAL_SPEED - Math.floor(score / 100) * SPEED_STEP,
  );

  return Date.now() < coffeeUntil ? Math.max(MIN_SPEED, baseSpeed - 45) : baseSpeed;
};

const getRandomPosition = (blockedPositions: Position[]) => {
  const availablePositions: Position[] = [];

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const position = { x, y };

      if (!blockedPositions.some((blocked) => isSamePosition(blocked, position))) {
        availablePositions.push(position);
      }
    }
  }

  return (
    availablePositions[Math.floor(Math.random() * availablePositions.length)] ?? {
      x: 0,
      y: 0,
    }
  );
};

const createFood = (snake: Position[]): SnakeFood => {
  const shouldCreateSpecial = Math.random() < 0.14;
  const specialFood =
    SPECIAL_FOODS[Math.floor(Math.random() * SPECIAL_FOODS.length)];
  const technology =
    TECHNOLOGIES[Math.floor(Math.random() * TECHNOLOGIES.length)] ??
    TECHNOLOGIES[0];

  if (shouldCreateSpecial && specialFood) {
    return {
      ...specialFood,
      id: createId("food"),
      position: getRandomPosition(snake),
    };
  }

  return {
    ...technology,
    id: createId("food"),
    kind: "tech",
    position: getRandomPosition(snake),
  };
};

const readNumberStorage = (key: string) => {
  const value = Number(window.localStorage.getItem(key));

  return Number.isFinite(value) ? value : 0;
};

const readAchievementStorage = () => {
  const storedAchievements = window.localStorage.getItem(
    ACHIEVEMENTS_STORAGE_KEY,
  );

  if (!storedAchievements) return [];

  try {
    const parsedValue: unknown = JSON.parse(storedAchievements);

    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
};

export function useStackSnake() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<SnakeFood>(() => createFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState<Direction>("right");
  const [score, setScore] = useState(0);
  const [collectedCount, setCollectedCount] = useState(0);
  const [collectedLabels, setCollectedLabels] = useState<string[]>([]);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [bestLength, setBestLength] = useState(INITIAL_SNAKE.length);
  const [lastScore, setLastScore] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([]);
  const [evolutionMessage, setEvolutionMessage] = useState<string | null>(null);
  const [coffeeUntil, setCoffeeUntil] = useState(0);
  const directionRef = useRef<Direction>("right");
  const startedAtRef = useRef<number | null>(null);
  const timersRef = useRef<number[]>([]);

  const ranking = useMemo(() => getRanking(score), [score]);
  const speed = useMemo(() => getSpeed(score, coffeeUntil), [coffeeUntil, score]);
  const isCoffeeActive = Date.now() < coffeeUntil;
  const achievements = ACHIEVEMENTS.filter((achievement) =>
    unlockedAchievements.includes(achievement.id),
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  }, []);

  const scheduleTimeout = useCallback((callback: () => void, delay: number) => {
    const timerId = window.setTimeout(callback, delay);
    timersRef.current.push(timerId);
  }, []);

  const changeDirection = useCallback((nextDirection: Direction) => {
    if (isOppositeDirection(directionRef.current, nextDirection)) return;

    directionRef.current = nextDirection;
    setDirection(nextDirection);
  }, []);

  const startGame = useCallback(() => {
    const nextFood = createFood(INITIAL_SNAKE);

    clearTimers();
    directionRef.current = "right";
    startedAtRef.current = Date.now();
    setStatus("running");
    setSnake(INITIAL_SNAKE);
    setFood(nextFood);
    setDirection("right");
    setScore(0);
    setCollectedCount(0);
    setCollectedLabels([]);
    setPlayedSeconds(0);
    setFloatingScores([]);
    setEvolutionMessage(null);
    setCoffeeUntil(0);
  }, [clearTimers]);

  const finishGame = useCallback(
    (finalScore: number, finalLength: number) => {
      setStatus("over");
      window.localStorage.setItem(LAST_SCORE_STORAGE_KEY, String(finalScore));
      setLastScore(finalScore);
      setBestScore((currentBestScore) => {
        const nextBestScore = Math.max(currentBestScore, finalScore);
        window.localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(nextBestScore));

        return nextBestScore;
      });
      setBestLength((currentBestLength) => {
        const nextBestLength = Math.max(currentBestLength, finalLength);
        window.localStorage.setItem(BEST_LENGTH_STORAGE_KEY, String(nextBestLength));

        return nextBestLength;
      });
    },
    [],
  );

  const showFloatingScore = useCallback(
    (nextFood: SnakeFood, points: number) => {
      const floatingScore: FloatingScore = {
        id: createId("score"),
        label: nextFood.label,
        points,
        position: nextFood.position,
      };

      setFloatingScores((currentScores) => [...currentScores, floatingScore]);
      scheduleTimeout(() => {
        setFloatingScores((currentScores) =>
          currentScores.filter((scoreItem) => scoreItem.id !== floatingScore.id),
        );
      }, 900);
    },
    [scheduleTimeout],
  );

  const unlockAchievements = useCallback((snakeLength: number) => {
    setUnlockedAchievements((currentAchievements) => {
      const nextAchievements = ACHIEVEMENTS.reduce<string[]>(
        (achievementIds, achievement) =>
          snakeLength >= achievement.minLength &&
          !achievementIds.includes(achievement.id)
            ? [...achievementIds, achievement.id]
            : achievementIds,
        currentAchievements,
      );

      window.localStorage.setItem(
        ACHIEVEMENTS_STORAGE_KEY,
        JSON.stringify(nextAchievements),
      );

      return nextAchievements;
    });
  }, []);

  const applyFoodEffect = useCallback(
    (currentSnake: Position[], nextHead: Position, currentFood: SnakeFood) => {
      const multiplier = Date.now() < coffeeUntil ? 2 : 1;
      const points =
        currentFood.points > 0 ? currentFood.points * multiplier : currentFood.points;
      const nextScore = Math.max(0, score + points);
      const previousMilestone = Math.floor(score / 100);
      const nextMilestone = Math.floor(nextScore / 100);
      const grownSnake = [nextHead, ...currentSnake];
      const nextSnake =
        currentFood.kind === "bug"
          ? grownSnake.slice(0, Math.max(3, grownSnake.length - 3))
          : grownSnake;

      setScore(nextScore);
      setCollectedCount((currentCount) => currentCount + 1);
      setCollectedLabels((currentLabels) =>
        currentFood.kind === "tech"
          ? [...currentLabels.slice(-5), currentFood.label]
          : currentLabels,
      );
      showFloatingScore(currentFood, points);

      if (currentFood.kind === "coffee") {
        setCoffeeUntil(Date.now() + COFFEE_DURATION);
      }

      if (nextMilestone > previousMilestone) {
        setEvolutionMessage("Stack evoluindo...");
        scheduleTimeout(() => setEvolutionMessage(null), 1200);
      }

      unlockAchievements(nextSnake.length);
      setFood(createFood(nextSnake));

      return nextSnake;
    },
    [
      coffeeUntil,
      score,
      scheduleTimeout,
      showFloatingScore,
      unlockAchievements,
    ],
  );

  useEffect(() => {
    const storedBestScore = readNumberStorage(BEST_SCORE_STORAGE_KEY);
    const storedBestLength = readNumberStorage(BEST_LENGTH_STORAGE_KEY);
    const storedLastScore = readNumberStorage(LAST_SCORE_STORAGE_KEY);

    setBestScore(storedBestScore);
    setBestLength(Math.max(INITIAL_SNAKE.length, storedBestLength));
    setLastScore(storedLastScore);
    setUnlockedAchievements(readAchievementStorage());
  }, []);

  useEffect(() => {
    if (status !== "running") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const nextDirection = KEY_DIRECTIONS[event.code] ?? KEY_DIRECTIONS[event.key];

      if (!nextDirection) return;

      event.preventDefault();
      changeDirection(nextDirection);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, status]);

  useEffect(() => {
    if (status !== "running") return;

    const intervalId = window.setInterval(() => {
      setPlayedSeconds(
        startedAtRef.current
          ? Math.floor((Date.now() - startedAtRef.current) / 1000)
          : 0,
      );
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [status]);

  useEffect(() => {
    if (status !== "running") return;

    const intervalId = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0] ?? INITIAL_SNAKE[0];
        const movement = DIRECTION_DELTAS[directionRef.current];
        const nextHead = {
          x: head.x + movement.x,
          y: head.y + movement.y,
        };
        const hitWall =
          nextHead.x < 0 ||
          nextHead.y < 0 ||
          nextHead.x >= BOARD_SIZE ||
          nextHead.y >= BOARD_SIZE;
        const willEatFood = isSamePosition(nextHead, food.position);
        const bodyToCheck = willEatFood ? currentSnake : currentSnake.slice(0, -1);
        const hitSelf = bodyToCheck.some((segment) =>
          isSamePosition(segment, nextHead),
        );

        if (hitWall || hitSelf) {
          finishGame(score, currentSnake.length);
          return currentSnake;
        }

        if (willEatFood) {
          return applyFoodEffect(currentSnake, nextHead, food);
        }

        return [nextHead, ...currentSnake.slice(0, -1)];
      });
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [applyFoodEffect, finishGame, food, score, speed, status]);

  useEffect(() => clearTimers, [clearTimers]);

  return {
    achievements,
    bestLength,
    bestScore,
    boardSize: BOARD_SIZE,
    changeDirection,
    collectedCount,
    collectedLabels,
    direction,
    evolutionMessage,
    floatingScores,
    food,
    isCoffeeActive,
    lastScore,
    playedSeconds,
    ranking,
    score,
    snake,
    speed,
    startGame,
    status,
  };
}
