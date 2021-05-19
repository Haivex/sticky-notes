export default class MeasureOfLength {
  static measureOfLengthRegExp =
    /^(?<measureNumber>\d{1,})(?<unit>[a-z]{1,})$/i;

  private constructor(
    public readonly measureNumber: number,
    public readonly unit: string,
  ) {}

  get value(): string {
    return this.measureNumber + this.unit;
  }

  static isValid(measureOfLength: string | number): boolean {
    if (typeof measureOfLength === 'string') {
      return this.measureOfLengthRegExp.test(measureOfLength);
    }
    return measureOfLength > 0;
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

  static create(measure: number | string): MeasureOfLength {
    if (typeof measure === 'string') {
      return new MeasureOfLength(...this.getNumberAndUnit(measure));
    }
    if (this.isValid(measure)) {
      throw new Error('Measure can not be negative number');
    }
    return new MeasureOfLength(measure, 'px');
  }
}
