type XMLContainerElement = {
  version: "1.0";
  xmlns: "urn:oasis:names:tc:opendocument:xmlns:container";
};

type XMLRootFilesElement = {};

type XMLRootFileElement = {
  "full-path": string;
  "media-type": string;
};

export type XMLContainerTagNameMap = {
  container: XMLContainerElement;
  rootfiles: XMLRootFilesElement;
  rootfile: XMLRootFileElement;
};
