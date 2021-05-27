/**
 * @jest-environment jsdom
 */
import { getByTestId } from '@testing-library/dom';
import { Mediator } from '../interfaces/mediator.interface';
import StickyNoteContent from './sticky-note-content';
import StickyNoteMediator from './sticky-note-mediator';

describe('render', () => {
  let content: StickyNoteContent;
  let contentElement: HTMLElement;

  test('should render empty content if no parameter', () => {
    content = StickyNoteContent.create(new StickyNoteMediator());
    contentElement = content.render();
    expect(getByTestId(contentElement, 'paragraph-element').textContent).toBe(
      '',
    );
  });

  test('should render content with given text', () => {
    content = StickyNoteContent.create(
      new StickyNoteMediator(),
      'Example text',
    );
    contentElement = content.render();
    expect(getByTestId(contentElement, 'paragraph-element').textContent).toBe(
      'Example text',
    );
  });
});

describe('getContent', () => {
  test('should return content', () => {
    const stickyNoteContent = StickyNoteContent.create(
      new StickyNoteMediator(),
      'Example text',
    );
    expect(stickyNoteContent.getContent()).toBe('Example text');
  });
});

describe('changeContent', () => {
  test('should change content', () => {
    const stickyNoteContent = StickyNoteContent.create(
      new StickyNoteMediator(),
      'Example text',
    );
    stickyNoteContent.changeContent('Other content');
    expect(stickyNoteContent.getContent()).toBe('Other content');
  });

  test('should render with new text', () => {
    const stickyNoteContent = StickyNoteContent.create(
      new StickyNoteMediator(),
      'Example text',
    );
    stickyNoteContent.changeContent('Other content');
    const contentElement = stickyNoteContent.render();
    expect(getByTestId(contentElement, 'paragraph-element').textContent).toBe(
      'Other content',
    );
  });
});
