import { Identifier } from "../identifier";
import { createElement } from "../jsx/jsx-factory";
import { renderXmlFile } from "../jsx/render-xml-file";

type PackageProps = {
  identifier: Identifier;
  title: string;
  language: string;
  modifiedAt?: Date;
};

export const renderPackageFile = ({ identifier, title, language, modifiedAt = new Date() }: PackageProps) => {
  const uniqueIdentifier = "pub-id";

  return renderXmlFile(
    <package xmlns="http://www.idpf.org/2007/opf" unique-identifier={uniqueIdentifier} version="3.0">
      <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:identifier id={uniqueIdentifier}>{identifier.toString()}</dc:identifier>
        <dc:title>{title}</dc:title>
        <dc:language>{language}</dc:language>
        <meta property="dcterms:modified">{modifiedAt.toISOString().replace(/\.\d+?Z/, "Z")}</meta>
      </metadata>
      <manifest>
        {/* The only required file is nav */}
        <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav" />
      </manifest>
      <spine>
        {/* At least one item, nav is not required */}
        <itemref idref="nav" />
      </spine>
    </package>,
  );
};
