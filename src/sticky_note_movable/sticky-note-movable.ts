import StickyNote from '../sticky_note/sticky-note';

export default class MovableStickyNote extends StickyNote {
  private offsetX = 0;

  private offsetY = 0;

  render(): HTMLElement {
    super.render();
    this.container.draggable = true;

    this.container.addEventListener('mousemove', (e) => {});

    this.container.addEventListener('dragstart', (e) => {
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;
    });

    this.container.addEventListener('drag', (e) => {
      this.container.style.left = `${e.x - this.offsetX}px`;
      this.container.style.top = `${e.y - this.offsetY}px`;
      // this.container.style.top = `${e.pageY}px`;
    });

    this.container.addEventListener('dragend', (e) => {
      this.container.style.left = `${e.x - this.offsetX}px`;
      this.container.style.top = `${e.y - this.offsetY}px`;
    });

    return this.container;
  }
}
