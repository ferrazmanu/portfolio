import ActivitiesImage from "assets/images/80-activities.vercel.app.png";
import DungeonToolsImage from "assets/images/dungeon-tools.vercel.app.png";
import IsabellaImage from "assets/images/isabella-matokanovich.vercel.app.png";
import MarvelAppImage from "assets/images/marvel-app-pl.vercel.app.png";
import PetLoveImage from "assets/images/pet-love-eta.vercel.app.png";
import CatPalaceImage from "assets/images/www.catpalace.store.png";
import MoviesListImage from "assets/images/movies-list-labor.vercel.app.png";
import JulianaCosplayerImage from "assets/images/juhcosplay.vercel.app.png";
import TritecImage from "assets/images/tritec.vercel.app.png";
import PrivateProjectImage from "assets/images/private-project.png";

export const PROJECTS_DATA = [
  {
    name: "Tritec",
    link: "https://tritec.vercel.app/",
    github: "https://github.com/ferrazmanu/Tritec",
    imageUrl: TritecImage,
    description: {
      pt: "Landing page desenvolvida como projeto freelancer para apresentação institucional de uma loja. O site foi construído utilizando HTML, CSS e JavaScript puro, com foco em performance, carregamento rápido e clareza na comunicação. Também foram implementadas integrações com Google Analytics 4 (GA4) e Google Tag Manager (GTM) para acompanhamento de métricas e comportamento do usuário.",
      en: "Landing page developed as a freelance project to present a retail business. Built using pure HTML, CSS, and JavaScript, with a strong focus on performance, fast loading, and clear communication. The project also includes integrations with Google Analytics 4 (GA4) and Google Tag Manager (GTM) to track metrics and user behavior.",
    },
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Google Analytics 4",
      "Google Tag Manager",
    ],
    date: {
      pt: "2025 · Projeto Freelancer",
      en: "2025 · Freelance Project",
    },
  },
  {
    name: "LocSmart",
    link: "https://github.com/ferrazmanu/locsmart",
    github: "https://github.com/ferrazmanu/locsmart",
    imageUrl: PrivateProjectImage,
    description: {
      pt: "Sistema web de monitoramento de veículos por meio de câmeras em rodovias, desenvolvido como projeto freelancer. A aplicação permite visualização e gerenciamento de dados em tempo real, com foco em performance, usabilidade e integração eficiente com APIs externas. O projeto foi estruturado para atender necessidades reais de negócio, com arquitetura escalável, formulários validados e interface moderna.",
      en: "Web-based vehicle monitoring system using highway cameras, developed as a freelance project. The application enables real-time data visualization and management, with a strong focus on performance, usability, and efficient integration with external APIs. The project was designed to meet real business needs, featuring scalable architecture, validated forms, and a modern interface.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Styled Components",
      "React Query",
      "React Hook Form",
      "Zod",
      "Axios",
      "NextAuth",
      "Framer Motion",
      "API REST",
    ],
    date: {
      pt: "2025 · Projeto Freelancer",
      en: "2025 · Freelance Project",
    },
  },

  {
    name: "Movies List",
    link: "https://movies-list-labor.vercel.app/",
    github: "https://github.com/ferrazmanu/movies-list",
    imageUrl: MoviesListImage,
    description: {
      pt: "Aplicação web desenvolvida como avaliação técnica, com listagem de filmes consumindo API externa, incluindo paginação, filtros e organização eficiente dos dados. O projeto prioriza performance, clareza visual e boa experiência do usuário.",
      en: "Web application developed as a technical assessment, featuring a movie list consuming an external API with pagination, filtering, and efficient data organization. The project prioritizes performance, visual clarity, and user experience.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Styled Components",
      "Axios",
      "Day.js",
    ],
    date: {
      pt: "2024 · Avaliação Técnica",
      en: "2024 · Technical Assessment",
    },
  },
  {
    name: "MarvelApp",
    link: "https://marvel-app-pl.vercel.app/",
    github: "https://github.com/ferrazmanu/marvel-app",
    imageUrl: MarvelAppImage,
    description: {
      pt: "Aplicação web consumindo a API da Marvel, com listagem dinâmica de personagens e foco em performance e organização de estado.",
      en: "Web application consuming the Marvel API, featuring dynamic character listings with a focus on performance and state organization.",
    },
    stack: ["React", "TypeScript", "API REST", "Material UI", "Axios"],
    date: {
      pt: "2024 · Avaliação Técnica",
      en: "2024 · Technical Assessment",
    },
  },
  {
    name: "Juliana Cosplayer",
    link: "https://juhcosplay.vercel.app/",
    github: "https://github.com/ferrazmanu/juhcosplay",
    imageUrl: JulianaCosplayerImage,
    description: {
      pt: "Site profissional desenvolvido como trabalho freelancer para uma cosplayer, com foco em identidade visual, apresentação de portfólio, galerias de imagens e navegação intuitiva. O projeto envolveu levantamento de requisitos com a cliente, implementação responsiva e atenção à performance e experiência do usuário.",
      en: "Professional website developed as a freelance project for a cosplayer, focusing on visual identity, portfolio presentation, image galleries, and intuitive navigation. The project involved client requirement gathering, responsive implementation, and strong attention to performance and user experience.",
    },
    stack: [
      "React",
      "TypeScript",
      "Material UI",
      "Emotion",
      "Styled Components",
      "React Hook Form",
      "Axios",
      "GraphQL",
      "Redux",
      "React Router",
      "date-fns",
    ],
    date: {
      pt: "2024 · Projeto Freelancer",
      en: "2024 · Freelance Project",
    },
  },
  {
    name: "CatPalace",
    link: "https://cat-palace-ferrazmanu.vercel.app/",
    github: "https://github.com/ferrazmanu/CatPalace",
    imageUrl: CatPalaceImage,
    description: {
      pt: "E-commerce desenvolvido com foco em experiência do usuário, performance e arquitetura escalável. Projeto completo, desde a concepção do layout até a implementação, com consumo de dados via GraphQL, gerenciamento de estado global e componentes reutilizáveis.",
      en: "E-commerce developed with a strong focus on user experience, performance, and scalable architecture. A complete project, from layout conception to implementation, featuring GraphQL data consumption, global state management, and reusable components.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Styled Components",
      "GraphQL",
      "Redux Toolkit",
      "Swiper",
    ],
    date: {
      pt: "2023 · Projeto Freelancer",
      en: "2023 · Freelance Project",
    },
  },
  {
    name: "Isabella Matokanovich",
    link: "https://isabella-matokanovich.vercel.app/",
    github: "https://github.com/ferrazmanu/isabella-matokanovich",
    imageUrl: IsabellaImage,
    description: {
      pt: "Site institucional desenvolvido para apresentar portfólio profissional, com layout elegante e navegação fluida. Utilizando GraphQL para consumo de conteúdo e integração com APIs, além de um design moderno e responsivo.",
      en: "Institutional website developed to present a professional portfolio, featuring an elegant layout and smooth navigation. Utilizes GraphQL for content fetching and API integration, along with a modern and responsive design.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "GraphQL",
      "Apollo Client",
      "Styled Components",
      "Swiper",
      "Day.js",
      "js-cookie",
    ],
    date: {
      pt: "2023 · Projeto Freelancer",
      en: "2023 · Freelance Project",
    },
  },
  {
    name: "80 Activities",
    link: "https://80-activities.vercel.app/",
    github: "https://github.com/ferrazmanu/80-Activities",
    imageUrl: ActivitiesImage,
    description: {
      pt: "Aplicação web voltada à descoberta de atividades para realizar após o trabalho, com foco em usabilidade, organização visual e experiência do usuário. Desenvolvida com layout responsivo e componentes reutilizáveis.",
      en: "Web application designed to help users discover activities to do after work, focusing on usability, visual organization, and user experience. Built with a responsive layout and reusable components.",
    },
    stack: ["Next.js", "React", "TypeScript", "Styled Components"],
    date: {
      pt: "2023 · Projeto pessoal",
      en: "2023 · Personal project",
    },
  },
  {
    name: "Dungeon Tools",
    link: "https://dungeon-tools.vercel.app/",
    github: "https://github.com/ferrazmanu/dungeon-tools",
    imageUrl: DungeonToolsImage,
    description: {
      pt: "Aplicação web desenvolvida para auxiliar mestres de RPG de mesa na criação e gerenciamento de recursos de jogo. O projeto foca em usabilidade, formulários dinâmicos e uma interface clara para facilitar o uso durante as sessões.",
      en: "Web application developed to assist tabletop RPG game masters in creating and managing game resources. The project focuses on usability, dynamic forms, and a clear interface to support live gameplay sessions.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Material UI",
      "Emotion",
      "React Hook Form",
    ],
    date: {
      pt: "2023 · Projeto pessoal",
      en: "2023 · Personal project",
    },
  },
  {
    name: "PetLove",
    link: "https://pet-love-eta.vercel.app/",
    github: "https://github.com/ferrazmanu/pet-love",
    imageUrl: PetLoveImage,
    description: {
      pt: "Site criado para ajudar donos de pets a encontrar pretendentes para seus animais. A plataforma oferece um layout responsivo, fácil de usar e com componentes reutilizáveis, conectando donos de pets com potenciais adotantes ou parceiros para cruzamento.",
      en: "Platform created to help pet owners find potential matches for their animals. The platform features a responsive layout, user-friendly interface, and reusable components, connecting pet owners with potential adopters or breeding partners.",
    },
    stack: [
      "React",
      "Next.js",
      "Styled Components",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "NProgress",
      "Lodash",
      "Lettering.js",
    ],
    date: {
      pt: "2022 · Avaliação Técnica",
      en: "2022 · Technical Assessment",
    },
  },
];
