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
