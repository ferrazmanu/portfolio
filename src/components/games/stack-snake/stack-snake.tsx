import { GameOver } from "./game-over";
import { ScoreBoard } from "./score-board";
import { SnakeBoard } from "./snake-board";
import { useStackSnake } from "./use-stack-snake";

export function StackSnake() {
  const {
    achievements,
    bestLength,
    bestScore,
    boardSize,
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
    startGame,
    status,
  } = useStackSnake();

  return (
    <div className="flex min-h-full flex-col gap-3 bg-[#07110b] p-2 font-retro text-[#d6ffd8]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-[#5cff84]">Stack Snake.exe</p>
          <p className="text-[11px] text-[#9dffb3]">
            Evolução de stack em modo cobrinha
          </p>
        </div>

        {status === "running" ? (
          <span className="retro-border-inset bg-black px-2 py-1 text-[11px] text-[#5cff84]">
            RUNNING
          </span>
        ) : null}
      </div>

      <ScoreBoard
        bestLength={bestLength}
        bestScore={bestScore}
        collectedCount={collectedCount}
        isCoffeeActive={isCoffeeActive}
        lastScore={lastScore}
        score={score}
        snakeLength={snake.length}
      />

      <div className="relative flex flex-1 flex-col items-center justify-center gap-3 overflow-hidden">
        <SnakeBoard
          boardSize={boardSize}
          collectedLabels={collectedLabels}
          direction={direction}
          floatingScores={floatingScores}
          food={food}
          snake={snake}
        />

        {evolutionMessage ? (
          <div className="retro-border absolute top-4 z-10 bg-[#07110b] px-3 py-2 text-xs font-bold text-[#5cff84] shadow-[0_0_18px_rgba(92,255,132,0.35)]">
            {evolutionMessage}
          </div>
        ) : null}

        {status === "idle" ? (
          <div className="retro-border absolute inset-4 z-20 flex flex-col items-center justify-center bg-[#07110b] p-4 text-center text-[#d6ffd8] shadow-[0_0_24px_rgba(69,255,109,0.28)]">
            <p className="text-lg font-bold text-[#5cff84]">STACK SNAKE.EXE</p>
            <p className="mt-2 max-w-sm text-xs text-[#b8ffc6]">
              Colete tecnologias, aumente sua stack e evite bater no legado.
            </p>
            <button type="button" className="retro-button mt-5" onClick={startGame}>
              Iniciar
            </button>
          </div>
        ) : null}

        {status === "over" ? (
          <GameOver
            achievements={achievements}
            playedSeconds={playedSeconds}
            ranking={ranking}
            score={score}
            snakeLength={snake.length}
            technologiesCollected={collectedCount}
            onRestart={startGame}
          />
        ) : null}

        <div className="grid grid-cols-3 gap-1 sm:hidden" aria-label="Controles touch">
          <span />
          <button
            type="button"
            className="retro-button h-9 w-12 px-0"
            aria-label="Mover para cima"
            onClick={() => changeDirection("up")}
          >
            ^
          </button>
          <span />
          <button
            type="button"
            className="retro-button h-9 w-12 px-0"
            aria-label="Mover para esquerda"
            onClick={() => changeDirection("left")}
          >
            {"<"}
          </button>
          <button
            type="button"
            className="retro-button h-9 w-12 px-0"
            aria-label="Mover para baixo"
            onClick={() => changeDirection("down")}
          >
            v
          </button>
          <button
            type="button"
            className="retro-button h-9 w-12 px-0"
            aria-label="Mover para direita"
            onClick={() => changeDirection("right")}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
