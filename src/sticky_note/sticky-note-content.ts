import { Mediator } from '../interfaces/mediator.interface';
import { IStickyNoteContent } from '../interfaces/sticky-note/sticky-note-content.interface';
import focusLastLine from '../utils/focus-last-line';

export default class StickyNoteContent implements IStickyNoteContent {
  private container = document.createElement('div');

  private contentTextElement = document.createElement('p');

  private content;

  private constructor(public readonly mediator: Mediator, content?: string) {
    this.content = content || '';
    this.mediator.subscribe('editTriggered', {
      callback: () => {
        focusLastLine(this.contentTextElement);
      },
      thisRef: this.contentTextElement,
    });
  }

  static create(mediator: Mediator, content?: string): StickyNoteContent {
    return new StickyNoteContent(mediator, content);
  }

  render(): HTMLElement {
    this.clearElements();
    this.initClasses();

    this.contentTextElement.dataset.testid = 'paragraph-element';
    this.contentTextElement.contentEditable = 'true';

    this.initEvents();

    const text = document.createTextNode(this.content);
    this.contentTextElement.appendChild(text);
    this.container.appendChild(this.contentTextElement);

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
    this.contentTextElement.innerHTML = '';
  }

  private initEvents() {
    this.contentTextElement.addEventListener('input', () => {
      this.content = this.contentTextElement.textContent || '';
    });

    this.container.addEventListener('dblclick', () => {
      focusLastLine(this.contentTextElement);
    });
  }

  private initClasses() {
    this.container.className = 'note__content';
    this.contentTextElement.className = 'note__content__text';
  }

  public getContainer(): HTMLElement {
    return this.container;
  }
}
