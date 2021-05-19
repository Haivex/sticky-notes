import Title from '../../value_objects/title';

export interface IStickyNoteHeader {
  title: Title;
  actionButtons?: HTMLButtonElement[];
  render(): HTMLElement;
}
