import { Button } from "@/components/Button";
import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";

export default function Contact() {
  const phone = "5543991851015";
  const text = `Olá, Manuela!
Encontrei seu contato pelo seu portfólio e gostaria de conversar sobre uma possível oportunidade ou projeto.
Podemos trocar uma ideia?`;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    text
  )}`;

  return (
    <Wrapper id="contact" className="items-center text-center">
      <SectionTitle>
        <h2>Vamos construir algo juntos!</h2>
        <p>Me encontre em:</p>
      </SectionTitle>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href={whatsappLink} target="_blank">
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
    </Wrapper>
  );
}
