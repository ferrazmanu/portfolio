import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";
import { useTranslation } from "@/hooks/useTranslation";
import styled from "styled-components";

export default function Contact() {
  const { handleTranslation } = useTranslation();

  return (
    <ContactSection id="contact">
      <SectionTitle>
        <h2>
          {handleTranslation({
            text: `Vamos construir algo juntos!`,
            translation: `Let’s build something together!`,
          })}
        </h2>

        <p>
          {handleTranslation({
            text: `Me encontre em:`,
            translation: `Find me at:`,
          })}
        </p>
      </SectionTitle>

      <div className="links">
        <Button href="mailto:ferraz.manuela@hotmail.com">Email</Button>
        <Button href="https://linkedin.com/in/ferrazmanuela">LinkedIn</Button>
        <Button href="https://github.com/ferrazmanu">GitHub</Button>
      </div>
    </ContactSection>
  );
}

export const ContactSection = styled(Wrapper)`
  text-align: center;

  .links {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 30px;
  }
`;
