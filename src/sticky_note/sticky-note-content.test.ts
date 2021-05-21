/**
 * @jest-environment jsdom
 */
import { getByTestId } from '@testing-library/dom';
import StickyNoteContent from './sticky-note-content';

describe('render', () => {
  let content: StickyNoteContent;
  let contentElement: HTMLElement;

  test('should render empty content if no parameter', () => {
    content = StickyNoteContent.create();
    contentElement = content.render();
    expect(getByTestId(contentElement, 'paragraph-element').textContent).toBe(
      '',
    );
  });
});
