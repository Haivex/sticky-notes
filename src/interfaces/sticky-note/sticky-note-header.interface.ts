import Title from '../../value_objects/title';

export interface IStickyNoteHeader {
  getTitle(): Title;
  actionButtons?: HTMLButtonElement[];
  render(): HTMLElement;
}
