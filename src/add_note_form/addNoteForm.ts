import createDefaultStickyNote from '../sticky_note/sticky-note-default';
import createTextareaDropzone from '../dropzone_text_file/dropzone-text-file';

const addNoteForm = (): HTMLElement => {
  const h2 = document.createElement('h1');
  h2.className = 'title';
  h2.textContent = 'Sticky notes';

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Title';
  titleInput.className = 'titleInput';

  const messageTextarea = document.createElement('textarea');
  messageTextarea.placeholder = 'Message';
  messageTextarea.className = 'messageTextarea';

  const textareaDropzone = createTextareaDropzone(messageTextarea);

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
      textareaDropzone.value,
    );
    textareaDropzone.value = '';
    titleInput.value = '';
    document.querySelector('.noteContainer').appendChild(createdNote.render());
  });

  form.append(h2, titleInput, textareaDropzone, addButton);

  return form;
};

export default addNoteForm;
