import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import AdmZip from "adm-zip";
import { Identifier } from "./identifier";
import { EPUB } from "./epub";

(async () => {
  const outPath = path.resolve(process.cwd(), "./out");
  const fileName = "example";

  const publication = EPUB({
    identifier: Identifier.UUID(randomUUID()),
    title: "Example Publication",
    language: "en-US",
  });
  const publicationBuffer = publication.toBuffer();

  if (!existsSync(outPath)) {
    await fs.mkdir(outPath, { recursive: true });
  }

  await new AdmZip(publicationBuffer).extractAllToAsync(path.resolve(outPath, `${fileName}`), true);
  await Promise.all(["zip", "epub"].map((ext) => fs.writeFile(path.resolve(outPath, `${fileName}.${ext}`), publicationBuffer)));
})();
