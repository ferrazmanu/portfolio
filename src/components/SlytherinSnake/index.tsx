import Image from "next/image";

import SnakeGif from "@/assets/gifs/snake.gif";

export const SlytherinSnake = () => {
  return (
    <div className="pointer-events-none fixed bottom-2 left-0 z-10 h-[60px] w-[140px]">
      <Image src={SnakeGif} alt="snake" fill priority sizes="140px" />
    </div>
  );
};
