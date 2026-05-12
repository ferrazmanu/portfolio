import type { TranslateFn } from "../../types";

interface TrashContentProps {
  t: TranslateFn;
}

export function TrashContent({ t }: TrashContentProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold">
        {t({ pt: "Lixeira vazia", en: "Trash is empty" })}
      </h3>
      <p>
        {t({
          pt: "Nada descartado por aqui. Só algumas ideias antigas esperando reboot.",
          en: "Nothing discarded here. Just a few old ideas waiting for a reboot.",
        })}
      </p>
    </div>
  );
}
