const MIN_TITLE_LENGTH = 0;
const MAX_TITLE_LENGTH = 50;
export default class Title {
  private constructor(private givenValue: string) {}

  get value(): string {
    return this.givenValue;
  }

  static create(value: string): Title {
    if (value.length > MIN_TITLE_LENGTH && value.length < MAX_TITLE_LENGTH) {
      return new Title(value);
    }
    throw new Error(
      `User must be greater than ${MIN_TITLE_LENGTH} chars and less than ${MAX_TITLE_LENGTH}!`,
    );
  }
}
