import { Mediator } from '../interfaces/mediator.interface';
import { IStickyNoteContent } from '../interfaces/sticky-note/sticky-note-content.interface';
import focusLastLine from '../utils/focus-last-line';

export default class StickyNoteContent implements IStickyNoteContent {
  private container = document.createElement('div');

  private contentElement = document.createElement('p');

  private content;

  private constructor(public readonly mediator: Mediator, content?: string) {
    this.content = content || '';
    this.mediator.subscribe('editTriggered', {
      callback: () => {
        focusLastLine(this.contentElement);
      },
      thisRef: this.contentElement,
    });
  }

  static create(mediator: Mediator, content?: string): StickyNoteContent {
    return new StickyNoteContent(mediator, content);
  }

  render(): HTMLElement {
    this.container.innerHTML = '';
    this.container.className = 'note__content';
    this.contentElement.innerHTML = '';

    const text = document.createTextNode(this.content);
    this.contentElement.className = 'note__content__text';
    this.contentElement.dataset.testid = 'paragraph-element';
    this.contentElement.contentEditable = 'true';

    this.contentElement.appendChild(text);
    this.container.appendChild(this.contentElement);

    this.contentElement.addEventListener('input', () => {
      this.content = this.contentElement.textContent || '';
    });

    this.container.addEventListener('dblclick', () => {
      focusLastLine(this.contentElement);
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
