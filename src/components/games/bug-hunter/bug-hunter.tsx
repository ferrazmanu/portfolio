import { Bug } from "./bug";
import { GameOver } from "./game-over";
import { ScoreBoard } from "./score-board";
import { useBugHunter } from "./use-bug-hunter";

export function BugHunter() {
  const {
    bestScore,
    bugs,
    bugsFixed,
    captureBug,
    hasSecretAchievement,
    hitMessages,
    ranking,
    score,
    spawnAreaRef,
    startGame,
    status,
    timeLeft,
  } = useBugHunter();

  return (
    <div className="flex min-h-full flex-col gap-3 bg-[#07110b] p-2 font-retro text-[#d6ffd8]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-[#5cff84]">Bug Hunter.exe</p>
          <p className="text-[11px] text-[#9dffb3]">
            Sistema de correção manual de erros
          </p>
        </div>

        {status === "running" ? (
          <span className="retro-border-inset bg-black px-2 py-1 text-[11px] text-[#5cff84]">
            ONLINE
          </span>
        ) : null}
      </div>

      <ScoreBoard
        bestScore={bestScore}
        bugsFixed={bugsFixed}
        score={score}
        timeLeft={timeLeft}
      />

      <div
        ref={spawnAreaRef}
        className="retro-border-inset relative mx-auto flex flex-1 w-full overflow-hidden bg-[#020806] bug-hunter-cursor"
      >
        <div className="pointer-events-none absolute inset-0 bug-hunter-grid" />

        {status === "idle" ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-4 text-center">
            <div>
              <p className="text-lg font-bold text-[#5cff84]">
                CAÇADOR DE BUGS ATIVADO
              </p>
              <p className="mt-2 max-w-sm text-xs text-[#b8ffc6]">
                Capture os erros antes que eles sumam do sistema.
              </p>
            </div>
            <button type="button" className="retro-button" onClick={startGame}>
              Iniciar Jogo
            </button>
          </div>
        ) : null}

        {status === "running"
          ? bugs.map((bug) => (
              <Bug key={bug.id} bug={bug} onCapture={captureBug} />
            ))
          : null}

        {hitMessages.map((message) => (
          <span
            key={message.id}
            className={[
              "pointer-events-none absolute z-10 text-[11px] font-bold bug-hunter-hit",
              message.isRare ? "text-[#ffd84a]" : "text-[#5cff84]",
            ].join(" ")}
            style={{ left: message.x, top: message.y }}
          >
            {message.text}
          </span>
        ))}

        {status === "over" ? (
          <GameOver
            bestScore={bestScore}
            hasSecretAchievement={hasSecretAchievement}
            ranking={ranking}
            score={score}
            onRestart={startGame}
          />
        ) : null}
      </div>
    </div>
  );
}
