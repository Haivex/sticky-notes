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
    this.clearElements();
    this.initClasses();

    this.contentElement.dataset.testid = 'paragraph-element';
    this.contentElement.contentEditable = 'true';

    this.initEvents();

    const text = document.createTextNode(this.content);
    this.contentElement.appendChild(text);
    this.container.appendChild(this.contentElement);

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

  private clearElements() {
    this.container.innerHTML = '';
    this.contentElement.innerHTML = '';
  }

  private initEvents() {
    this.contentElement.addEventListener('input', () => {
      this.content = this.contentElement.textContent || '';
    });

    this.container.addEventListener('dblclick', () => {
      focusLastLine(this.contentElement);
    });
  }

  private initClasses() {
    this.container.className = 'note__content';
    this.contentElement.className = 'note__content__text';
  }
}
