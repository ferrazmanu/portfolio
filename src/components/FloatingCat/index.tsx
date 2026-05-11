import Image from "next/image";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

import AstroCat from "@/assets/gifs/astrocat.gif";

import { getRandomAssistantMessage } from "./messageUtils";
import { moveMessages, shakeMessages, type AssistantMessage } from "./messages";

interface FloatingCatProps {
  initialMessage: AssistantMessage;
  externalMessage?: AssistantMessage;
  translateMessage: (message: AssistantMessage) => string;
}

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
}

interface AssistantPosition {
  x: number;
  y: number;
}

interface ShakeTracker {
  directionChanges: number;
  firstDirectionChangeAt: number;
  lastDirectionX: number;
  lastDirectionY: number;
  lastMessageAt: number;
  lastX: number;
  lastY: number;
}

const TASKBAR_HEIGHT = 48;
const ASSISTANT_FALLBACK_WIDTH = 480;
const ASSISTANT_FALLBACK_HEIGHT = 112;
const DEFAULT_ASSISTANT_GAP = 16;
const SHAKE_AXIS_DISTANCE_THRESHOLD = 18;
const SHAKE_DIRECTION_WINDOW = 700;
const SHAKE_MESSAGE_COOLDOWN = 2200;
const SHAKE_REQUIRED_DIRECTION_CHANGES = 3;

