type XMLPackageElement = {
  version: "3.0";
  "unique-identifier": string;
  xmlns: "http://www.idpf.org/2007/opf";
  "xml:lang"?: string;
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

type XMLMetadataElement = { "xmlns:dc": string };

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

export type XMLPackageTagNameMap = {
  package: XMLPackageElement;
  metadata: XMLMetadataElement;
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
