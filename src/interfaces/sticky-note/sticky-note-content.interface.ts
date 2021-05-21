export interface StickyNoteContent {
  getContent(): string;
  changeContent(value: string): string;
  render(): HTMLElement;
}
