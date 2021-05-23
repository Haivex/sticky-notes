/**
 * @jest-environment jsdom
 */
import { getByTestId } from '@testing-library/dom';
import MeasureOfLength from '../value_objects/measue-of-length';
import Title from '../value_objects/title';
import StickyNote from './sticky-note';
import StickyNoteContent from './sticky-note-content';
import StickyNoteHeader from './sticky-note-header';

describe('render', () => {
  let renderedNote: HTMLElement;
  beforeAll(() => {
    const createdTitle = Title.create('Exmaple title');
    const header = StickyNoteHeader.create(createdTitle);
    const createdContent = StickyNoteContent.create('Example content');
    const height = MeasureOfLength.create(100);
    const width = MeasureOfLength.create(100);
    const note = new StickyNote(header, createdContent, { height, width });
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
