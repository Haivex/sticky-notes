import MeasureOfLength from './measue-of-length';

describe('isValid', () => {
  test('should return true for string: 200px', () => {
    expect(MeasureOfLength.isValid('200px')).toBeTruthy();
  });
  test('should return true for number: 200', () => {
    expect(MeasureOfLength.isValid(200)).toBeTruthy();
  });
  test('should return false for number: -200', () => {
    expect(MeasureOfLength.isValid(-200)).toBeFalsy();
  });
  test('should return false for string: -200px', () => {
    expect(MeasureOfLength.isValid('-200px')).toBeFalsy();
  });
  test('should return false for string: 200', () => {
    expect(MeasureOfLength.isValid('200')).toBeFalsy();
  });
  test('should return false for string: px200', () => {
    expect(MeasureOfLength.isValid('px200')).toBeFalsy();
  });
  test('should return false for string: 20px36', () => {
    expect(MeasureOfLength.isValid('20px36')).toBeFalsy();
  });
});

describe('getNumberAndUnit', () => {
  test('should return tupple array with number and unit for 200px', () => {
    expect(MeasureOfLength.getNumberAndUnit('200px')).toStrictEqual([
      200,
      'px',
    ]);
  });
  test('should throw error for wrong format', () => {
    expect(() => MeasureOfLength.getNumberAndUnit('px200')).toThrowError();
  });
});

describe('create', () => {
  test('should create measure for right string input', () => {
    expect(MeasureOfLength.create('200px')).toBeDefined();
  });
  test('should create measure for right number input', () => {
    expect(MeasureOfLength.create(200)).toBeDefined();
  });
  test('should throw error for wrong number input', () => {
    expect(() => MeasureOfLength.create(-200)).toThrowError();
  });
  test('should throw error for wrong string input', () => {
    expect(() => MeasureOfLength.create('-200p8')).toThrowError();
  });
});
