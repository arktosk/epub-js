type XMLContainerElement = {
  version: "1.0";
  xmlns: "urn:oasis:names:tc:opendocument:xmlns:container";
};

type XMLRootFilesElement = {
  [key: string]: void;
};

type XMLRootFileElement = {
  "full-path": string;
  "media-type": string;
};

type XMLContainerTagNameMap = {
  container: XMLContainerElement;
  rootfiles: XMLRootFilesElement;
  rootfile: XMLRootFileElement;
};

type XMLPackageElement = {
  version: "3.0";
  "unique-identifier": string;
  xmlns: "http://www.idpf.org/2007/opf";
  "xml:lang"?: string;
  // [key: `xmlns:${string}`]: string | undefined;
};

type XMLManifestElement = {
  "xmlns:dc"?: "http://purl.org/dc/elements/1.1/";
  "xmlns:dcterms"?: "http://purl.org/dc/terms/";
};

type ManifestItemProperty = "cover-image" | "mathml" | "nav" | "remote-resources" | "scripted" | "svg";

type XMLItemElement = {
  id: string;
  href: string;
  "media-type": string;
  properties?: ManifestItemProperty | ManifestItemProperty[];
};

type XMLMetadata = { "xmlns:dc": string };

type XMLDCIdentifierElement = {
  id: string;
};

type XMLDCTitleElement = {
  id?: string;
  "xml:lang"?: string;
};

type XMLDCLanguageElement = {
  id?: string;
};

type XMLDCCreatorElement = {
  id?: string;
};

type XMLDCPublisherElement = {
  id?: string;
};

type XMLDCRightsElement = {
  id?: string;
};

type XMLDCDateElement = {
  id?: string;
};

type XMLMetaElement = {
  id?: string;
  property: string;
  refines?: string;
  scheme?: string;
  "xml:lang"?: string;
};

type XMLItemrefElement = {
  id?: string;
  idref: string;
  linear?: "yes" | "no";
  properties?: "page-spread-left" | "page-spread-right";
};

type XMLSpineElement = {
  id?: string;
  "page-progression-direction"?: "ltr" | "rtl" | "default";
  /** @legacy Manifest item id that represents the NCX */
  toc?: string;
  // children: Element[];
};

type HMLGuideElement = {
  [key: string]: void;
};

type GuideReferenceType =
  | "cover" /** the book cover(s), jacket information, etc. */
  | "title-page" /** page with possibly title, author, publisher, and other metadata */
  | "toc" /** table of contents */
  | "index" /** back-of-book style index */
  | "glossary"
  | "acknowledgements"
  | "bibliography"
  | "colophon"
  | "copyright-page"
  | "dedication"
  | "epigraph"
  | "foreword"
  | "loi" /** list of illustrations */
  | "lot" /** list of tables */
  | "notes"
  | "preface"
  | "text" /** First "real" page of content (e.g. "Chapter 1") */;

type XMLReferenceElement = {
  type: GuideReferenceType;
  title: string;
  href: string;
};

type XMLPackageTagNameMap = {
  package: XMLPackageElement;
  metadata: XMLMetadata;
  "dc:identifier": XMLDCIdentifierElement;
  "dc:title": XMLDCTitleElement;
  "dc:language": XMLDCLanguageElement;
  "dc:creator": XMLDCCreatorElement;
  "dc:publisher": XMLDCPublisherElement;
  "dc:rights": XMLDCRightsElement;
  "dc:date": XMLDCDateElement;
  manifest: XMLManifestElement;
  item: XMLItemElement;
  spine: XMLSpineElement;
  itemref: XMLItemrefElement;
  meta: XMLMetaElement;
  guide: HMLGuideElement;
  reference: XMLReferenceElement;
};

type HTMLElement = {
  xmlns: "http://www.w3.org/1999/xhtml";
  "xmlns:epub"?: "http://www.idpf.org/2007/ops";
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

type HTMLTagNameMap = {
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

declare namespace JSX {
  // type Element = {
  //   tag: string;
  //   attrs: Record<string, string>;
  //   children: (Element | string | number)[];
  // };

  // interface ElementChildrenAttribute {
  //   children: {};
  // }

  export interface IntrinsicElements extends XMLContainerTagNameMap, XMLPackageTagNameMap, HTMLTagNameMap {}

  export type Tag = keyof IntrinsicElements;

  // interface AnyProps {
  //   [key: string]: any;
  // }

  type TextDefinition = {
    type: "text";
    text: string | number | boolean;
  };

  export type ElementDefinition = {
    type: "element";
    name: string;
    attributes: Record<string, string | void>;
    elements: AnyDefinition[];
  };

  export type AnyDefinition = TextDefinition | ElementDefinition;

  export interface Component {
    (properties: Record<string, any>, children?: (ElementDefinition | string | number | boolean | null)[]): ElementDefinition;
  }

  export type NestedArray<T> = (T | NestedArray<T>)[];

  export type AnyChildElement = ElementDefinition | number | string | boolean | null;

  export interface Fragment {
    (attrs: { [key: PropertyKey]: void } | undefined, children: NestedArray<AnyChildElement>[]): AnyDefinition[];
  }
}
