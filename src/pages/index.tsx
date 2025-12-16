import { Wrapper } from "@/components/Wrapper";
import { useTranslation } from "@/hooks/useTranslation";

export default function Home() {
  const { handleTranslation } = useTranslation();

  return (
    <Wrapper>
      <h1>Manuela Ferraz</h1>
      <h2>Front-end Developer</h2>

      <p>
        {handleTranslation({
          text: `Eu crio experiências web acessíveis, escaláveis ​​e elegantes usando React, TypeScript e Next.`,
          translation: `I build accessible, scalable and elegant web experiences using React, TypeScript and Next.`,
        })}
      </p>

      <p style={{ textDecoration: "underline", marginTop: "1.2vw" }}>
        {handleTranslation({
          text: `Seja bem-vindo(a) ao meu portfólio!`,
          translation: `Welcome to my portfolio!`,
        })}
      </p>
    </Wrapper>
  );
}
