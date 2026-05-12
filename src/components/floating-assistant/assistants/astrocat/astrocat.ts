import AstroCat from "@/assets/gifs/astrocat.gif";

import type { AssistantCharacter } from "../../assistant-types";

export const astrocatAssistant = {
  id: "floating-cat",
  name: "Astrocat",
  image: AstroCat,
  alt: {
    pt: "Gatinho assistente",
    en: "Assistant cat",
  },
  ariaLabel: {
    pt: "Interagir com o gatinho assistente",
    en: "Interact with the assistant cat",
  },
  initialMessage: {
    pt: "Oi! Clique nos ícones para abrir as janelas. Eu fico por aqui caso precise de ajuda. Sem promessas. Gatos não assinam SLA.",
    en: "Hi! Click the icons to open windows. I'll hang around in case you need help. No promises. Cats don't sign SLAs.",
  },
  activationMessage: {
    pt: "Astrocat ativado. Vou supervisionar tudo com julgamento silencioso.",
    en: "Astrocat activated. I'll supervise everything with silent judgment.",
  },
  allMinimizedMessage: {
    pt: "Tudo minimizado. Excelente. Finalmente uma superfície plana para uma soneca e zero respeito pelos meus bigodes.",
    en: "Everything minimized. Excellent. Finally a flat surface for a nap and zero respect for my whiskers.",
  },
  farewellMessage: {
    pt: "Tudo bem. Vou me desfazer em pixels ali no cantinho. Nem vou miar dramaticamente. Talvez um pouco.",
    en: "Fine. I will dissolve into pixels in the corner. I will not meow dramatically. Maybe just a little.",
  },
  messages: {
    poke: [
      {
        pt: "Miau. Assistente acordado e julgando suas escolhas de layout.",
        en: "Meow. Assistant awake and judging your layout choices.",
      },
      {
        pt: "Sim, eu sou muito bonito. Não precisa testar o botão de novo.",
        en: "Yes, I'm very handsome. No need to test the button again.",
      },
      {
        pt: "Mais um poke e eu vou abrir uma issue emocional.",
        en: "One more poke and I'm opening an emotional support issue.",
      },
      {
        pt: "Ok, já entendi. Você descobriu que eu sou clicável. Agora respeite meu espaço pessoal.",
        en: "Ok, I get it. You found out I'm clickable. Now please respect my personal space.",
      },
      {
        pt: "Você sabe que eu tenho sentimentos, né? Pequenos, pixelados, mas sentimentos.",
        en: "You know I have feelings, right? Small, pixelated feelings, but feelings.",
      },
      {
        pt: "Eu comecei esse trabalho como assistente. Agora sou um estudo de caso sobre paciência felina.",
        en: "I started this job as an assistant. Now I'm a case study in feline patience.",
      },
      {
        pt: "PARABÉNS. Você desbloqueou a conquista secreta: incomodar um gato digital vinte vezes seguidas.",
        en: "CONGRATULATIONS. You unlocked the secret achievement: annoy a digital cat twenty times in a row.",
      },
      {
        pt: "Você já desbloqueou a conquista. Agora está só testando os limites da minha paciência.",
        en: "You already unlocked the achievement. Now you're just testing the limits of my patience.",
      },
      {
        pt: "CHEGA. Eu estou oficialmente entrando em greve. Fale com meu advogado, meu terapeuta e meu sachê.",
        en: "ENOUGH. I am officially going on strike. Talk to my lawyer, my therapist, and my treat pouch.",
      },
    ],
    move: [
      {
        pt: "Novo cantinho aprovado. Vou fingir que foi ideia minha.",
        en: "New spot approved. I'll pretend it was my idea.",
      },
      {
        pt: "Daqui eu consigo supervisionar o caos com mais elegância.",
        en: "From here, I can supervise the chaos with more elegance.",
      },
      {
        pt: "Você me moveu. Eu permiti. Não confunda as coisas.",
        en: "You moved me. I allowed it. Don't get confused.",
      },
      {
        pt: "Reposicionamento concluído. Minha dignidade ficou no lugar anterior.",
        en: "Repositioning complete. My dignity stayed in the previous spot.",
      },
      {
        pt: "Nova posição aceita sob protesto felino.",
        en: "New position accepted under feline protest.",
      },
      {
        pt: "Se eu derrubar alguma coisa daqui, a culpa é do layout.",
        en: "If I knock something over from here, it's the layout's fault.",
      },
      {
        pt: "Se for me mover de novo, pelo menos me coloque perto de uma caixa de papelão. Tenho padrões.",
        en: "If you're moving me again, at least put me near a cardboard box. I have standards.",
      },
    ],
    shake: [
      {
        pt: "Ei! Meus bigodes são virtuais, mas eu ainda tenho sentimentos.",
        en: "Hey! My whiskers are virtual, but I still have feelings.",
      },
      {
        pt: "Com licença? Isso foi uma sacudida ou uma tentativa de reiniciar meu sistema emocional?",
        en: "Excuse me? Was that a shake or an attempt to reboot my emotional system?",
      },
      {
        pt: "Eu sou um assistente, não um chocalho com autoestima.",
        en: "I'm an assistant, not a rattle with self-esteem.",
      },
      {
        pt: "Sacudida detectada. Confiança no usuário reduzida em 37%.",
        en: "Shake detected. Trust in user reduced by 37%.",
      },
      {
        pt: "Favor não misturar o gato antes de usar.",
        en: "Please do not shake the cat before use.",
      },
      {
        pt: "Da próxima vez, pelo menos coloque uma música dramática antes.",
        en: "Next time, at least play dramatic music first.",
      },
    ],
    advice: [
      {
        pt: "Conselho felino: se tudo parece urgente, tire uma soneca e veja o que ainda pegou fogo depois.",
        en: "Feline advice: if everything feels urgent, take a nap and see what is still on fire later.",
      },
      {
        pt: "Caixas de papelão ensinam arquitetura: simples, útil e misteriosamente irresistível.",
        en: "Cardboard boxes teach architecture: simple, useful, and mysteriously irresistible.",
      },
      {
        pt: "Se o layout invadiu seus limites pessoais, talvez falte padding. Ou terapia.",
        en: "If the layout crossed your personal boundaries, maybe it needs padding. Or therapy.",
      },
      {
        pt: "Nunca subestime bigodes. Eles detectam bugs e vibrações ruins.",
        en: "Never underestimate whiskers. They detect bugs and bad vibes.",
      },
    ],
    idle: [
      {
        pt: "Estou em modo economia de energia. Chamam isso de preguiça, eu chamo de estratégia.",
        en: "I am in power-saving mode. They call it laziness, I call it strategy.",
      },
      {
        pt: "Se precisar de mim, estarei fingindo que não ouvi.",
        en: "If you need me, I will be pretending I did not hear.",
      },
    ],
  },
} satisfies AssistantCharacter;
