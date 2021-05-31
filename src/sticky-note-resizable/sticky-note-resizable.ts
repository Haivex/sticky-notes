import StickyNote from '../sticky_note/sticky-note';

export default class ResizableStickyNote extends StickyNote {
  private dragbarHorizontal: HTMLElement = document.createElement('div');

  private dragbarVertical: HTMLElement = document.createElement('div');

  render(): HTMLElement {
    super.render();
    this.container.classList.add('resizable');
    this.dragbarVertical.classList.add('dragbarVertical');
    this.dragbarVertical.style.right = '0';
    this.dragbarHorizontal.classList.add('dragbarHorizontal');
    this.dragbarHorizontal.style.bottom = '0';
    this.container.appendChild(this.dragbarHorizontal);
    this.container.appendChild(this.dragbarVertical);
    return this.container;
  }
}
