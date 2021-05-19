import { IStickyNoteHeader } from '../interfaces/sticky-note/sticky-note-header.interface';
import Title from '../value_objects/title';

class StickyNoteHeader implements IStickyNoteHeader {
  private constructor(
    public title: Title,
    public actionButtons?: HTMLButtonElement[],
  ) {}

  static create(title: Title, actionButtons?: HTMLButtonElement[]) {
    return new StickyNoteHeader(title, actionButtons);
  }

  render(): HTMLElement {
    const container = document.createElement('div');
    return container;
  }
}
