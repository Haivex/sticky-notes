/**
 * @jest-environment jsdom
 */
import StickyNote from './sticky-note';
import createDefaultStickyNote from './sticky-note-default';

describe('createDefaultStickyNote', () => {
  test('should render title', () => {
    expect(createDefaultStickyNote('Title', 'Content')).toBeInstanceOf(
      StickyNote,
    );
  });
});
