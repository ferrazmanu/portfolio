interface GameOverProps {
  achievements: Array<{
    id: string;
    label: string;
  }>;
  playedSeconds: number;
  ranking: string;
  score: number;
  snakeLength: number;
  technologiesCollected: number;
  onRestart: () => void;
}

export function GameOver({
  achievements,
  playedSeconds,
  ranking,
  score,
  snakeLength,
  technologiesCollected,
  onRestart,
}: GameOverProps) {
  return (
    <div className="retro-border absolute inset-4 z-20 flex flex-col items-center justify-center bg-[#07110b] p-4 text-center text-[#d6ffd8] shadow-[0_0_24px_rgba(69,255,109,0.28)]">
      <p className="mb-4 text-lg font-bold text-[#5cff84]">GAME OVER</p>

      <p className="text-sm">Pontuação: {score}</p>
      <p className="text-sm">Tecnologias coletadas: {technologiesCollected}</p>
      <p className="text-sm">Tempo jogado: {playedSeconds}s</p>
      <p className="text-sm">Tamanho final: {snakeLength}</p>

      <p className="mt-3 text-xs text-[#9dffb3]">Classificação:</p>
      <strong className="text-base text-white">{ranking}</strong>

      {achievements.length > 0 ? (
        <div className="mt-4 max-w-sm space-y-1 text-xs text-[#ffd84a]">
          {achievements.map((achievement) => (
            <p key={achievement.id}>{achievement.label}</p>
          ))}
        </div>
      ) : null}

      <button type="button" className="retro-button mt-5" onClick={onRestart}>
        Jogar Novamente
      </button>
    </div>
  );
}
