import { Mediator } from '../interfaces/mediator.interface';
import { IStickyNoteContent } from '../interfaces/sticky-note/sticky-note-content.interface';

export default class StickyNoteContent implements IStickyNoteContent {
  private container = document.createElement('div');

  private content;

  private constructor(public readonly mediator: Mediator, content?: string) {
    this.content = content || '';
  }

  static create(mediator: Mediator, content?: string): StickyNoteContent {
    return new StickyNoteContent(mediator, content);
  }

  render(): HTMLElement {
    this.container.innerHTML = '';
    this.container.className = 'note__content';

    const text = document.createTextNode(this.content);
    const contentElement = document.createElement('p');
    contentElement.className = 'note__content__text';
    contentElement.dataset.testid = 'paragraph-element';
    contentElement.contentEditable = 'true';

    contentElement.appendChild(text);
    this.container.appendChild(contentElement);

    contentElement.addEventListener('input', () => {
      this.content = contentElement.textContent || '';
    });

    this.container.addEventListener('dblclick', () => {
      const range = document.createRange();
      const selection = window.getSelection();
      const lastLineIndex = contentElement.childNodes.length - 1;
      const lastLine = contentElement.childNodes[lastLineIndex];
      range.setStart(lastLine, lastLine.textContent?.length || 0);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
      contentElement.focus();
    });

    return this.container;
  }

  getContent(): string {
    return this.content;
  }

  changeContent(newContent: string): string {
    this.content = newContent;
    this.render();
    return this.content;
  }
}