export const FloatingCat = ({
  initialMessage,
  externalMessage,
  translateMessage,
}: FloatingCatProps) => {
  const assistantRef = useRef<HTMLDivElement>(null);
  const lastMoveMessageIndexRef = useRef<number | null>(null);
  const lastShakeMessageIndexRef = useRef<number | null>(null);
  const shookDuringDragRef = useRef(false);
  const wasDraggedRef = useRef(false);
  const shakeTrackerRef = useRef<ShakeTracker>({
    directionChanges: 0,
    firstDirectionChangeAt: 0,
    lastDirectionX: 0,
    lastDirectionY: 0,
    lastMessageAt: 0,
    lastX: 0,
    lastY: 0,
  });
  const [pokeCount, setPokeCount] = useState(0);
  const [activeMessage, setActiveMessage] = useState<AssistantMessage | null>(
    null,
  );
  const [position, setPosition] = useState<AssistantPosition>({
    x: DEFAULT_ASSISTANT_GAP,
    y: DEFAULT_ASSISTANT_GAP,
  });
  const [isPositionReady, setIsPositionReady] = useState(false);
  const [dragState, setDragState] = useState<DragState | null>(null);

  useEffect(() => {
    if (!externalMessage) return;

    setActiveMessage(externalMessage);
  }, [externalMessage]);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const assistantWidth =
        assistantRef.current?.offsetWidth ?? ASSISTANT_FALLBACK_WIDTH;
      const assistantHeight =
        assistantRef.current?.offsetHeight ?? ASSISTANT_FALLBACK_HEIGHT;

      setPosition(
        clampPosition({
          x: window.innerWidth - assistantWidth - DEFAULT_ASSISTANT_GAP,
          y:
            window.innerHeight -
            assistantHeight -
            TASKBAR_HEIGHT -
            DEFAULT_ASSISTANT_GAP,
        }),
      );
      setIsPositionReady(true);
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  const handlePoke = () => {
    setPokeCount((currentCount) => {
      const nextCount = currentCount + 1;

      if (nextCount >= 30) {
        setActiveMessage({
          pt: "CHEGA. Eu estou oficialmente entrando em greve. Fale com meu advogado, meu terapeuta e meu sachê.",
          en: "ENOUGH. I am officially going on strike. Talk to my lawyer, my therapist, and my treat pouch.",
        });
        return nextCount;
      }

      if (nextCount === 20) {
        setActiveMessage({
          pt: "PARABÉNS. Você desbloqueou a conquista secreta: incomodar um gato digital vinte vezes seguidas.",
          en: "CONGRATULATIONS. You unlocked the secret achievement: annoy a digital cat twenty times in a row.",
        });
        return nextCount;
      }

      if (nextCount >= 20) {
        setActiveMessage({
          pt: "Você já desbloqueou a conquista. Agora está só testando os limites da minha paciência.",
          en: "You already unlocked the achievement. Now you're just testing the limits of my patience.",
        });
        return nextCount;
      }

      if (nextCount >= 15) {
        setActiveMessage({
          pt: "Eu comecei esse trabalho como assistente. Agora sou um estudo de caso sobre paciência felina.",
          en: "I started this job as an assistant. Now I'm a case study in feline patience.",
        });
        return nextCount;
      }

      if (nextCount >= 10) {
        setActiveMessage({
          pt: "Você sabe que eu tenho sentimentos, né? Pequenos, pixelados, mas sentimentos.",
          en: "You know I have feelings, right? Small, pixelated feelings, but feelings.",
        });
        return nextCount;
      }

      if (nextCount >= 8) {
        setActiveMessage({
          pt: "Ok, já entendi. Você descobriu que eu sou clicável. Agora respeite meu espaço pessoal.",
          en: "Ok, I get it. You found out I'm clickable. Now please respect my personal space.",
        });
        return nextCount;
      }

      if (nextCount >= 5) {
        setActiveMessage({
          pt: "Mais um poke e eu vou abrir uma issue emocional.",
          en: "One more poke and I'm opening an emotional support issue.",
        });
        return nextCount;
      }

      if (nextCount >= 3) {
        setActiveMessage({
          pt: "Sim, eu sou muito bonito. Não precisa testar o botão de novo.",
          en: "Yes, I'm very handsome. No need to test the button again.",
        });
        return nextCount;
      }

      setActiveMessage({
        pt: "Miau. Assistente acordado e julgando suas escolhas de layout.",
        en: "Meow. Assistant awake and judging your layout choices.",
      });

      return nextCount;
    });
  };

  const clampPosition = (nextPosition: AssistantPosition) => {
    const assistantWidth =
      assistantRef.current?.offsetWidth ?? ASSISTANT_FALLBACK_WIDTH;
    const assistantHeight =
      assistantRef.current?.offsetHeight ?? ASSISTANT_FALLBACK_HEIGHT;
    const maxX = Math.max(0, window.innerWidth - assistantWidth - 8);
    const maxY = Math.max(
      0,
      window.innerHeight - assistantHeight - TASKBAR_HEIGHT,
    );

    return {
      x: Math.min(maxX, Math.max(8, nextPosition.x)),
      y: Math.min(maxY, Math.max(8, nextPosition.y)),
    };
  };

  const getRandomMoveMessage = () => {
    const result = getRandomAssistantMessage(
      moveMessages,
      lastMoveMessageIndexRef.current,
    );

    lastMoveMessageIndexRef.current = result.index;

    return result.message;
  };

  const getRandomShakeMessage = () => {
    const result = getRandomAssistantMessage(
      shakeMessages,
      lastShakeMessageIndexRef.current,
    );

    lastShakeMessageIndexRef.current = result.index;

    return result.message;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    shookDuringDragRef.current = false;
    wasDraggedRef.current = false;
    shakeTrackerRef.current = {
      directionChanges: 0,
      firstDirectionChangeAt: 0,
      lastDirectionX: 0,
      lastDirectionY: 0,
      lastMessageAt: shakeTrackerRef.current.lastMessageAt,
      lastX: event.clientX,
      lastY: event.clientY,
    };
    setDragState({
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const distanceX = event.clientX - dragState.startX;
    const distanceY = event.clientY - dragState.startY;
    const now = performance.now();
    const shakeTracker = shakeTrackerRef.current;
    const segmentX = event.clientX - shakeTracker.lastX;
    const segmentY = event.clientY - shakeTracker.lastY;
    const directionX =
      Math.abs(segmentX) >= SHAKE_AXIS_DISTANCE_THRESHOLD
        ? Math.sign(segmentX)
        : 0;
    const directionY =
      Math.abs(segmentY) >= SHAKE_AXIS_DISTANCE_THRESHOLD
        ? Math.sign(segmentY)
        : 0;

    if (Math.abs(distanceX) > 3 || Math.abs(distanceY) > 3) {
      wasDraggedRef.current = true;
    }

    if (directionX !== 0 || directionY !== 0) {
      const changedDirection =
        (directionX !== 0 &&
          shakeTracker.lastDirectionX !== 0 &&
          directionX !== shakeTracker.lastDirectionX) ||
        (directionY !== 0 &&
          shakeTracker.lastDirectionY !== 0 &&
          directionY !== shakeTracker.lastDirectionY);

      if (
        changedDirection &&
        now - shakeTracker.firstDirectionChangeAt > SHAKE_DIRECTION_WINDOW
      ) {
        shakeTracker.directionChanges = 0;
        shakeTracker.firstDirectionChangeAt = now;
      }

      if (changedDirection) {
        shakeTracker.directionChanges += 1;

        if (shakeTracker.firstDirectionChangeAt === 0) {
          shakeTracker.firstDirectionChangeAt = now;
        }
      }

      if (directionX !== 0) {
        shakeTracker.lastDirectionX = directionX;
      }

      if (directionY !== 0) {
        shakeTracker.lastDirectionY = directionY;
      }

      if (
        shakeTracker.directionChanges >= SHAKE_REQUIRED_DIRECTION_CHANGES &&
        now - shakeTracker.firstDirectionChangeAt <= SHAKE_DIRECTION_WINDOW &&
        now - shakeTracker.lastMessageAt >= SHAKE_MESSAGE_COOLDOWN
      ) {
        setActiveMessage(getRandomShakeMessage());
        shookDuringDragRef.current = true;
        shakeTracker.directionChanges = 0;
        shakeTracker.firstDirectionChangeAt = 0;
        shakeTracker.lastMessageAt = now;
      }

      shakeTracker.lastX = event.clientX;
      shakeTracker.lastY = event.clientY;
    }

    setPosition(
      clampPosition({
        x: dragState.originX + distanceX,
        y: dragState.originY + distanceY,
      }),
    );
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragState(null);

    if (wasDraggedRef.current) {
      wasDraggedRef.current = false;

      if (!shookDuringDragRef.current) {
        setActiveMessage(getRandomMoveMessage());
      }

      shookDuringDragRef.current = false;
      return;
    }

    shookDuringDragRef.current = false;
    handlePoke();
  };

  const handleAssistantKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    handlePoke();
  };

  const message = translateMessage(activeMessage ?? initialMessage);
  const assistantStyle: CSSProperties = {
    left: position.x,
    opacity: isPositionReady ? 1 : 0,
    top: position.y,
  };

  return (
    <div
      ref={assistantRef}
      className="fixed z-[120] flex max-w-[280px] touch-none select-none items-end gap-2 font-retro"
      style={assistantStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="retro-border relative bg-[#f1f1f1] p-2 text-xs leading-snug text-black shadow-retro after:absolute after:bottom-3 after:right-[-7px] after:h-3 after:w-3 after:rotate-45 after:border-r-2 after:border-t-2 after:border-black after:bg-[#f1f1f1] after:content-['']">
        <p>{message}</p>
      </div>

      <button
        type="button"
        className="relative h-20 w-[200px]"
        aria-label="Interagir com o assistente"
        onKeyDown={handleAssistantKeyDown}
      >
        <Image
          src={AstroCat}
          alt="Assistente"
          fill
          className="object-contain"
          draggable={false}
          sizes="98px"
        />
      </button>
    </div>
  );
};
