import "./jsx";

const sanitizeAttributes = (attributes: Record<string, string[] | string | void>): Record<string, string> =>
  Object.entries(attributes).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value == null) {
      return acc;
    }
    if (Array.isArray(value)) {
      acc[key] = value.join(" ");
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});

const flattenChildren = (children: JSX.NestedArray<JSX.AnyChildElement>): JSX.AnyChildElement[] => {
  // @ts-ignore
  return children.flat(Infinity);
};

const transformChildren = (children: JSX.NestedArray<JSX.AnyChildElement>): JSX.AnyDefinition[] =>
  flattenChildren(children).reduce<JSX.AnyDefinition[]>((acc, child) => {
    if (child == null) {
      return acc;
    }
    if (typeof child === "object" && "type" in child) {
      return [...acc, child];
    }
    return [...acc, { type: "text", text: child }];
  }, []);

export function createElement(
  elementNameOrComponent: JSX.Tag | JSX.Component,
  attributes: Record<string, string[] | string | void> | null | undefined = {},
  ...children: (JSX.ElementDefinition | number | string | boolean | null)[]
): JSX.ElementDefinition {
  if (typeof elementNameOrComponent === "function") {
    return elementNameOrComponent(attributes ?? {}, children);
  }
  return {
    type: "element",
    name: elementNameOrComponent,
    attributes: sanitizeAttributes(attributes ?? {}),
    elements: transformChildren(children),
  };
}

export const createFragment: JSX.Fragment = (_, children) => {
  return transformChildren(children);
};
