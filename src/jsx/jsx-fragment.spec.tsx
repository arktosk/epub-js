import { deepEqual } from "node:assert/strict";
import { describe, it } from "mocha";
import { createElement, createFragment } from "./jsx-factory";

describe("JSX Fragment", () => {
  it(`should produce flat array of child elements`, () => {
    const Fragment = () => (
      <>
        test
        {true}
        test2
        {1024.69}
        {Array.from(Array(2), (_, index) => `Item from array no.${index + 1}`)}
      </>
    );

    deepEqual(Fragment(), [
      { type: "text", text: "test" },
      { type: "text", text: true },
      { type: "text", text: "test2" },
      { type: "text", text: 1024.69 },
      { type: "text", text: "Item from array no.1" },
      { type: "text", text: "Item from array no.2" },
    ]);

    const Fragment2 = () => (
      <>
        <rootfile full-path="TEST/file-a.txt" media-type="text/plain" />
        <rootfile full-path="TEST/file-b.txt" media-type="text/plain" />
      </>
    );

    deepEqual(Fragment2(), [
      {
        attributes: {
          "full-path": "TEST/file-a.txt",
          "media-type": "text/plain",
        },
        elements: [],
        name: "rootfile",
        type: "element",
      },
      {
        attributes: {
          "full-path": "TEST/file-b.txt",
          "media-type": "text/plain",
        },
        elements: [],
        name: "rootfile",
        type: "element",
      },
    ]);
  });
});
