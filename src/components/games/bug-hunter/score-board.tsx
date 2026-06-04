interface ScoreBoardProps {
  score: number;
  timeLeft: number;
  bugsFixed: number;
  bestScore: number;
  lastScore: number;
}

export function ScoreBoard({
  score,
  timeLeft,
  bugsFixed,
  bestScore,
  lastScore,
}: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#bcffcb] sm:grid-cols-5">
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Tempo</p>
        <strong className="text-base text-white">{timeLeft}s</strong>
      </div>
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Pontuação</p>
        <strong className="text-base text-white">{score}</strong>
      </div>
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Corrigidos</p>
        <strong className="text-base text-white">{bugsFixed}</strong>
      </div>
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Recorde</p>
        <strong className="text-base text-white">{bestScore}</strong>
      </div>
      <div className="retro-border-inset bg-[#020f08] p-2">
        <p className="text-[#5cff84]">Última</p>
        <strong className="text-base text-white">{lastScore}</strong>
      </div>
    </div>
  );
}
