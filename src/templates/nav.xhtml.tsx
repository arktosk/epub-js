import { createElement } from "../jsx/jsx-factory";
import { renderXmlFile } from "../jsx/render-xml-file";

type NavFileProps = {
  tocTitle?: string;
  language?: string;
};

export const renderNavFile = ({ tocTitle = "Table of Contents", language }: NavFileProps) => {
  return renderXmlFile(
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang={language?.split("-").at(0)}>
      <head>
        <title>{tocTitle}</title>
      </head>
      <body epub:type="frontmatter">
        <nav epub:type="toc">
          <h1>{tocTitle}</h1>
          <ol>
            <li>
              <a href="nav.xhtml">{tocTitle}</a>
            </li>
          </ol>
        </nav>
      </body>
    </html>,
  );
};
