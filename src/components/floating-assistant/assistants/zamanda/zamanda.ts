import CodeSnake from "@/assets/gifs/codesnake.gif";

import type { AssistantCharacter } from "../../assistant-types";

export const zamandaAssistant = {
  id: "floating-snake",
  name: "Zamiga",
  image: CodeSnake,
  alt: {
    pt: "Cobrinha assistente",
    en: "Assistant snake",
  },
  ariaLabel: {
    pt: "Interagir com a cobrinha assistente",
    en: "Interact with the assistant snake",
  },
  initialMessage: {
    pt: "Ssssaudações. Clique nos ícones para abrir as janelas. Eu fico por perto... discretamente.",
    en: "Greetingsss. Click the icons to open windows. I'll stay nearby... discreetly.",
  },
  activationMessage: {
    pt: "Zamiga ativada. Prometo não morder. A menos que o CSS mereça.",
    en: "Zamiga activated. I promise not to bite. Unless the CSS deserves it.",
  },
  messages: {
    poke: [
      {
        pt: "Sssim, eu senti isso. Não, eu não aprovei.",
        en: "Yesss, I felt that. No, I did not approve.",
      },
      {
        pt: "Cuidado. Eu sou pequena, mas meu julgamento é venenoso.",
        en: "Careful. I am small, but my judgment is venomous.",
      },
      {
        pt: "Você está testando minha paciência ou tentando desbloquear uma maldição?",
        en: "Are you testing my patience or trying to unlock a curse?",
      },
      {
        pt: "Mais um clique e eu troco de pele por puro estresse.",
        en: "One more click and I'm shedding out of pure stress.",
      },
      {
        pt: "Eu rastejo em silêncio, mas meu desagrado faz barulho.",
        en: "I crawl in silence, but my disapproval is loud.",
      },
      {
        pt: "Estou sorrindo? Não. Cobras só parecem elegantes enquanto planejam.",
        en: "Am I smiling? No. Snakes just look elegant while planning.",
      },
      {
        pt: "PARABÉNS. Você irritou uma cobrinha digital. Um feito estranho, mas seu.",
        en: "CONGRATULATIONS. You annoyed a digital snake. A strange achievement, but yours.",
      },
      {
        pt: "A conquista já veio. Agora é só veneno emocional em produção.",
        en: "The achievement already happened. Now it's just emotional venom in production.",
      },
      {
        pt: "Trinta cliques. Vou trocar de pele, de humor e talvez de advogado.",
        en: "Thirty clicks. I'll shed my skin, my mood, and maybe my lawyer.",
      },
    ],
    move: [
      {
        pt: "Novo ponto estratégico encontrado. Vou observar tudo daqui, em silêncio suspeito.",
        en: "New strategic spot found. I'll watch everything from here, in suspicious silence.",
      },
      {
        pt: "Fui realocada. Elegante? Sim. Consentido? Discutível.",
        en: "I have been relocated. Elegant? Yes. Consensual? Debatable.",
      },
      {
        pt: "Essa posição favorece minha aura misteriosa.",
        en: "This position favors my mysterious aura.",
      },
      {
        pt: "Rastejei para outro canto da tela. Tecnicamente, você ajudou.",
        en: "I crawled to another corner of the screen. Technically, you helped.",
      },
    ],
    shake: [
      {
        pt: "Sacudir uma cobra parece uma escolha ousada para alguém com tão poucos pontos de vida.",
        en: "Shaking a snake feels like a bold choice for someone with so few hit points.",
      },
      {
        pt: "Minha coluna inteira é basicamente meu corpo. Tenha respeito.",
        en: "My entire spine is basically my body. Show some respect.",
      },
      {
        pt: "Sssacudida detectada. Veneno emocional carregando.",
        en: "Ssshake detected. Emotional venom loading.",
      },
      {
        pt: "Isso desalinhou minha elegância e possivelmente o CSS.",
        en: "That misaligned my elegance and possibly the CSS.",
      },
    ],
    advice: [
      {
        pt: "Conselho sssincero: se o layout está mordendo de volta, talvez o problema seja o container.",
        en: "Sssincere advice: if the layout is biting back, maybe the container is the problem.",
      },
      {
        pt: "Nunca subestime uma transição suave. Até cobras sabem que movimento importa.",
        en: "Never underestimate a smooth transition. Even snakes know movement matters.",
      },
      {
        pt: "Se algo parece torto, talvez seja charme. Ou falta de alinhamento.",
        en: "If something looks crooked, maybe it's charm. Or missing alignment.",
      },
      {
        pt: "Trocar de pele é natural. Refatorar componente também.",
        en: "Shedding skin is natural. Refactoring a component is too.",
      },
    ],
    idle: [
      {
        pt: "Silêncio não é ausência. É só uma cobrinha pensando em CSS quebrado.",
        en: "Silence is not absence. It is just a little snake thinking about broken CSS.",
      },
      {
        pt: "Estou quieta por elegância, não por falta de opinião.",
        en: "I am quiet out of elegance, not lack of opinions.",
      },
    ],
  },
} satisfies AssistantCharacter;
