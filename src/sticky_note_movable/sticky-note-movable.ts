import StickyNote from '../sticky_note/sticky-note';

export default class MovableStickyNote extends StickyNote {
  private offsetX = 0;

  private offsetY = 0;

  private isMoving = false;

  render(): HTMLElement {
    super.render();

    this.container.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.isMoving = true;
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;
    });

    this.container.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (this.isMoving) {
        if (e.x - this.offsetX > 0) {
          this.container.style.left = `${e.x - this.offsetX}px`;
        }
        if (e.y - this.offsetY > 0)
          this.container.style.top = `${e.y - this.offsetY}px`;
      }
    });

    this.container.addEventListener('mouseup', (e) => {
      e.preventDefault();
      this.isMoving = false;
      this.container.style.left = `${e.x - this.offsetX}px`;
      this.container.style.top = `${e.y - this.offsetY}px`;
    });

    return this.container;
  }
}
