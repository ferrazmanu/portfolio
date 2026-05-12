import Link from "next/link";

import { useTranslation } from "@/hooks/use-translation";

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
    <header className="fixed right-0 top-0 z-10 flex h-screen translate-x-[calc(100%-64px)] bg-[#c0c0c0] text-base transition-transform hover:w-64 hover:translate-x-0">
      <div className="title">Menu</div>
      <ul className="flex h-full w-full flex-col items-center justify-around gap-3 px-3 py-12">
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
    </header>
  );
}
