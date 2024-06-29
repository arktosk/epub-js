import { createElement } from "../jsx/jsx-factory";
import { renderXmlFile } from "../jsx/render-xml-file";

export type ContainerDefinition = {
  packageFilePath: string;
};

export const renderContainerFile = ({ packageFilePath }: ContainerDefinition) =>
  renderXmlFile(
    <container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
      <rootfiles>
        <rootfile full-path={packageFilePath} media-type="application/oebps-package+xml" />
      </rootfiles>
    </container>,
  );
