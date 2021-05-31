import { Mediator } from '../interfaces/mediator.interface';
import { Size } from '../interfaces/size.interface';
import StickyNote from './sticky-note';
import StickyNoteContent from './sticky-note-content';
import StickyNoteHeader from './sticky-note-header';

export default class ResizableStickyNote extends StickyNote {
  render(): HTMLElement {
    super.render();
    this.container.classList.add('resizable');
    return this.container;
  }
}
