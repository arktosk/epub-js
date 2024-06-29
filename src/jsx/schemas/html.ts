type HTMLElement = {
  xmlns: "http://www.w3.org/1999/xhtml";
  "xmlns:epub": "http://www.idpf.org/2007/ops";
  "xml:lang"?: string;
};

type BaseHTMLElement = {};

type HTMLBodyElement = {
  "epub:type"?: "frontmatter";
};

type HTMLNavElement = {
  "epub:type"?: "toc";
};

type HTMLAnchorElement = {
  href: string;
};

export type HTMLTagNameMap = {
  html: HTMLElement;
  head: BaseHTMLElement;
  title: BaseHTMLElement;
  body: HTMLBodyElement;
  nav: HTMLNavElement;
  h1: BaseHTMLElement;
  ol: BaseHTMLElement;
  li: BaseHTMLElement;
  a: HTMLAnchorElement;
};
