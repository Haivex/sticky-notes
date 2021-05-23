import StickyNoteContent from './sticky-note-content';
import StickyNoteHeader from './sticky-note-header';

export default class StickyNote {
  private container = document.createElement('div');

  constructor(
    private stickyNoteHeader: StickyNoteHeader,
    private stickyNoteContent: StickyNoteContent,
  ) {}

  render(): HTMLElement {
    this.container.innerHTML = '';
    const headerElement = this.stickyNoteHeader.render();
    const contentElemenet = this.stickyNoteContent.render();
    this.container.append(headerElement, contentElemenet);
    return this.container;
  }
}
