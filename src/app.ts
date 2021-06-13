import addNoteForm from './add_note_form/add-note-form';
import createColorForm from './color_form/color-form';
import possibleColors from './color_form/possible-colors';
import createNoteContainer from './note_container/note-container';

const appContainer = document.createElement('div');
appContainer.className = 'app';

const h2 = document.createElement('h1');
h2.className = 'title';
h2.textContent = 'Sticky notes';

const app = (): HTMLElement => {
  appContainer.append(
    h2,
    createColorForm(possibleColors),
    addNoteForm(),
    createNoteContainer(),
  );
  return appContainer;
};
export default app;
