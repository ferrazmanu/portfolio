interface GameOverProps {
  score: number;
  ranking: string;
  bestScore: number;
  hasSecretAchievement: boolean;
  onRestart: () => void;
}

export function GameOver({
  score,
  ranking,
  bestScore,
  hasSecretAchievement,
  onRestart,
}: GameOverProps) {
  return (
    <div className="retro-border absolute inset-4 z-20 flex flex-col items-center justify-center bg-[#07110b] p-4 text-center text-[#d6ffd8] shadow-[0_0_24px_rgba(69,255,109,0.28)]">
      <p className="mb-4 text-lg font-bold text-[#5cff84]">
        BUG HUNTER FINALIZADO
      </p>

      <p className="text-sm">Pontuação: {score}</p>
      <p className="mt-3 text-xs text-[#9dffb3]">Classificação:</p>
      <strong className="text-base text-white">{ranking}</strong>
      <p className="mt-3 text-xs text-[#9dffb3]">Melhor pontuação: {bestScore}</p>

      {hasSecretAchievement ? (
        <p className="mt-4 max-w-sm text-xs text-[#ffd84a]">
          🏆 Deploy em produção numa sexta-feira às 18h sem incidentes.
        </p>
      ) : null}

      <button type="button" className="retro-button mt-5" onClick={onRestart}>
        Jogar Novamente
      </button>
    </div>
  );
}
