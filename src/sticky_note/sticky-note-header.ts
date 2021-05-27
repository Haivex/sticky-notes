import { Mediator } from '../interfaces/mediator.interface';
import { IStickyNoteHeader } from '../interfaces/sticky-note/sticky-note-header.interface';
import Title from '../value_objects/title';

export default class StickyNoteHeader implements IStickyNoteHeader {
  private container = document.createElement('div');

  private constructor(
    private title: Title,
    public readonly mediator: Mediator,
    public actionButtons?: HTMLButtonElement[],
  ) {
    this.mediator.subscribe('renameTriggered', {
      callback: this.changeTitle,
      thisRef: this,
    });
  }

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

    const text = document.createTextNode(this.title.value);
    const header = document.createElement('h2');
    header.className = 'note__header__title';

    header.appendChild(text);
    header.dataset.testid = 'title-element';
    this.container.appendChild(header);

    const buttons = document.createElement('div');
    buttons.className = 'action_buttons';

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
