export interface IStickyNoteContent {
  getContent(): string;
  changeContent(value: string): string;
  render(): HTMLElement;
}
