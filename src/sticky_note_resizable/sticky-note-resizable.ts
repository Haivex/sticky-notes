import { Mediator } from '../interfaces/mediator.interface';
import { Size } from '../interfaces/size.interface';
import StickyNote from '../sticky_note/sticky-note';
import StickyNoteContent from '../sticky_note/sticky-note-content';
import StickyNoteHeader from '../sticky_note/sticky-note-header';
import MeasureOfLength from '../value_objects/measue-of-length';

export default class ResizableStickyNote extends StickyNote {
  private dragbarHorizontal: HTMLElement = document.createElement('div');

  private dragbarVertical: HTMLElement = document.createElement('div');

  private initialVerticalPosition = 0;

  private isHorizontalPosition = 0;

  render(): HTMLElement {
    super.render();
    this.container.classList.add('resizable');
    this.dragbarVertical.classList.add('dragbarVertical');
    this.dragbarVertical.style.right = '0';
    this.dragbarHorizontal.classList.add('dragbarHorizontal');
    this.dragbarHorizontal.style.bottom = '0';

    this.dragbarVertical.addEventListener('mousedown', (e) => {
      this.initialVerticalPosition = e.pageX;
      document.body.addEventListener('mousemove', this.resize.bind(this));
    });

    this.dragbarVertical.addEventListener('mouseup', (e) => {
      this.initialVerticalPosition = e.pageX;
    });

    document.onmouseup = (e) => {
      document.body.removeEventListener('mousemove', this.resize.bind(this));
      this.changeSize({
        height: this.size.height,
        width: MeasureOfLength.create(this.initialVerticalPosition - e.pageX),
      });
    };

    this.container.appendChild(this.dragbarHorizontal);
    this.container.appendChild(this.dragbarVertical);
    return this.container;
  }

  resize(e: MouseEvent): void {
    e.preventDefault();
    console.log(this.initialVerticalPosition - e.pageX);
  }

  changeSize(size: Size): void {
    this.size = size;
    this.render();
  }
}
