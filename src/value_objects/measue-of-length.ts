export default class MeasureOfLength {
  static measureOfLengthRegExp =
    /^(?<measureNumber>\d{1,})(?<unit>[a-z]{1,})$/i;

  private constructor(private measureNumber: number, private unit: string) {}

  static isValid(measureOfLength: string): boolean {
    return this.measureOfLengthRegExp.test(measureOfLength);
  }
}
