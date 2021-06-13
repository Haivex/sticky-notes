import { Mediator } from '../interfaces/mediator.interface';
import { IStickyNoteHeader } from '../interfaces/sticky-note/sticky-note-header.interface';
import focusLastLine from '../utils/focus-last-line';
import Title from '../value_objects/title';

export default class StickyNoteHeader implements IStickyNoteHeader {
  private container = document.createElement('div');

  private header = document.createElement('h2');

  private buttonsContainer = document.createElement('div');

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
    this.clearElements();
    this.initClasses();
    this.initEvents();

    const text = document.createTextNode(this.title.value);

    this.header.appendChild(text);
    this.header.dataset.testid = 'title-element';
    this.header.contentEditable = 'true';

    this.container.appendChild(this.header);

    this.createActionButtons();

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

  private clearElements() {
    this.container.innerHTML = '';
    this.header.innerHTML = '';
  }

  private initClasses() {
    this.container.className = 'note__header';
    this.header.className = 'note__header__title';
  }

  private initEvents() {
    this.header.addEventListener('blur', (e) => {
      const targetElement = e.target as HTMLElement;
      try {
        const title = Title.create(targetElement.textContent as string);
        this.changeTitle(title);
      } catch {
        targetElement.textContent = this.title.value;
      }
    });

    this.mediator.subscribe('renameTriggered', {
      callback: () => {
        focusLastLine(this.header);
      },
      thisRef: this.header,
    });
  }

  private createActionButtons() {
    this.buttonsContainer.className = 'action_buttons';

    if (this.actionButtons) {
      this.actionButtons.forEach((button) =>
        this.buttonsContainer.appendChild(button),
      );
      this.container.appendChild(this.buttonsContainer);
    }
  }

  public getContainer(): HTMLElement {
    return this.container;
  }
}
