import { StickyNote } from '../interfaces/sticky-note/sticky-note.interface';

const makeMovable = (note: StickyNote): StickyNote => {
  const givenNote = note.container;

  const notesContainer = document.querySelector(
    '.notesContainer',
  ) as HTMLElement;

  note.mediator.subscribe('moveTriggered', {
    callback: () => {
      if (note.state === 'moving') {
        note.changeState('');
        givenNote.classList.remove('movable');
      } else {
        note.changeState('moving');
        givenNote.classList.add('movable');
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

  givenNote.addEventListener('mousedown', (e) => {
    if (note.state === 'moving') {
      e.preventDefault();
      isMoving = true;
      startX = givenNote.getBoundingClientRect().left - e.pageX;
      startY = e.clientY - givenNote.getBoundingClientRect().top;

      notesContainerPosEndX =
        notesContainer.getBoundingClientRect().left +
        notesContainer.getBoundingClientRect().width;
      notesContainerPosEndY =
        notesContainer.getBoundingClientRect().top +
        notesContainer.getBoundingClientRect().height;
    }
  });

  givenNote.addEventListener('mousemove', (e) => {
    if (note.state === 'moving') {
      e.preventDefault();
      if (isMoving) {
        let currentPositionX = e.x + startX;
        let currentPositionY = e.pageY - startY;

        if (currentPositionX < notesContainerPosX + 8) {
          currentPositionX = notesContainerPosX + 8;
        }

        if (
          currentPositionX + givenNote.clientWidth >
          notesContainerPosEndX - 8
        ) {
          currentPositionX = notesContainerPosEndX - 8 - givenNote.clientWidth;
        }

        if (currentPositionY < notesContainerPosY + 10) {
          currentPositionY = notesContainerPosY + 8;
        }

        if (
          currentPositionY + givenNote.clientHeight >
          notesContainerPosEndY + givenNote.clientHeight
        ) {
          currentPositionY = notesContainerPosEndY + 12;
        }

        givenNote.style.left = `${currentPositionX}px`;
        givenNote.style.top = `${currentPositionY}px`;
      }
    }
  });

  givenNote.addEventListener('mouseup', (e) => {
    if (note.state === 'moving') {
      e.preventDefault();
      isMoving = false;
    }
  });

  return note;
};

export default makeMovable;
