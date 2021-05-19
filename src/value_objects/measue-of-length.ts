export default class MeasureOfLength {
  static measureOfLengthRegExp =
    /^(?<measureNumber>\d{1,})(?<unit>[a-z]{1,})$/i;

  private constructor(private measureNumber: number, private unit: string) {}

  static isValid(measureOfLength: string): boolean {
    return this.measureOfLengthRegExp.test(measureOfLength);
  }

  static getNumberAndUnit(measureOfLength: string): [number, string] {
    if (this.isValid(measureOfLength)) {
      const result = measureOfLength.match(
        this.measureOfLengthRegExp,
      ) as RegExpMatchArray;
      const { measureNumber, unit } = result.groups as {
        measureNumber: string;
        unit: string;
      };
      return [Number(measureNumber), unit];
    }
    throw new Error('Wrong format!');
  }
}
