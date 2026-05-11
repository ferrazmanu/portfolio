import Image from "next/image";
import { useState } from "react";

import AstroCat from "@/assets/gifs/astrocat.gif";

interface AssistantMessage {
  pt: string;
  en: string;
}

interface FloatingCatProps {
  initialMessage: string;
  externalMessage?: string;
  translateMessage: (message: AssistantMessage) => string;
}

export const FloatingCat = ({
  initialMessage,
  externalMessage,
  translateMessage,
}: FloatingCatProps) => {
  const [pokeCount, setPokeCount] = useState(0);
  const [pokeMessage, setPokeMessage] = useState<string | null>(null);

  const handlePoke = () => {
    setPokeCount((currentCount) => {
      const nextCount = currentCount + 1;

      if (nextCount >= 30) {
        setPokeMessage(
          translateMessage({
            pt: "CHEGA. Eu estou oficialmente entrando em greve. Fale com meu advogado, meu terapeuta e meu sachê.",
            en: "ENOUGH. I am officially going on strike. Talk to my lawyer, my therapist, and my treat pouch.",
          }),
        );
        return nextCount;
      }

      if (nextCount === 20) {
        setPokeMessage(
          translateMessage({
            pt: "PARABÉNS. Você desbloqueou a conquista secreta: incomodar um gato digital vinte vezes seguidas.",
            en: "CONGRATULATIONS. You unlocked the secret achievement: annoy a digital cat twenty times in a row.",
          }),
        );
        return nextCount;
      }

      if (nextCount >= 20) {
        setPokeMessage(
          translateMessage({
            pt: "Você já desbloqueou a conquista. Agora está só testando os limites da minha paciência.",
            en: "You already unlocked the achievement. Now you're just testing the limits of my patience.",
          }),
        );
        return nextCount;
      }

      if (nextCount >= 15) {
        setPokeMessage(
          translateMessage({
            pt: "Eu comecei esse trabalho como assistente. Agora sou um estudo de caso sobre paciência felina.",
            en: "I started this job as an assistant. Now I'm a case study in feline patience.",
          }),
        );
        return nextCount;
      }

      if (nextCount >= 10) {
        setPokeMessage(
          translateMessage({
            pt: "Você sabe que eu tenho sentimentos, né? Pequenos, pixelados, mas sentimentos.",
            en: "You know I have feelings, right? Small, pixelated feelings, but feelings.",
          }),
        );
        return nextCount;
      }

      if (nextCount >= 8) {
        setPokeMessage(
          translateMessage({
            pt: "Ok, já entendi. Você descobriu que eu sou clicável. Agora respeite meu espaço pessoal.",
            en: "Ok, I get it. You found out I'm clickable. Now please respect my personal space.",
          }),
        );
        return nextCount;
      }

      if (nextCount >= 5) {
        setPokeMessage(
          translateMessage({
            pt: "Mais um poke e eu vou abrir uma issue emocional.",
            en: "One more poke and I'm opening an emotional support issue.",
          }),
        );
        return nextCount;
      }

      if (nextCount >= 3) {
        setPokeMessage(
          translateMessage({
            pt: "Sim, eu sou muito bonito. Não precisa testar o botão de novo.",
            en: "Yes, I'm very handsome. No need to test the button again.",
          }),
        );
        return nextCount;
      }

      setPokeMessage(
        translateMessage({
          pt: "Miau. Assistente acordado e julgando suas escolhas de layout.",
          en: "Meow. Assistant awake and judging your layout choices.",
        }),
      );

      return nextCount;
    });
  };

  const message = externalMessage ?? pokeMessage ?? initialMessage;

  return (
    <div className="fixed bottom-12 right-4 z-[120] flex max-w-[280px] items-end gap-2 font-retro sm:bottom-14 sm:right-6">
      <div className="retro-border bg-[#f1f1f1] p-2 text-xs leading-snug text-black shadow-retro">
        <p>{message}</p>
      </div>

      <button
        type="button"
        className="retro-border relative h-20 w-[98px] bg-[#b9c3b7] focus:outline focus:outline-1 focus:outline-dotted focus:outline-black active:retro-border-inset"
        aria-label="Interagir com o assistente"
        onClick={handlePoke}
      >
        <Image
          src={AstroCat}
          alt="Assistente"
          fill
          className="object-contain"
          sizes="98px"
        />
      </button>
    </div>
  );
};
