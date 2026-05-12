import ActivitiesImage from "assets/images/80-activities-vercel-app.png";
import DungeonToolsImage from "assets/images/dungeon-tools-vercel-app.png";
import IsabellaImage from "assets/images/isabella-matokanovich-vercel-app.png";
import MarvelAppImage from "assets/images/marvel-app-pl-vercel-app.png";
import PetLoveImage from "assets/images/pet-love-eta-vercel-app.png";
import CatPalaceImage from "assets/images/www-catpalace-store.png";
import MoviesListImage from "assets/images/movies-list-labor-vercel-app.png";
import JulianaCosplayerImage from "assets/images/juhcosplay-vercel-app.png";
import TritecImage from "assets/images/tritec-vercel-app.png";
import PrivateProjectImage from "assets/images/private-project.png";

export const PROJECTS_DATA = [
  {
    name: "Tritec",
    link: "https://tritec.vercel.app/",
    github: "https://github.com/ferrazmanu/Tritec",
    imageUrl: TritecImage,
    description: {
      pt: "Landing page freelancer para apresentação institucional de uma loja, construída com HTML, CSS e JavaScript puro, com foco em performance, carregamento rápido e clareza na comunicação.",
      en: "Freelance landing page for a retail business, built with HTML, CSS, and JavaScript, focusing on performance, fast loading, and clear communication.",
    },
    stack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Google Analytics 4",
      "Google Tag Manager",
    ],
    date: {
      pt: "2025 - Projeto Freelancer",
      en: "2025 - Freelance Project",
    },
  },
  {
    name: "LocSmart",
    link: "https://github.com/ferrazmanu/locsmart",
    github: "https://github.com/ferrazmanu/locsmart",
    imageUrl: PrivateProjectImage,
    description: {
      pt: "Sistema web de monitoramento de veículos por câmeras em rodovias, desenvolvido como projeto freelancer com visualização de dados em tempo real, formulários validados e integração com APIs.",
      en: "Web-based vehicle monitoring system using highway cameras, developed as a freelance project with real-time data views, validated forms, and API integration.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "React Query",
      "React Hook Form",
      "Zod",
      "Axios",
      "NextAuth",
    ],
    date: {
      pt: "2025 - Projeto Freelancer",
      en: "2025 - Freelance Project",
    },
  },
  {
    name: "Movies List",
    link: "https://movies-list-labor.vercel.app/",
    github: "https://github.com/ferrazmanu/movies-list",
    imageUrl: MoviesListImage,
    description: {
      pt: "Aplicação web desenvolvida como avaliação técnica, com listagem de filmes consumindo API externa, paginação, filtros e organização eficiente dos dados.",
      en: "Web application developed as a technical assessment, featuring a movie list consuming an external API with pagination, filters, and efficient data organization.",
    },
    stack: ["Next.js", "React", "TypeScript", "Axios", "Day.js"],
    date: {
      pt: "2024 - Avaliação Técnica",
      en: "2024 - Technical Assessment",
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
      pt: "2024 - Avaliação Técnica",
      en: "2024 - Technical Assessment",
    },
  },
  {
    name: "Juliana Cosplayer",
    link: "https://juhcosplay.vercel.app/",
    github: "https://github.com/ferrazmanu/juhcosplay",
    imageUrl: JulianaCosplayerImage,
    description: {
      pt: "Site profissional freelancer para apresentação de portfólio, galerias de imagens e navegação intuitiva, com implementação responsiva e atenção à performance.",
      en: "Freelance professional website for portfolio presentation, image galleries, and intuitive navigation, with responsive implementation and performance care.",
    },
    stack: [
      "React",
      "TypeScript",
      "Material UI",
      "React Hook Form",
      "Axios",
      "GraphQL",
      "Redux",
    ],
    date: {
      pt: "2024 - Projeto Freelancer",
      en: "2024 - Freelance Project",
    },
  },
  {
    name: "CatPalace",
    link: "https://cat-palace-ferrazmanu.vercel.app/",
    github: "https://github.com/ferrazmanu/CatPalace",
    imageUrl: CatPalaceImage,
    description: {
      pt: "E-commerce com foco em experiência do usuário, performance e arquitetura escalável, com consumo de dados via GraphQL e componentes reutilizáveis.",
      en: "E-commerce focused on user experience, performance, and scalable architecture, with GraphQL data consumption and reusable components.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "GraphQL",
      "Redux Toolkit",
      "Swiper",
    ],
    date: {
      pt: "2023 - Projeto Freelancer",
      en: "2023 - Freelance Project",
    },
  },
  {
    name: "Isabella Matokanovich",
    link: "https://isabella-matokanovich.vercel.app/",
    github: "https://github.com/ferrazmanu/isabella-matokanovich",
    imageUrl: IsabellaImage,
    description: {
      pt: "Site institucional para apresentação de portfólio profissional, com layout responsivo, navegação fluida e consumo de conteúdo via GraphQL.",
      en: "Institutional website for professional portfolio presentation, with responsive layout, smooth navigation, and GraphQL content fetching.",
    },
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "GraphQL",
      "Apollo Client",
      "Swiper",
      "Day.js",
    ],
    date: {
      pt: "2023 - Projeto Freelancer",
      en: "2023 - Freelance Project",
    },
  },
  {
    name: "80 Activities",
    link: "https://80-activities.vercel.app/",
    github: "https://github.com/ferrazmanu/80-Activities",
    imageUrl: ActivitiesImage,
    description: {
      pt: "Aplicação web para descobrir atividades para realizar após o trabalho, com foco em usabilidade, organização visual e layout responsivo.",
      en: "Web application to discover activities after work, focusing on usability, visual organization, and responsive layout.",
    },
    stack: ["Next.js", "React", "TypeScript"],
    date: {
      pt: "2023 - Projeto pessoal",
      en: "2023 - Personal project",
    },
  },
  {
    name: "Dungeon Tools",
    link: "https://dungeon-tools.vercel.app/",
    github: "https://github.com/ferrazmanu/dungeon-tools",
    imageUrl: DungeonToolsImage,
    description: {
      pt: "Aplicação web para auxiliar mestres de RPG de mesa na criação e gerenciamento de recursos de jogo, com formulários dinâmicos e interface clara.",
      en: "Web application to help tabletop RPG game masters create and manage game resources, with dynamic forms and a clear interface.",
    },
    stack: ["Next.js", "React", "TypeScript", "Material UI", "React Hook Form"],
    date: {
      pt: "2023 - Projeto pessoal",
      en: "2023 - Personal project",
    },
  },
  {
    name: "PetLove",
    link: "https://pet-love-eta.vercel.app/",
    github: "https://github.com/ferrazmanu/pet-love",
    imageUrl: PetLoveImage,
    description: {
      pt: "Site criado para ajudar tutores a encontrar pretendentes para seus pets, com layout responsivo, navegação simples e componentes reutilizáveis.",
      en: "Website created to help pet owners find matches for their pets, with responsive layout, simple navigation, and reusable components.",
    },
    stack: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS"],
    date: {
      pt: "2022 - Avaliação Técnica",
      en: "2022 - Technical Assessment",
    },
  },
];
