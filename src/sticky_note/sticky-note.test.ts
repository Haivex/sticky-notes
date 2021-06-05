/**
 * @jest-environment jsdom
 */
import { getByTestId } from '@testing-library/dom';
import MeasureOfLength from '../value_objects/measue-of-length';
import Title from '../value_objects/title';
import createStickyNote from './sticky-note';
import StickyNoteContent from './sticky-note-content';
import StickyNoteHeader from './sticky-note-header';
import StickyNoteMediator from './sticky-note-mediator';

describe('render', () => {
  let renderedNote: HTMLElement;
  beforeAll(() => {
    const createdTitle = Title.create('Exmaple title');
    const header = StickyNoteHeader.create(
      createdTitle,
      new StickyNoteMediator(),
    );
    const createdContent = StickyNoteContent.create(
      new StickyNoteMediator(),
      'Example content',
    );
    const height = MeasureOfLength.create(100);
    const width = MeasureOfLength.create(100);
    const note = createStickyNote(
      header,
      createdContent,
      { height, width },
      new StickyNoteMediator(),
    );
    renderedNote = note.render();
  });

  test('should render title', () => {
    expect(getByTestId(renderedNote, 'title-element')).toBeTruthy();
  });

  test('should render content', () => {
    expect(getByTestId(renderedNote, 'paragraph-element')).toBeTruthy();
  });

  test('should proper size', () => {
    expect(renderedNote.style.width).toBe('100px');
    expect(renderedNote.style.height).toBe('100px');
  });
});
