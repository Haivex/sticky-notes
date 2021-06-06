const createNoteContainer = (): HTMLElement => {
  const noteContainer = document.createElement('div');
  noteContainer.className = 'noteContainer';

  return noteContainer;
};

export default createNoteContainer;
