import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";

const archive = new AdmZip(undefined, { noSort: true });

// Mimetype file entry must be the first file in the archive and has no compression
archive.addFile("mimetype", Buffer.from("application/epub+zip"));
archive.getEntry("mimetype")!.header.method = 0; // Disabling compression for particular file

archive.addFile(
    "META-INF/container.xml",
    Buffer.from(`<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
   <rootfiles>
      <rootfile
          full-path="EPUB/package.opf"
          media-type="application/oebps-package+xml" />
   </rootfiles>
</container>`)
);

const uniqueIdentifier = "pub-id";
const identifier = "urn:uuid:A1B0D67E-2E81-4DF5-9E67-A64CBE366809";
const title = "Example Publication";
const language = "en-US";
const modifiedAt = new Date().toISOString().replace(/\.\d+?Z/, "Z");
archive.addFile(
    "EPUB/package.opf",
    Buffer.from(`<?xml version="1.0"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="${uniqueIdentifier}" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="${uniqueIdentifier}">${identifier}</dc:identifier>
    <dc:title>${title}</dc:title>
    <dc:language>${language}</dc:language>
    <meta property="dcterms:modified">${modifiedAt}</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/><!-- required -->
  </manifest>
  <spine>
    <itemref idref="nav" /><!-- not required, but it is the only file -->
  </spine>
</package>`)
);

// <meta name="dtb:uid" content="${identifier}"/>
// <meta name="dtb:depth" content="1"/>
// <!-- <meta name="dtb:generator" content="EBOOK Creator"/> -->
// <meta name="dtb:totalPageCount" content="0"/>
// <meta name="dtb:maxPageNumber" content="0"/>
const tocTitle = "Table of Contents";
archive.addFile(
    "EPUB/nav.xhtml",
    Buffer.from(`<?xml version='1.0' encoding='UTF-8'?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en">
  <head>
    <title>${tocTitle}</title>
  </head>
  <body epub:type="frontmatter">
    <nav epub:type="toc">
      <h1>${tocTitle}</h1>
      <ol>
        <li>
          <a href="nav.xhtml">${tocTitle}</a>
        </li>
      </ol>
    </nav>
  </body>
</html>`)
);

// archive.addFile(
//     "EPUB/intro.xhtml",
//     Buffer.from(`<!DOCTYPE html>
// <html xmlns="http://www.w3.org/1999/xhtml">
//   <head>
//     <title>${title}</title>
//   </head>
// <body>
//   <h1>
//     ${title}
//   </h1>
// </body>
// </html>`)
// );

const archiveBuffer = archive.toBuffer();

(async () => {
    const outPath = path.resolve(process.cwd(), "./out");
    if (!existsSync(outPath)) {
        await fs.mkdir(outPath, { recursive: true });
    }

    await Promise.all(
        ["zip", "epub"].map((ext) =>
            fs.writeFile(
                path.resolve(outPath, `./example.${ext}`),
                archiveBuffer
            )
        )
    );
})();
