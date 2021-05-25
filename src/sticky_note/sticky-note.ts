import { Mediator } from '../interfaces/mediator.interface';
import { Size } from '../interfaces/size.interface';
import StickyNoteContent from './sticky-note-content';
import StickyNoteHeader from './sticky-note-header';

export default class StickyNote {
  private container = document.createElement('div');

  constructor(
    private stickyNoteHeader: StickyNoteHeader,
    private stickyNoteContent: StickyNoteContent,
    private size: Size,
    public readonly mediator: Mediator,
  ) {}

  render(): HTMLElement {
    this.container.innerHTML = '';
    this.container.className = 'note';
    const headerElement = this.stickyNoteHeader.render();
    const contentElement = this.stickyNoteContent.render();
    this.container.append(headerElement, contentElement);
    this.container.style.width = this.size.width.value;
    this.container.style.height = this.size.height.value;
    return this.container;
  }
}
