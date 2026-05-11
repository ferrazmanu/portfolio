import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";
import { CAREER_DATA } from "@/data/career";

export default function Career() {
  return (
    <Wrapper id="career" className="gap-8">
      <SectionTitle>Carreira</SectionTitle>

      <ul className="flex flex-col gap-10">
        {CAREER_DATA.map((job) => (
          <li key={job.title} className="border-l-2 border-black pl-6">
            <span className="text-sm opacity-70">{job.time.pt}</span>
            <h4 className="text-xl font-bold">{job.title}</h4>
            <p>{job.description.pt}</p>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
