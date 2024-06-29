import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";
import { renderContainerFile } from "./templates/container.xml";
import { renderPackageFile } from "./templates/package.opf";
import { renderNavFile } from "./templates/nav.xhtml";
import { Identifier } from "./identifier";

const writeFile = async (file: string, data: Buffer) => {
  const dirName = path.dirname(file);
  if (!existsSync(dirName)) {
    await fs.mkdir(dirName, { recursive: true });
  }
  await fs.writeFile(file, data);
};

(async () => {
  const outPath = path.resolve(process.cwd(), "./out");
  const archive = new AdmZip(undefined, { noSort: true });

  const identifier = Identifier.UUID(randomUUID());
  const title = "Example Publication";
  const language = "en-US";

  const navFilePath = "EPUB/nav.xhtml";
  const navFile = renderNavFile({ language });
  const packageFilePath = "EPUB/package.opf";
  const packageFile = renderPackageFile({ identifier, title, language });
  const containerFilePath = "META-INF/container.xml";
  const containerFile = renderContainerFile({ packageFilePath });

  const mimetypeFilePath = "mimetype";
  const mimetypeFile = Buffer.from("application/epub+zip");
  // Mimetype file entry must be the first file in the archive and has no compression
  archive.addFile(mimetypeFilePath, mimetypeFile);
  archive.getEntry(mimetypeFilePath)!.header.method = 0; // Disabling compression for particular file
  writeFile(path.resolve(outPath, "example", mimetypeFilePath), mimetypeFile);

  await Promise.all(
    [[containerFilePath, containerFile] as const, [packageFilePath, packageFile] as const, [navFilePath, navFile] as const].map(
      async ([filePath, file]: readonly [string, Buffer]) => {
        archive.addFile(filePath, file);
        await writeFile(path.resolve(outPath, "example", filePath), file);
      },
    ),
  );

  // <meta name="dtb:uid" content="${identifier}"/>
  // <meta name="dtb:depth" content="1"/>
  // <!-- <meta name="dtb:generator" content="EBOOK Creator"/> -->
  // <meta name="dtb:totalPageCount" content="0"/>
  // <meta name="dtb:maxPageNumber" content="0"/>
  // archive.addFile("EPUB/nav.xhtml", renderNavFile({ language: "en" }));

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
  // if (!existsSync(outPath)) {
  //   await fs.mkdir(outPath, { recursive: true });
  // }

  await Promise.all(["zip", "epub"].map((ext) => writeFile(path.resolve(outPath, `./example.${ext}`), archiveBuffer)));
})();
