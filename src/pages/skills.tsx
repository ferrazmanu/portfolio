import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";
import { CERTIFICATES } from "@/data/certificates";

export default function Skills() {
  return (
    <Wrapper id="skills" className="gap-12">
      <SectionTitle>Ficha Técnica</SectionTitle>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h4 className="mb-2 text-xl font-bold">Habilidades Técnicas</h4>
          <p>React.js, Next.js, TypeScript, HTML e CSS</p>
        </div>

        <div>
          <h4 className="mb-2 text-xl font-bold">Habilidades Interpessoais</h4>
          <p>
            Proatividade, adaptabilidade, organização, paciência, resolução de
            problemas e atenção a detalhes.
          </p>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-xl font-bold">Licenças e Certificados</h4>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {CERTIFICATES.map((cert) => (
            <li key={cert.title.pt} className="retro-border bg-white p-4">
              <strong className="block text-sm">{cert.title.pt}</strong>
              <span className="text-xs opacity-70">
                {cert.issuer} - {cert.date.pt}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}
