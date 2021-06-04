import { Mediator } from '../mediator.interface';
import { Size } from '../size.interface';
import { IStickyNoteContent } from './sticky-note-content.interface';
import { IStickyNoteHeader } from './sticky-note-header.interface';

export interface StickyNote {
  container: HTMLElement;
  header: IStickyNoteHeader;
  content: IStickyNoteContent;
  size: Size;
  mediator: Mediator;
  render(): HTMLElement;
}
