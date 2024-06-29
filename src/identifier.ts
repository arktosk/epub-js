export enum IdentifierType {
  UUID = "UUID",
  DOI = "DOI",
}

export class Identifier {
  private constructor(
    private readonly type: IdentifierType,
    private readonly value: string,
  ) {}

  toString() {
    return `urn:${this.type.toLowerCase()}:${this.value}`;
  }

  static UUID(value: string) {
    if (!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(value)) {
      throw new Error("The value for the identifier is not valid UUID");
    }
    return new Identifier(IdentifierType.UUID, value);
  }

  static DOI(value: string) {
    return new Identifier(IdentifierType.DOI, value);
  }
}
