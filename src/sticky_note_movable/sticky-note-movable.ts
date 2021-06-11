import { StickyNote } from '../interfaces/sticky-note/sticky-note.interface';

const makeMovable = (note: StickyNote): StickyNote => {
  const givenContainer = note.container;

  note.mediator.subscribe('moveTriggered', {
    callback: () => {
      if (note.state === 'moving') {
        note.changeState('');
        givenContainer.classList.remove('movable');
      } else {
        note.changeState('moving');
        givenContainer.classList.add('movable');
      }
    },
    thisRef: note,
  });

  let offsetX = 0;

  let offsetY = 0;

  let isMoving = false;

  givenContainer.addEventListener('mousedown', (e) => {
    if (note.state === 'moving') {
      e.preventDefault();
      givenContainer.style.position = 'absolute';
      isMoving = true;
      offsetX = e.offsetX;
      offsetY = e.offsetY;
    }
  });

  givenContainer.addEventListener('mousemove', (e) => {
    if (note.state === 'moving') {
      e.preventDefault();
      if (isMoving) {
        if (e.x - offsetX > 0) {
          givenContainer.style.left = `${e.x - offsetX}px`;
        }
        if (e.y - offsetY > 0) givenContainer.style.top = `${e.y - offsetY}px`;
      }
    }
  });

  givenContainer.addEventListener('mouseup', (e) => {
    if (note.state === 'moving') {
      e.preventDefault();
      isMoving = false;
    }
  });

  return note;
};

export default makeMovable;
