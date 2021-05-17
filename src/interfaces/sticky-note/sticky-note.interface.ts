import { Size } from '../size.interface';
import { StickyNoteContent } from './sticky-note-content.interface';
import { StickyNoteHeader } from './sticky-note-header.interface';
import { StickyNoteOptions } from './sticky-note-options.interface';

export interface StickyNote extends StickyNoteOptions {
  header: StickyNoteHeader;
  content: StickyNoteContent;
  size: Size;
}
