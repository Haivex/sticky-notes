import { IStickyNoteContent } from '../interfaces/sticky-note/sticky-note-content.interface';

export default class StickyNoteContent implements IStickyNoteContent {
  private container = document.createElement('div');

  private content;

  private constructor(content?: string) {
    this.content = content || '';
  }

  static create(content?: string): StickyNoteContent {
    return new StickyNoteContent(content);
  }

  render(): HTMLElement {
    this.container.innerHTML = '';

    const text = document.createTextNode(this.content);
    const contentElement = document.createElement('p');
    contentElement.dataset.testid = 'paragraph-element';

    contentElement.appendChild(text);
    this.container.appendChild(contentElement);

    return this.container;
  }

  getContent(): string {
    return this.content;
  }

  changeContent(newContent: string): string {
    this.content = newContent;
    return this.content;
  }
}
