import Link from "next/link";

import * as S from "./styles";
import { useTranslation } from "@/hooks/useTranslation";

export function Header() {
  const { handleTranslation } = useTranslation();

  const menu = [
    {
      text: {
        pt: `/home`,
        en: `/home`,
      },
      link: "/",
    },
    {
      text: {
        pt: `/sobre`,
        en: `/about`,
      },
      link: "/about",
    },
    {
      text: {
        pt: `/ficha técnica`,
        en: `/skills`,
      },
      link: "/skills",
    },
    {
      text: {
        pt: `/projetos`,
        en: `/projects`,
      },
      link: "/projects",
    },
    {
      text: {
        pt: `/carreira`,
        en: `/career`,
      },
      link: "/career",
    },
    {
      text: {
        pt: `/contato`,
        en: `/contact`,
      },
      link: "/contact",
    },
  ];

  return (
    <S.HeaderWrapper>
      <div className="title">Menu</div>
      <ul>
        {menu.map((item) => {
          return (
            <li key={item.text.pt}>
              <Link href={item.link}>
                {handleTranslation({
                  text: item.text.pt,
                  translation: item.text.en,
                })}
              </Link>
            </li>
          );
        })}
      </ul>
    </S.HeaderWrapper>
  );
}
