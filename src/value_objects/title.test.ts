import Title from './title';

const TOO_LONG_TEXT =
  'Id proident culpa voluptate ex aliquip elit. Eu irure ea tempor duis eiusmod commodo sint culpa.';

test('should throw error if title length is greater than 50', () => {
  expect(() => Title.create(TOO_LONG_TEXT)).toThrowError();
});

test('should throw error if title is empty', () => {
  expect(() => Title.create('')).toThrowError();
});

test('should create title if everythins is fine', () => {
  const title = Title.create('Example');
  expect(title).toBeDefined();
  expect(title.value).toBe('Example');
});
