import { Mediator } from '../interfaces/mediator.interface';
import { IStickyNoteHeader } from '../interfaces/sticky-note/sticky-note-header.interface';
import Title from '../value_objects/title';

export default class StickyNoteHeader implements IStickyNoteHeader {
  private container = document.createElement('div');

  private header = document.createElement('h2');

  private constructor(
    private title: Title,
    public readonly mediator: Mediator,
    public actionButtons?: HTMLButtonElement[],
  ) {}

  static create(
    title: Title,
    mediator: Mediator,
    actionButtons?: HTMLButtonElement[],
  ): StickyNoteHeader {
    return new StickyNoteHeader(title, mediator, actionButtons);
  }

  render(): HTMLElement {
    this.container.innerHTML = '';
    this.container.className = 'note__header';
    this.header.innerHTML = '';

    const text = document.createTextNode(this.title.value);

    this.header.className = 'note__header__title';

    this.header.appendChild(text);
    this.header.dataset.testid = 'title-element';
    this.header.contentEditable = 'true';

    this.container.appendChild(this.header);

    this.header.addEventListener('blur', (e) => {
      const targetElement = e.target as HTMLElement;
      try {
        const title = Title.create(targetElement.textContent as string);
        this.changeTitle(title);
      } catch {
        targetElement.textContent = this.title.value;
      }
    });

    const buttons = document.createElement('div');
    buttons.className = 'action_buttons';

    if (this.actionButtons) {
      this.actionButtons.forEach((button) => buttons.appendChild(button));
      this.container.appendChild(buttons);
    }

    this.mediator.subscribe('renameTriggered', {
      callback: () => {
        this.header.focus();
        const range = document.createRange();
        const selection = window.getSelection();
        const lastLineIndex = this.header.childNodes.length - 1;
        const lastLine = this.header.childNodes[lastLineIndex];
        range.setStart(lastLine, lastLine.textContent?.length || 0);
        range.collapse(true);
        selection?.removeAllRanges();
        selection?.addRange(range);
      },
      thisRef: this.header,
    });

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
