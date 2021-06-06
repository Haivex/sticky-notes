import createDefaultStickyNote from '../sticky_note/sticky-note-default';

const addNoteForm = (): HTMLElement => {
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Title';
  titleInput.className = 'titleInput';

  const messageTextarea = document.createElement('textarea');
  messageTextarea.placeholder = 'Message';
  messageTextarea.className = 'messageTextarea';

  const form = document.createElement('form');
  form.className = 'noteForm';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const addButton = document.createElement('button');
  addButton.textContent = 'Add note';
  addButton.className = 'addNote';

  addButton.addEventListener('click', () => {
    const createdNote = createDefaultStickyNote(
      titleInput.value,
      messageTextarea.value,
    );
    messageTextarea.value = '';
    titleInput.value = '';
    document.body.appendChild(createdNote.render());
  });

  form.append(titleInput, messageTextarea, addButton);

  return form;
};

export default addNoteForm;
