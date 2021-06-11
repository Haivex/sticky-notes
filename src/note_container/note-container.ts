const createNoteContainer = (): HTMLElement => {
  const noteContainer = document.createElement('div');
  noteContainer.className = 'notesContainer';

  return noteContainer;
};

export default createNoteContainer;
