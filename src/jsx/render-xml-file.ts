import XML from "xml-js";

type XmlRendererOptions = {
  version?: string;
  encoding?: string;
  minify?: boolean;
};

export const renderXmlFile = (
  rootElement: JSX.ElementDefinition | JSX.ElementDefinition[],
  { minify, version = "1.0", encoding = "utf-8" }: XmlRendererOptions = {},
) => {
  return Buffer.from(
    XML.js2xml(
      {
        declaration: { attributes: { version, encoding } },
        elements: Array.isArray(rootElement) ? rootElement : [rootElement],
      },
      { spaces: minify === true ? 0 : 4 },
    ),
  );
};
