import createDefaultStickyNote from '../sticky_note/sticky-note-default';
import createTextareaDropzone from '../dropzone_text_file/dropzone-text-file';
import possibleColors from '../color_form/possible-colors';
import createColorForm from '../color_form/color-form';

const addNoteForm = (): HTMLElement => {
  const colorForm = createColorForm(possibleColors);

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
      JSON.parse(colorForm.elements.color.value),
    );
    textareaDropzone.value = '';
    titleInput.value = '';
    document.querySelector('.notesContainer').appendChild(createdNote.render());
  });

  form.append(colorForm, titleInput, textareaDropzone, addButton);

  return form;
};

export default addNoteForm;
