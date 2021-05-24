/**
 * @jest-environment jsdom
 */
import ActionButton from './action-button';

describe('create', () => {
  test('should create class instance', () => {
    const mock = jest.fn();
    const actionButton = ActionButton.create(
      'edit',
      ['fas', 'fa-pencil-alt'],
      () => mock(),
    );
    expect(actionButton).toBeInstanceOf(ActionButton);
  });
});

describe('render', () => {
  const mock = jest.fn();
  let actionButton: ActionButton;
  let renderedButton: HTMLButtonElement;
  beforeEach(() => {
    actionButton = ActionButton.create('edit', ['fas', 'fa-pencil-alt'], () =>
      mock(),
    );
    renderedButton = actionButton.render();
  });
  test('button should has proper title', () => {
    expect(renderedButton.title).toBe('edit');
  });
  test('button should has proper className', () => {
    expect(renderedButton.className).toBe('action_button');
  });
  test('button should has icon element with given classNames', () => {
    expect(
      renderedButton.getElementsByClassName('fas fa-pencil-alt'),
    ).toBeDefined();
  });
  test('button should has attached event', () => {
    renderedButton.click();
    expect(mock).toBeCalled();
  });
});
