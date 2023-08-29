import { Container } from "@/components/Shared/Container";
import { Header } from "@/components/Header";
import { Presentation } from "@/components/Sections/Presentation";
import { Datasheet } from "@/components/Sections/Datasheet";
import { Projects } from "@/components/Sections/Projects";
import { Career } from "@/components/Sections/Career";
import { useRef } from "react";
import { Contact } from "@/components/Sections/Contact";
import { TranslationButton } from "@/components/TranslationButton";
import { FloatingCat } from "@/components/FloatingCat";

export default function Home() {
  const presentationRef = useRef();
  const datasheetRef = useRef();
  const projectsRef = useRef();
  const careerRef = useRef();
  const contactRef = useRef();

  function scrollTo(section: any) {
    section.current.scrollIntoView({
      behaviour: "smooth",
    });
  }

  return (
    <>
      <FloatingCat />
      <TranslationButton />
      <Header />
      <main>
        <Presentation
          reference={presentationRef}
          scrollTo={scrollTo}
          nextSection={datasheetRef}
        />
        <Datasheet
          reference={datasheetRef}
          scrollTo={scrollTo}
          nextSection={projectsRef}
        />
        <Projects
          reference={projectsRef}
          scrollTo={scrollTo}
          nextSection={careerRef}
        />
        <Career
          reference={careerRef}
          scrollTo={scrollTo}
          nextSection={contactRef}
        />
        <Contact reference={contactRef} />
      </main>
    </>
  );
}
