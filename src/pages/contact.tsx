import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";
import { useTranslation } from "@/hooks/useTranslation";
import styled from "styled-components";

export default function Contact() {
  const { handleTranslation } = useTranslation();

  const getWhatsAppLink = () => {
    const phone = "5543991851015";

    const text = handleTranslation({
      text: `Olá, Manuela! 👋
            Encontrei seu contato pelo seu portfólio e gostaria de conversar sobre uma possível oportunidade ou projeto.
            Podemos trocar uma ideia? 😊`,
      translation: `Hi, Manuela! 👋
            I found your contact through your portfolio and would love to talk about a possible opportunity or project.
            Can we chat? 😊`,
    });

    const formattedText = text.replace(/\n/g, "\n\n");

    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      formattedText
    )}`;
  };

  return (
    <ContactSection id="contact">
      <SectionTitle>
        <h2>
          {handleTranslation({
            text: "Vamos construir algo juntos!",
            translation: "Let’s build something together!",
          })}
        </h2>

        <p>
          {handleTranslation({
            text: "Me encontre em:",
            translation: "Find me at:",
          })}
        </p>
      </SectionTitle>

      <div className="links">
        <Button href={getWhatsAppLink()} target="_blank">
          WhatsApp
        </Button>

        <Button href="mailto:ferraz.manuela@hotmail.com">Email</Button>

        <Button href="https://linkedin.com/in/ferrazmanuela" target="_blank">
          LinkedIn
        </Button>

        <Button href="https://github.com/ferrazmanu" target="_blank">
          GitHub
        </Button>
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
    gap: 16px;
    flex-wrap: wrap;
  }
`;
