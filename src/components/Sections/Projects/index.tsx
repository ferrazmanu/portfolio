import Image from "next/image";
import Link from "next/link";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "@/components/Shared/Container";
import { SectionTitle } from "@/components/Shared/SectionTitle";
import { MainContent } from "@/components/Shared/Wrapper";

import ActivitiesImage from "assets/images/80-activities.vercel.app.png";
import DungeonToolsImage from "assets/images/dungeon-tools.vercel.app.png";
import IsabellaImage from "assets/images/isabella-matokanovich.vercel.app.png";
import MarvelAppImage from "assets/images/marvel-app-pl.vercel.app.png";
import PetLoveImage from "assets/images/pet-love-eta.vercel.app.png";
import CatPalaceImage from "assets/images/www.catpalace.store.png";

import { Arrow } from "@/assets/svgs/arrow";
import { Translate } from "@/hooks/translate";
import { SectionProps } from "@/types";

import useInView from "@/hooks/useInView";
import { LegacyRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import * as S from "./styles";

export function Projects({ reference, scrollTo, nextSection }: SectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const projectsData = [
    {
      name: "CatPalace",
      link: "https://www.catpalace.store/",
      github: "https://github.com/ferrazmanu/CatPalace",
      imageUrl: CatPalaceImage,
    },
    {
      name: "Isabella Matokanovich",
      link: "https://isabella-matokanovich.vercel.app/",
      github: "https://github.com/ferrazmanu/isabella-matokanovich",
      imageUrl: IsabellaImage,
    },
    {
      name: "MarvelApp",
      link: "https://marvel-app-pl.vercel.app/",
      github: "https://github.com/ferrazmanu/marvel-app",
      imageUrl: MarvelAppImage,
    },
    {
      name: "PetLove",
      link: "https://pet-love-eta.vercel.app/",
      github: "https://github.com/ferrazmanu/pet-love",
      imageUrl: PetLoveImage,
    },
    {
      name: "80 Activities",
      link: "https://80-activities.vercel.app/",
      github: "https://github.com/ferrazmanu/80-Activities",
      imageUrl: ActivitiesImage,
    },
    {
      name: "Dungeon Tools",
      link: "https://dungeon-tools.vercel.app/",
      github: "https://github.com/ferrazmanu/dungeon-tools",
      imageUrl: DungeonToolsImage,
    },
  ];

  return (
    <S.ProjectsWrapper id="projects" ref={reference}>
      <Container>
        <MainContent
          ref={ref as LegacyRef<HTMLElement>}
          className={`fadeInSection ${isInView ? "visible" : ""}`}
        >
          <div className="wrapper">
            <SectionTitle>
              {Translate({
                text: `Projetos`,
                translation: `Projects`,
              })}
            </SectionTitle>

            <Swiper
              spaceBetween={15}
              slidesPerView={1}
              pagination={true}
              modules={[Pagination]}
            >
              {projectsData.map((project) => {
                return (
                  <SwiperSlide key={project.name}>
                    <div className="box">
                      <Link href={project.link} target="_blank">
                        <div className="image">
                          <Image
                            src={project.imageUrl}
                            alt={"imagem do projeto"}
                            fill
                          />
                        </div>
                      </Link>
                      <div className="description">
                        <Link href={project.link} target="_blank">
                          {project.name}
                        </Link>
                        {" | "}
                        <Link href={project.github} target="_blank">
                          Github
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <button
            className="arrow"
            onClick={() => scrollTo && scrollTo(nextSection)}
          >
            <Arrow />
          </button>
        </MainContent>
      </Container>
    </S.ProjectsWrapper>
  );
}
