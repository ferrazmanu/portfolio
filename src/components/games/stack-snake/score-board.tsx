interface ScoreBoardProps {
  bestLength: number;
  bestScore: number;
  collectedCount: number;
  isCoffeeActive: boolean;
  lastScore: number;
  score: number;
  snakeLength: number;
}

export function ScoreBoard({
  bestLength,
  bestScore,
  collectedCount,
  isCoffeeActive,
  lastScore,
  score,
  snakeLength,
}: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#bcffcb] sm:grid-cols-6">
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Pontuação</p>
        <strong className="text-base text-white">{score}</strong>
      </div>
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Coletadas</p>
        <strong className="text-base text-white">{collectedCount}</strong>
      </div>
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Tamanho</p>
        <strong className="text-base text-white">{snakeLength}</strong>
      </div>
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Recorde</p>
        <strong className="text-base text-white">{bestScore}</strong>
      </div>
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Última</p>
        <strong className="text-base text-white">{lastScore}</strong>
      </div>
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Maior stack</p>
        <strong className="text-base text-white">{bestLength}</strong>
        {isCoffeeActive ? (
          <p className="text-[10px] text-[#ffd84a]">Coffee boost</p>
        ) : null}
      </div>
    </div>
  );
}
