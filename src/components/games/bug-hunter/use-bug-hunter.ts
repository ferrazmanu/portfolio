import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type Bug = {
  id: string;
  x: number;
  y: number;
  points: number;
  lifetime: number;
};

export type GameStatus = "idle" | "running" | "over";

export type BugTarget = Bug & {
  name: string;
};

export type HitMessage = {
  id: string;
  x: number;
  y: number;
  text: string;
  isRare: boolean;
};

const GAME_DURATION = 60;
const BUG_SIZE = 42;
const BASE_SPAWN_INTERVAL = 1000;
const MIN_SPAWN_INTERVAL = 360;
const BASE_BUG_LIFETIME = 1700;
const MIN_BUG_LIFETIME = 650;
const RARE_BUG_CHANCE = 0.16;
const BEST_SCORE_STORAGE_KEY = "bug-hunter-best-score";
const LAST_SCORE_STORAGE_KEY = "bug-hunter-last-score";
const SECRET_ACHIEVEMENT_STORAGE_KEY = "bug-hunter-secret-achievement";
const BUG_NAMES = [
  "NullPointer",
  "Undefined",
  "CSS Goblin",
  "Merge Conflict",
  "Production Bug",
];

const getRanking = (score: number) => {
  if (score >= 801) return "Tech Lead";
  if (score >= 501) return "Desenvolvedora Sênior";
  if (score >= 251) return "Desenvolvedora Pleno";
  if (score >= 101) return "Desenvolvedora Júnior";

  return "Estagiária";
};

const getRandomBugName = () =>
  BUG_NAMES[Math.floor(Math.random() * BUG_NAMES.length)] ?? BUG_NAMES[0];

const getProgressionValue = (
  score: number,
  baseValue: number,
  minValue: number,
  step: number,
) => Math.max(minValue, baseValue - Math.floor(score / 100) * step);

const createBug = (
  width: number,
  height: number,
  score: number,
): BugTarget => {
  const isRare = Math.random() < RARE_BUG_CHANCE;
  const maxX = Math.max(0, width - BUG_SIZE);
  const maxY = Math.max(0, height - BUG_SIZE);

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    x: Math.round(Math.random() * maxX),
    y: Math.round(Math.random() * maxY),
    points: isRare ? 50 : 10,
    lifetime: getProgressionValue(
      score,
      BASE_BUG_LIFETIME,
      MIN_BUG_LIFETIME,
      90,
    ),
    name: isRare ? "Critical Bug" : getRandomBugName(),
  };
};

export function useBugHunter() {
  const [status, setStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [bugsFixed, setBugsFixed] = useState(0);
  const [spawnCount, setSpawnCount] = useState(0);
  const [bugs, setBugs] = useState<BugTarget[]>([]);
  const [hitMessages, setHitMessages] = useState<HitMessage[]>([]);
  const [bestScore, setBestScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [hasSecretAchievement, setHasSecretAchievement] = useState(false);
  const spawnAreaRef = useRef<HTMLDivElement>(null);
  const bugTimeoutsRef = useRef<Record<string, number>>({});

  const ranking = useMemo(() => getRanking(score), [score]);
  const spawnInterval = getProgressionValue(
    score,
    BASE_SPAWN_INTERVAL,
    MIN_SPAWN_INTERVAL,
    70,
  );

  const clearBugTimeouts = useCallback(() => {
    Object.values(bugTimeoutsRef.current).forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });
    bugTimeoutsRef.current = {};
  }, []);

  const removeBug = useCallback((bugId: string) => {
    const timeoutId = bugTimeoutsRef.current[bugId];

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      delete bugTimeoutsRef.current[bugId];
    }

    setBugs((currentBugs) =>
      currentBugs.filter((bugItem) => bugItem.id !== bugId),
    );
  }, []);

  const startGame = useCallback(() => {
    clearBugTimeouts();
    setStatus("running");
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setBugsFixed(0);
    setSpawnCount(0);
    setBugs([]);
    setHitMessages([]);
  }, [clearBugTimeouts]);

  const finishGame = useCallback(() => {
    clearBugTimeouts();
    setStatus("over");
    setBugs([]);
  }, [clearBugTimeouts]);

  const captureBug = useCallback(
    (bug: BugTarget) => {
      removeBug(bug.id);
      setScore((currentScore) => currentScore + bug.points);
      setBugsFixed((currentCount) => currentCount + 1);

      const hitMessage: HitMessage = {
        id: `hit-${bug.id}`,
        x: bug.x,
        y: bug.y,
        text:
          bug.points === 50
            ? "+50 Critical Bug Resolved"
            : `+10 Fixed ${bug.name}`,
        isRare: bug.points === 50,
      };

      setHitMessages((currentMessages) => [...currentMessages, hitMessage]);
      window.setTimeout(() => {
        setHitMessages((currentMessages) =>
          currentMessages.filter((message) => message.id !== hitMessage.id),
        );
      }, 850);
    },
    [removeBug],
  );

  useEffect(() => {
    const storedBestScore = window.localStorage.getItem(BEST_SCORE_STORAGE_KEY);
    const storedLastScore = window.localStorage.getItem(LAST_SCORE_STORAGE_KEY);
    const storedAchievement = window.localStorage.getItem(
      SECRET_ACHIEVEMENT_STORAGE_KEY,
    );

    const parsedBestScore = Number(storedBestScore);
    const parsedLastScore = Number(storedLastScore);

    if (Number.isFinite(parsedBestScore)) {
      setBestScore(parsedBestScore);
    }

    if (Number.isFinite(parsedLastScore)) {
      setLastScore(parsedLastScore);
    }

    setHasSecretAchievement(storedAchievement === "true");
  }, []);

  useEffect(() => {
    if (status !== "running") return;

    const intervalId = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(intervalId);
          finishGame();
          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [finishGame, status]);

  useEffect(() => {
    if (status !== "running") return;

    const spawnTimeoutId = window.setTimeout(() => {
      const area = spawnAreaRef.current;

      if (!area) return;

      const bug = createBug(area.clientWidth, area.clientHeight, score);

      setBugs((currentBugs) => [...currentBugs, bug]);
      bugTimeoutsRef.current[bug.id] = window.setTimeout(() => {
        removeBug(bug.id);
      }, bug.lifetime);
      setSpawnCount((currentCount) => currentCount + 1);
    }, spawnInterval);

    return () => window.clearTimeout(spawnTimeoutId);
  }, [removeBug, score, spawnCount, spawnInterval, status]);

  useEffect(() => {
    if (status !== "over") return;

    window.localStorage.setItem(LAST_SCORE_STORAGE_KEY, String(score));
    setLastScore(score);

    setBestScore((currentBestScore) => {
      const nextBestScore = Math.max(currentBestScore, score);
      window.localStorage.setItem(
        BEST_SCORE_STORAGE_KEY,
        String(nextBestScore),
      );

      return nextBestScore;
    });

    if (score > 1000) {
      window.localStorage.setItem(SECRET_ACHIEVEMENT_STORAGE_KEY, "true");
      setHasSecretAchievement(true);
    }
  }, [score, status]);

  useEffect(() => clearBugTimeouts, [clearBugTimeouts]);

  return {
    bestScore,
    bugs,
    bugsFixed,
    captureBug,
    hasSecretAchievement,
    hitMessages,
    lastScore,
    ranking,
    score,
    spawnAreaRef,
    startGame,
    status,
    timeLeft,
  };
}
