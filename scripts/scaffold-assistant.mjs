import fs from "node:fs/promises";
import path from "node:path";

const ASSISTANTS_DIR = path.resolve(
  "src/components/floating-assistant/assistants",
);
const INDEX_FILE = path.join(ASSISTANTS_DIR, "index.ts");
const IMPORT_MARKER = "// assistant scaffold imports";
const LIST_MARKER = "  // assistant scaffold list";

const args = process.argv.slice(2);
const fileNameArg = args.find((item) => !item.startsWith("--"));
const dryRun = args.includes("--dry-run");

if (!fileNameArg) {
  console.error(
    "Uso: npm run scaffold:assistant -- <nome-do-arquivo> [--dry-run]",
  );
  console.error(
    "Exemplo: npm run scaffold:assistant -- nome-do-assistant --dry-run",
  );
  process.exit(1);
}

const fileName = toKebabCase(fileNameArg);
if (!fileName) {
  console.error("Informe um nome de arquivo valido para o assistant.");
  process.exit(1);
}

const variableName = `${toCamelCase(fileName)}Assistant`;
const displayName = toDisplayName(fileName);
const assistantDir = path.join(ASSISTANTS_DIR, fileName);
const assistantFile = path.join(assistantDir, `${fileName}.ts`);

try {
  await ensureAssistantFile();
  await updateAssistantIndex();

  console.log(
    `${dryRun ? "[dry-run] " : ""}Assistant "${displayName}" criado a partir de "${fileName}.ts" em: ${normalizePath(assistantDir)}`,
  );
  console.log(`Arquivo: ${normalizePath(assistantFile)}`);
  console.log(
    `Coloque o gif real em src/assets/gifs/${fileName}.gif e atualize o import quando quiser trocar o fallback.`,
  );
} catch (error) {
  console.error("Erro ao gerar assistant:", error.message);
  process.exit(1);
}

async function ensureAssistantFile() {
  if (await exists(assistantFile)) {
    console.log(
      `Arquivo ja existente (ignorado): ${normalizePath(assistantFile)}`,
    );
    return;
  }

  const content = buildAssistantFileContent();

  if (dryRun) {
    console.log(`[dry-run] Criaria: ${normalizePath(assistantFile)}`);
    return;
  }

  await fs.mkdir(assistantDir, { recursive: true });
  await fs.writeFile(assistantFile, content, "utf8");
}

async function updateAssistantIndex() {
  const indexContent = await fs.readFile(INDEX_FILE, "utf8");
  const importLine = `import { ${variableName} } from "./${fileName}/${fileName}";`;
  const listLine = `  ${variableName},`;

  let nextContent = indexContent;

  if (!nextContent.includes(importLine)) {
    nextContent = nextContent.replace(
      IMPORT_MARKER,
      `${importLine}\n${IMPORT_MARKER}`,
    );
  }

  if (!nextContent.includes(listLine)) {
    nextContent = nextContent.replace(LIST_MARKER, `${listLine}\n${LIST_MARKER}`);
  }

  if (nextContent === indexContent) {
    console.log("Registry ja estava atualizado.");
    return;
  }

  if (dryRun) {
    console.log(`[dry-run] Atualizaria: ${normalizePath(INDEX_FILE)}`);
    return;
  }

  await fs.writeFile(INDEX_FILE, nextContent, "utf8");
}

function buildAssistantFileContent() {
  return `import AstroCatFallback from "@/assets/gifs/astrocat.gif";

import type { AssistantCharacter } from "../../assistant-types";

// Substitua o fallback pelo asset real quando existir:
// import ${toPascalCase(fileName)}Gif from "@/assets/gifs/${fileName}.gif";

export const ${variableName} = {
  id: "${fileName}",
  name: "${displayName}",
  image: AstroCatFallback,
  alt: {
    pt: "${displayName} assistente",
    en: "${displayName} assistant",
  },
  ariaLabel: {
    pt: "Interagir com ${displayName}",
    en: "Interact with ${displayName}",
  },
  initialMessage: {
    pt: "Olá. Eu sou ${displayName}. Minha configuração inicial já existe, agora só falta personalidade.",
    en: "Hello. I am ${displayName}. My initial setup exists, now I just need personality.",
  },
  activationMessage: {
    pt: "${displayName} ativado.",
    en: "${displayName} activated.",
  },
  messages: {
    poke: [
      {
        pt: "Mensagem de poke do ${displayName}.",
        en: "${displayName} poke message.",
      },
    ],
    move: [
      {
        pt: "${displayName} foi movido.",
        en: "${displayName} was moved.",
      },
    ],
    shake: [
      {
        pt: "${displayName} foi sacudido.",
        en: "${displayName} was shaken.",
      },
    ],
    advice: [
      {
        pt: "Conselho do ${displayName}.",
        en: "${displayName} advice.",
      },
    ],
    idle: [
      {
        pt: "${displayName} está observando em silêncio.",
        en: "${displayName} is watching silently.",
      },
    ],
  },
} satisfies AssistantCharacter;
`;
}

function toKebabCase(value) {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function toCamelCase(value) {
  return value.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function toPascalCase(value) {
  const camelCase = toCamelCase(value);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

function toDisplayName(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}
