import { StickyNote } from '../interfaces/sticky-note/sticky-note.interface';

const makeMovable = (note: StickyNote): StickyNote => {
  const givenContainer = note.container;

  const notesContainer = document.querySelector(
    '.notesContainer',
  ) as HTMLElement;

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

  let startX = 0;

  let startY = 0;

  let isMoving = false;

  const notesContainerPosX = notesContainer.getBoundingClientRect().left;
  const notesContainerPosY = notesContainer.getBoundingClientRect().top;

  const notesContainerPosEndX =
    notesContainer.getBoundingClientRect().left +
    notesContainer.getBoundingClientRect().width;
  const notesContainerPosEndY =
    notesContainer.getBoundingClientRect().top +
    notesContainer.getBoundingClientRect().height;

  givenContainer.addEventListener('mousedown', (e) => {
    if (note.state === 'moving') {
      e.preventDefault();
      isMoving = true;
      startX = givenContainer.getBoundingClientRect().left - e.pageX;
      startY = givenContainer.getBoundingClientRect().top - e.pageY;
    }
  });

  givenContainer.addEventListener('mousemove', (e) => {
    if (note.state === 'moving') {
      e.preventDefault();
      if (isMoving) {
        let currentPositionX = e.x + startX;
        let currentPositionY = e.y + startY;

        if (currentPositionX < notesContainerPosX + 8) {
          currentPositionX = notesContainerPosX + 8;
        }

        if (
          currentPositionX + givenContainer.clientWidth >
          notesContainerPosEndX - 8
        ) {
          currentPositionX =
            notesContainerPosEndX - 8 - givenContainer.clientWidth;
        }

        if (currentPositionY < notesContainerPosY + 8) {
          currentPositionY = notesContainerPosY + 8;
        }

        if (
          currentPositionY + givenContainer.clientHeight >
          notesContainerPosEndY - 8
        ) {
          currentPositionX =
            notesContainerPosEndX - 8 - givenContainer.clientHeight;
        }

        givenContainer.style.left = `${currentPositionX}px`;
        givenContainer.style.top = `${currentPositionY}px`;
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
