import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

import { SectionTitle } from "@/components/Shared/SectionTitle";
import { Container } from "@/components/Shared/Container";
import { MainContent } from "@/components/Shared/Wrapper";

import CatPalaceImage from "assets/images/www.catpalace.store.png";
import PetLoveImage from "assets/images/pet-love-eta.vercel.app.png";
import ActivitiesImage from "assets/images/80-activities.vercel.app.png";
import IsabellaImage from "assets/images/isabella-matokanovich.vercel.app.png";
import DungeonTools from "assets/images/dungeon-tools.vercel.app.png";

import { Arrow } from "@/assets/svgs/arrow";

import { SectionProps } from "@/types";

import * as S from "./styles";
import "swiper/css";
import { useEffect, useState } from "react";
import { Translate } from "@/hooks/translate";

export function Projects({ reference, scrollTo, nextSection }: SectionProps) {
  const projectsData = [
    {
      name: "CatPalace",
      link: "https://www.catpalace.store/",
      github: "https://github.com/ferrazmanu/CatPalace",
      imageUrl: CatPalaceImage,
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
      name: "Isabella Matokanovich",
      link: "https://isabella-matokanovich.vercel.app/",
      github: "https://github.com/ferrazmanu/isabella-matokanovich",
      imageUrl: IsabellaImage,
    },
    {
      name: "Dungeon Tools",
      link: "https://dungeon-tools.vercel.app/",
      github: "https://github.com/ferrazmanu/dungeon-tools",
      imageUrl: DungeonTools,
    },
  ];

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  return (
    <S.ProjectsWrapper id="projects" ref={reference}>
      <Container>
        <MainContent>
          <div className="wrapper">
            <SectionTitle>
              {Translate({
                text: `Projetos`,
                translation: `Projects`,
              })}
            </SectionTitle>

            {windowWidth > 992 ? (
              <div className="projects-grid">
                {projectsData.map((project) => {
                  return (
                    <div className="box" key={project.name}>
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
                  );
                })}
              </div>
            ) : (
              <Swiper spaceBetween={15} slidesPerView={1}>
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
            )}
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
