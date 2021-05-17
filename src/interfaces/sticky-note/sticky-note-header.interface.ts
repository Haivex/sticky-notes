import Title from '../../value_objects/title';

export interface StickyNoteHeader {
  title: Title;
  actionButtons?: HTMLButtonElement[];
}
