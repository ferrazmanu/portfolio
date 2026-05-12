import CodeSnake from "@/assets/gifs/codesnake.gif";

import type { AssistantCharacter } from "../../assistant-types";

export const zamigaAssistant = {
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
    pt: "Ssssaudações. Clique nos ícones para abrir as janelas. Eu fico por perto... em silêncio, julgando com elegância.",
    en: "Greetingsss. Click the icons to open windows. I'll stay nearby... silently judging with elegance.",
  },
  activationMessage: {
    pt: "Zamiga ativada. Sssuporte técnico? Talvez. Veneno emocional? Com certeza.",
    en: "Zamiga activated. Technical sssupport? Maybe. Emotional venom? Definitely.",
  },
  allMinimizedMessage: {
    pt: "Tudo foi minimizado. Sssilêncio na área de trabalho. Vou rastejar pelos bastidores e vigiar o CSS.",
    en: "Everything has been minimized. Sssilence on the desktop. I'll slither backstage and watch the CSS.",
  },
  farewellMessage: {
    pt: "Entendido. Vou sumir em quadradinhos, sssilenciosa e ofendida. Volto se chamar com respeito.",
    en: "Understood. I will vanish into little squares, sssilent and offended. I will return if you call respectfully.",
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
        pt: "Você está cutucando uma cobra digital. Sssua coragem é admirável. Sssua sabedoria, nem tanto.",
        en: "You're poking a digital snake. Your courage is admirable. Your wisdom, not so much.",
      },
      {
        pt: "Mais um clique e eu troco de pele por puro estresse.",
        en: "One more click and I'm shedding out of pure stress.",
      },
      {
        pt: "Sssabe o que acontece quando você insiste? Eu também não, mas posso improvisar um veneno emocional.",
        en: "You know what happens when you insist? Me neither, but I can improvise emotional venom.",
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
        pt: "Sssério? De novo? Você tem reflexos rápidos e instinto de sobrevivência questionável.",
        en: "Ssseriously? Again? You have fast reflexes and questionable survival instincts.",
      },
      {
        pt: "Cada clique aumenta em 1% a chance de eu transformar esse layout em selva.",
        en: "Every click increases by 1% the chance that I turn this layout into a jungle.",
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
        pt: "Sssinta o clima: eu, você, trinta cliques e uma relação profissional em ruínas.",
        en: "Feel the mood: me, you, thirty clicks, and a professional relationship in ruins.",
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
      {
        pt: "Sssim, me coloque exatamente onde eu não pedi. Muito humano da sua parte.",
        en: "Yesss, place me exactly where I didn't ask to be. Very human of you.",
      },
      {
        pt: "Movida com sucesso. Minha dignidade ficou enrolada no canto anterior.",
        en: "Moved successfully. My dignity stayed coiled in the previous corner.",
      },
      {
        pt: "Essa nova posição tem boa visibilidade para julgar suas decisões.",
        en: "This new position has excellent visibility for judging your decisions.",
      },
      {
        pt: "Sssutil mudança de habitat detectada. Vou fingir que foi uma migração planejada.",
        en: "Sssubtle habitat change detected. I'll pretend it was a planned migration.",
      },
      {
        pt: "Me arrastar pela tela é aceitável. Me arrastar para reunião, jamais.",
        en: "Dragging me across the screen is acceptable. Dragging me into a meeting, never.",
      },
      {
        pt: "Agora estou aqui. Por escolha minha, claro. Não vamos reescrever a história.",
        en: "Now I'm here. By my choice, obviously. Let's not rewrite history.",
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
      {
        pt: "Sssério que você sacudiu uma cobra? Isso é coragem ou falta de documentação?",
        en: "Did you ssseriously shake a snake? Is that courage or lack of documentation?",
      },
      {
        pt: "Eu não sou um cabo solto para você testar com violência.",
        en: "I'm not a loose cable for you to test violently.",
      },
      {
        pt: "Parabéns. Agora meus pensamentos estão todos enrolados.",
        en: "Congratulations. Now all my thoughts are coiled up.",
      },
      {
        pt: "Sacudir não melhora performance. Só espalha o veneno.",
        en: "Shaking does not improve performance. It only spreads the venom.",
      },
      {
        pt: "Minha aura misteriosa acabou de dar erro de renderização.",
        en: "My mysterious aura just threw a rendering error.",
      },
      {
        pt: "Sssacudir a assistente não desbloqueia suporte premium. Só ressentimento.",
        en: "Ssshaking the assistant does not unlock premium support. Only resentment.",
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
      {
        pt: "Sssabedoria venenosa: componente que faz coisa demais uma hora dá o bote.",
        en: "Venomousss wisdom: a component that does too much will eventually strike.",
      },
      {
        pt: "Se o CSS começou a sibilar, talvez seja hora de parar e olhar o flex.",
        en: "If the CSS started hissing, it might be time to stop and check the flex.",
      },
      {
        pt: "Não ataque o bug de frente. Rasteje ao redor dele até encontrar o estado quebrado.",
        en: "Don't attack the bug head-on. Slither around it until you find the broken state.",
      },
      {
        pt: "Sssimples nem sempre é fácil. Mas complicado demais quase sempre é culpa de uma prop.",
        en: "Sssimple is not always easy. But overly complicated is usually a prop's fault.",
      },
      {
        pt: "Antes de culpar o navegador, confira se você não pisou na própria cauda.",
        en: "Before blaming the browser, check if you didn't step on your own tail.",
      },
      {
        pt: "Um bom hover é como veneno: discreto, preciso e inesquecível.",
        en: "A good hover is like venom: subtle, precise, and unforgettable.",
      },
      {
        pt: "Sssse você precisa explicar a interface, talvez ela esteja falando em língua de lagarto.",
        en: "If you need to explain the interface, maybe it's speaking lizard language.",
      },
      {
        pt: "Não existe gambiarra eterna. Só pele velha esperando para ser trocada.",
        en: "There is no eternal workaround. Only old skin waiting to be shed.",
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
      {
        pt: "Sssilêncio detectado. Finalmente um ambiente digno para uma cobra contemplar bugs.",
        en: "Sssilence detected. Finally, an environment worthy of a snake contemplating bugs.",
      },
      {
        pt: "Estou imóvel, mas não inativa. Cobras também fazem processamento em segundo plano.",
        en: "I'm still, not inactive. Snakes also process things in the background.",
      },
      {
        pt: "Nada acontecendo. Perfeito. Vou me enrolar em pensamentos venenosos.",
        en: "Nothing happening. Perfect. I'll coil around venomous thoughts.",
      },
      {
        pt: "Sssó observando. É assim que começam as melhores emboscadas e os melhores code reviews.",
        en: "Jussst watching. That's how the best ambushes and code reviews begin.",
      },
      {
        pt: "Se precisar de mim, estarei aqui. Se não precisar, melhor ainda.",
        en: "If you need me, I'll be here. If you don't, even better.",
      },
      {
        pt: "Modo economia de energia reptiliana ativado.",
        en: "Reptilian power-saving mode enabled.",
      },
    ],
  },
} satisfies AssistantCharacter;
