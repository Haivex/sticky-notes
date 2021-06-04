import { StickyNote } from '../interfaces/sticky-note/sticky-note.interface';

const makeMovable = (note: StickyNote): StickyNote => {
  const givenContainer = note.container;

  let offsetX = 0;

  let offsetY = 0;

  let isMoving = false;

  givenContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isMoving = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  givenContainer.addEventListener('mousemove', (e) => {
    e.preventDefault();
    if (isMoving) {
      if (e.x - offsetX > 0) {
        givenContainer.style.left = `${e.x - offsetX}px`;
      }
      if (e.y - offsetY > 0) givenContainer.style.top = `${e.y - offsetY}px`;
    }
  });

  givenContainer.addEventListener('mouseup', (e) => {
    e.preventDefault();
    isMoving = false;
    givenContainer.style.left = `${e.x - offsetX}px`;
    givenContainer.style.top = `${e.y - offsetY}px`;
  });

  return note;
};

export default makeMovable;
