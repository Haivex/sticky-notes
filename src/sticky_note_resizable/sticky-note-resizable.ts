import { StickyNote } from '../interfaces/sticky-note/sticky-note.interface';

const makeResizable = (note: StickyNote): StickyNote => {
  const givenContainer = note.container;

  const dragbarHorizontal: HTMLElement = document.createElement('div');

  const dragbarVertical: HTMLElement = document.createElement('div');

  let xBoxStart = 0;

  let yBoxStart = 0;

  let isDraggingX = false;

  let isDraggingY = false;

  const resizeX = (e: MouseEvent) => {
    e.preventDefault();
    givenContainer.style.width = `${e.pageX - xBoxStart}px`;
  };

  const resizeY = (e: MouseEvent) => {
    e.preventDefault();
    givenContainer.style.height = `${e.pageY - yBoxStart}px`;
  };

  givenContainer.classList.add('resizable');
  dragbarVertical.classList.add('dragbarVertical');
  dragbarVertical.style.right = '0';
  dragbarHorizontal.classList.add('dragbarHorizontal');
  dragbarHorizontal.style.bottom = '0';

  dragbarVertical.addEventListener('mousedown', (e) => {
    xBoxStart = e.pageX - givenContainer.clientWidth;
    isDraggingX = true;
  });

  dragbarHorizontal.addEventListener('mousedown', (e) => {
    e.preventDefault();
    yBoxStart = e.pageY - givenContainer.clientHeight;
    isDraggingY = true;
  });

  document.onmouseup = (e) => {
    e.preventDefault();
    isDraggingX = false;
    isDraggingY = false;
  };

  document.onmousemove = (e) => {
    e.preventDefault();
    if (isDraggingX) {
      resizeX(e);
    }
    if (isDraggingY) {
      resizeY(e);
    }
  };

  givenContainer.appendChild(dragbarHorizontal);
  givenContainer.appendChild(dragbarVertical);

  return note;
};

export default makeResizable;
