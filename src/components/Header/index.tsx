import Link from "next/link";

import * as S from "./styles";
import { Translate } from "@/hooks/translate";

export function Header() {
  const menu = [
    {
      text: Translate({
        text: `/apresentação`,
        translation: `/presentation`,
      }),
      link: "#presentation",
    },
    {
      text: Translate({
        text: `/ficha técnica`,
        translation: `/datasheet`,
      }),
      link: "#datasheet",
    },
    {
      text: Translate({
        text: `/projetos`,
        translation: `/projects`,
      }),
      link: "#projects",
    },
    {
      text: Translate({
        text: `/carreira`,
        translation: `/career`,
      }),
      link: "#career",
    },
    {
      text: Translate({
        text: `/contato`,
        translation: `/contact`,
      }),
      link: "#contact",
    },
  ];

  return (
    <S.HeaderWrapper>
      <div className="title">Menu</div>
      <ul>
        {menu.map((item) => {
          return (
            <li key={item.text}>
              <Link href={item.link}>{item.text}</Link>
            </li>
          );
        })}
      </ul>
    </S.HeaderWrapper>
  );
}
