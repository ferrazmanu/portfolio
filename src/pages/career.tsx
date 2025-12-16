import { SectionTitle } from "@/components/SectionTitle";
import { Wrapper } from "@/components/Wrapper";
import { CAREER_DATA } from "@/data/career";
import { useTranslation } from "@/hooks/useTranslation";
import styled from "styled-components";

export default function Career() {
  const { handleTranslation } = useTranslation();

  return (
    <CareerSection id="career">
      <SectionTitle>
        {handleTranslation({
          text: `Carreira`,
          translation: `Career`,
        })}
      </SectionTitle>

      <ul>
        {CAREER_DATA.map((job) => (
          <li key={job.title}>
            <span className="time">
              {handleTranslation({
                text: job.time.pt,
                translation: job.time.en,
              })}
            </span>
            <h4>{job.title}</h4>
            <p>
              {handleTranslation({
                text: job.description.pt,
                translation: job.description.en,
              })}
            </p>
          </li>
        ))}
      </ul>
    </CareerSection>
  );
}

export const CareerSection = styled(Wrapper)`
  ul {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  li {
    border-left: 2px solid #333;
    padding-left: 24px;
  }

  .time {
    font-size: 14px;
    opacity: 0.6;
  }
`;
