import addNoteForm from './add_note_form/addNoteForm';
import createNoteContainer from './note_container/note-container';

const appContainer = document.createElement('div');
appContainer.className = 'app';

const app = (): HTMLElement => {
  appContainer.append(addNoteForm(), createNoteContainer());
  return appContainer;
};
export default app;
