import type {
  Direction,
  FloatingScore,
  Position,
  SnakeFood,
} from "./use-stack-snake";

interface SnakeBoardProps {
  boardSize: number;
  collectedLabels: string[];
  direction: Direction;
  floatingScores: FloatingScore[];
  food: SnakeFood;
  snake: Position[];
}

const directionLabels: Record<Direction, string> = {
  down: "v",
  left: "<",
  right: ">",
  up: "^",
};

const getFoodClassName = (food: SnakeFood) => {
  if (food.kind === "bug") return "border-[#ff6b6b] bg-[#2a0707] text-[#ff9b9b]";
  if (food.kind === "coffee") {
    return "border-[#ffd84a] bg-[#281d05] text-[#ffe58a]";
  }
  if (food.kind === "deploy") {
    return "border-[#7bdcff] bg-[#061a22] text-[#aeeeff]";
  }

  return "border-[#5cff84] bg-[#06180d] text-[#d6ffd8]";
};

const getCellKey = (x: number, y: number) => `${x}-${y}`;

export function SnakeBoard({
  boardSize,
  collectedLabels,
  direction,
  floatingScores,
  food,
  snake,
}: SnakeBoardProps) {
  const cells = Array.from({ length: boardSize * boardSize }, (_, index) => {
    const x = index % boardSize;
    const y = Math.floor(index / boardSize);

    return { x, y };
  });

  return (
    <div className="stack-snake-crt retro-border-inset relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden bg-[#020806]">
      <div
        className="grid h-full w-full stack-snake-grid"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((cell) => {
          const snakeIndex = snake.findIndex(
            (segment) => segment.x === cell.x && segment.y === cell.y,
          );
          const isHead = snakeIndex === 0;
          const isFood = food.position.x === cell.x && food.position.y === cell.y;
          const techLabel =
            collectedLabels.length > 0
              ? collectedLabels[
                  Math.max(0, collectedLabels.length - 1 - (snakeIndex % 6))
                ]
              : "";

          return (
            <div
              key={getCellKey(cell.x, cell.y)}
              className="relative min-h-0 border border-[#0b2f19]"
            >
              {snakeIndex >= 0 ? (
                <span
                  className={[
                    "absolute inset-[2px] flex items-center justify-center overflow-hidden border text-[8px] font-bold leading-none",
                    isHead
                      ? "border-[#d6ffd8] bg-[#5cff84] text-black shadow-[0_0_10px_rgba(92,255,132,0.8)]"
                      : "border-[#5cff84] bg-[#0b6f35] text-[#d6ffd8]",
                  ].join(" ")}
                >
                  {isHead ? directionLabels[direction] : techLabel.slice(0, 4)}
                </span>
              ) : null}

              {isFood ? (
                <span
                  className={[
                    "stack-snake-food absolute inset-[2px] flex items-center justify-center overflow-hidden border text-[8px] font-bold leading-none",
                    getFoodClassName(food),
                  ].join(" ")}
                >
                  {food.label.slice(0, 6)}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      {floatingScores.map((floatingScore) => (
        <span
          key={floatingScore.id}
          className={[
            "pointer-events-none absolute z-10 text-[11px] font-bold stack-snake-score-pop",
            floatingScore.points < 0 ? "text-[#ff9b9b]" : "text-[#5cff84]",
          ].join(" ")}
          style={{
            left: `${(floatingScore.position.x / boardSize) * 100}%`,
            top: `${(floatingScore.position.y / boardSize) * 100}%`,
          }}
        >
          {floatingScore.points > 0 ? "+" : ""}
          {floatingScore.points} {floatingScore.label}
        </span>
      ))}
    </div>
  );
}
