import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Dividir el contenido por bloques de párrafo / líneas
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let inList = false;
  let listItems: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Manejo de listas (- o *)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      const text = trimmed.substring(2);
      listItems.push(
        <li key={`li-${index}`} className="text-white/80 leading-relaxed font-normal">
          {renderInlineFormatting(text)}
        </li>
      );
      return;
    } else if (inList) {
      inList = false;
      elements.push(
        <ul key={`ul-${index}`} className="list-disc list-inside my-6 space-y-2 pl-4 text-[#4ECCA3]">
          {[...listItems]}
        </ul>
      );
      listItems = [];
    }

    // Línea vacía
    if (!trimmed) {
      return;
    }

    // Encabezados
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="text-2xl font-bold text-white mt-10 mb-4 tracking-tight">
          {renderInlineFormatting(trimmed.replace("### ", ""))}
        </h3>
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="text-3xl font-extrabold text-white mt-12 mb-6 tracking-tight border-b border-white/10 pb-3">
          {renderInlineFormatting(trimmed.replace("## ", ""))}
        </h2>
      );
      return;
    }
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1 key={index} className="text-4xl font-black text-white mt-14 mb-6 tracking-tight">
          {renderInlineFormatting(trimmed.replace("# ", ""))}
        </h1>
      );
      return;
    }

    // Citas (Blockquotes > )
    if (trimmed.startsWith("> ")) {
      elements.push(
        <blockquote key={index} className="my-8 p-6 rounded-2xl bg-gradient-to-r from-[#4ECCA3]/10 to-transparent border-l-4 border-[#4ECCA3] backdrop-blur-sm italic text-lg text-white/90 shadow-[0_0_30px_rgba(78,204,163,0.1)]">
          {renderInlineFormatting(trimmed.replace("> ", ""))}
        </blockquote>
      );
      return;
    }

    // Imágenes (![alt](url)) — solo se muestra la imagen de portada del post
    if (/^!\[.*?\]\(.*?\)$/.test(trimmed)) {
      return;
    }

    // Párrafo estándar
    elements.push(
      <p key={index} className="text-lg text-white/80 leading-relaxed my-5 font-normal tracking-wide">
        {renderInlineFormatting(trimmed)}
      </p>
    );
  });

  // Si quedó alguna lista pendiente
  if (inList && listItems.length > 0) {
    elements.push(
      <ul key="ul-final" className="list-disc list-inside my-6 space-y-2 pl-4 text-[#4ECCA3]">
        {listItems}
      </ul>
    );
  }

  return <div className="markdown-body font-sans">{elements}</div>;
};

/**
 * Procesa formatos inline como **negrita**, *cursiva*, `código` y [enlaces](url)
 */
function renderInlineFormatting(text: string): React.ReactNode {
  // Enlaces Markdown [texto](url)
  const parts = text.split(/(\[.*?\]\(.*?\))/g);

  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4ECCA3] underline underline-offset-4 font-semibold hover:text-white transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Negritas **texto**
    const boldParts = part.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((subPart, j) => {
      if (subPart.startsWith("**") && subPart.endsWith("**")) {
        return (
          <strong key={j} className="font-bold text-white">
            {subPart.slice(2, -2)}
          </strong>
        );
      }

      // Cursiva *texto*
      const italicParts = subPart.split(/(\*.*?\*)/g);
      return italicParts.map((itPart, k) => {
        if (itPart.startsWith("*") && itPart.endsWith("*") && itPart.length > 2) {
          return (
            <em key={k} className="italic text-white/90">
              {itPart.slice(1, -1)}
            </em>
          );
        }
        return itPart;
      });
    });
  });
}
