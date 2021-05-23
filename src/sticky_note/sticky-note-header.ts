import { IStickyNoteHeader } from '../interfaces/sticky-note/sticky-note-header.interface';
import Title from '../value_objects/title';

export default class StickyNoteHeader implements IStickyNoteHeader {
  private container = document.createElement('div');

  private constructor(
    private title: Title,
    public actionButtons?: HTMLButtonElement[],
  ) {}

  static create(
    title: Title,
    actionButtons?: HTMLButtonElement[],
  ): StickyNoteHeader {
    return new StickyNoteHeader(title, actionButtons);
  }

  render(): HTMLElement {
    this.container.innerHTML = '';

    const text = document.createTextNode(this.title.value);
    const header = document.createElement('h2');

    header.appendChild(text);
    header.dataset.testid = 'title-element';
    this.container.appendChild(header);

    const buttons = document.createElement('div');

    if (this.actionButtons) {
      this.actionButtons.forEach((button) => buttons.appendChild(button));
      this.container.appendChild(buttons);
    }

    return this.container;
  }

  getTitle(): Title {
    return this.title;
  }

  changeTitle(newTitle: Title): Title {
    this.title = newTitle;
    this.render();
    return this.title;
  }
}
