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

  let notesContainerPosEndX = 0;

  let notesContainerPosEndY = 0;

  let isMoving = false;

  const notesContainerPosX = notesContainer.getBoundingClientRect().left;
  const notesContainerPosY = notesContainer.getBoundingClientRect().top;

  givenContainer.addEventListener('mousedown', (e) => {
    if (note.state === 'moving') {
      e.preventDefault();
      isMoving = true;
      startX = givenContainer.getBoundingClientRect().left - e.pageX;
      startY = e.clientY - givenContainer.getBoundingClientRect().top;

      notesContainerPosEndX =
        notesContainer.getBoundingClientRect().left +
        notesContainer.getBoundingClientRect().width;
      notesContainerPosEndY =
        notesContainer.getBoundingClientRect().top +
        notesContainer.getBoundingClientRect().height;
    }
  });

  givenContainer.addEventListener('mousemove', (e) => {
    if (note.state === 'moving') {
      e.preventDefault();
      if (isMoving) {
        let currentPositionX = e.x + startX;
        let currentPositionY = e.pageY - startY;

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

        if (currentPositionY < notesContainerPosY + 10) {
          currentPositionY = notesContainerPosY + 10;
        }

        if (
          currentPositionY + givenContainer.clientHeight >
          notesContainerPosEndY - 10
        ) {
          currentPositionY =
            notesContainerPosEndY - 10 - givenContainer.clientHeight;
        }

        givenContainer.style.left = `${currentPositionX}px`;
        givenContainer.style.top = `${currentPositionY}px`;

        console.log(givenContainer.style.top);
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
