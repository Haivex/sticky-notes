import { Size } from '../interfaces/size.interface';
import StickyNote from '../sticky_note/sticky-note';
import MeasureOfLength from '../value_objects/measue-of-length';

export default class ResizableStickyNote extends StickyNote {
  private dragbarHorizontal: HTMLElement = document.createElement('div');

  private dragbarVertical: HTMLElement = document.createElement('div');

  private xBoxStart = 0;

  private xBoxEnd = 0;

  private yBoxStart = 0;

  private yBoxEnd = 0;

  private isDraggingX = false;

  private isDraggingY = false;

  render(): HTMLElement {
    super.render();
    this.container.classList.add('resizable');
    this.dragbarVertical.classList.add('dragbarVertical');
    this.dragbarVertical.style.right = '0';
    this.dragbarHorizontal.classList.add('dragbarHorizontal');
    this.dragbarHorizontal.style.bottom = '0';

    this.dragbarVertical.addEventListener('mousedown', (e) => {
      this.xBoxStart = e.pageX - this.size.width.measureNumber;
      this.xBoxEnd = e.pageX;
      this.isDraggingX = true;
    });

    this.dragbarHorizontal.addEventListener('mousedown', (e) => {
      e.preventDefault();
      this.yBoxStart = e.pageY - this.size.height.measureNumber;
      this.yBoxEnd = e.pageY;
      this.isDraggingY = true;
    });

    document.onmouseup = (e) => {
      e.preventDefault();
      this.isDraggingX = false;
      this.isDraggingY = false;
      this.changeSize({
        height: MeasureOfLength.create(this.container.style.height),
        width: MeasureOfLength.create(this.container.style.width),
      });
    };

    document.onmousemove = (e) => {
      e.preventDefault();
      if (this.isDraggingX) {
        this.resizeX(e);
      }
      if (this.isDraggingY) {
        this.resizeY(e);
      }
    };

    this.container.appendChild(this.dragbarHorizontal);
    this.container.appendChild(this.dragbarVertical);
    return this.container;
  }

  resizeX(e: MouseEvent): void {
    e.preventDefault();
    this.container.style.width = `${e.pageX - this.xBoxStart}px`;
  }

  resizeY(e: MouseEvent): void {
    e.preventDefault();
    this.container.style.height = `${e.pageY - this.yBoxStart}px`;
  }

  changeSize(size: Size): void {
    this.size = size;
    this.render();
  }
}
