import path from "node:path";
import AdmZip from "adm-zip";
import { Constants } from "adm-zip/util";
import { Identifier } from "./identifier";
import { renderContainerFile } from "./templates/container.xml";
import { renderNavFile } from "./templates/nav.xhtml";
import { renderPackageFile } from "./templates/package.opf";

const MIMETYPE = "mimetype";
const EPUB_MIMETYPE = "application/epub+zip";

type EPUBOptions = {
  readonly identifier: Identifier;
  readonly title: string;
  readonly language: string;
};

export const EPUB = ({ identifier, title, language }: EPUBOptions) => {
  const packageFolder = "EPUB";
  const packageFileName = "package.opf";
  const packageFilePath = path.join(packageFolder, packageFileName);
  const navFileName = "nav.xhtml";

  const files: [string, Buffer][] = [
    // Mimetype file entry must be the first file in the archive and has no compression
    [MIMETYPE, Buffer.from(EPUB_MIMETYPE)],

    ["META-INF/container.xml", renderContainerFile({ packageFilePath })],

    /**/ [packageFilePath, renderPackageFile({ identifier, title, language, navigation: { path: navFileName } })],
    /**/ [path.join(packageFolder, navFileName), renderNavFile({ language })],
  ];

  return {
    files: () => files,
    toBuffer() {
      const archive = new AdmZip(undefined, { noSort: true, method: Constants.DEFLATED });
      files.forEach(([entryName, content]) => {
        archive.addFile(entryName, content);
      });
      archive.getEntry(MIMETYPE)!.header.method = Constants.STORED; // Disabling compression for particular mimetype file

      return archive.toBuffer();
    },
  };
};
