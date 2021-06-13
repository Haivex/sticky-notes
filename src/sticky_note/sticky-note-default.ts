import ActionButton from '../action_button/action-button';
import MeasureOfLength from '../value_objects/measue-of-length';
import Title from '../value_objects/title';
import StickyNoteContent from './sticky-note-content';
import StickyNoteHeader from './sticky-note-header';
import StickyNoteMediator from './sticky-note-mediator';
import createStickyNote from './sticky-note';
import { StickyNote } from '../interfaces/sticky-note/sticky-note.interface';
import makeMovable from '../sticky_note_movable/sticky-note-movable';
import makeResizable from '../sticky_note_resizable/sticky-note-resizable';
import makeColorful from '../sticky_note_colorful/sticky-note-colorful';
import possibleColors from '../color_form/possible-colors';
import { ColorPalette } from '../interfaces/color-palette.interface';

const createDefaultStickyNote = (
  title: string,
  content?: string,
  colorPalette: ColorPalette,
): StickyNote => {
  const mediator = new StickyNoteMediator();
  const renameButton = ActionButton.create(
    'Rename',
    ['fas', 'fa-pencil-alt'],
    () =>
      mediator.notify('renameTriggered', {
        value: undefined,
      }),
  );
  const editButton = ActionButton.create('Edit', ['fas', 'fa-list'], () =>
    mediator.notify('editTriggered', {
      value: undefined,
    }),
  );
  const deleteButton = ActionButton.create(
    'Delete',
    ['fas', 'fa-trash-alt'],
    () =>
      mediator.notify('deleteTriggered', {
        value: undefined,
      }),
  );
  const moveButton = ActionButton.create('Move', ['fas', 'fa-arrows-alt'], () =>
    mediator.notify('moveTriggered', {
      value: undefined,
    }),
  );
  const createdTitle = Title.create(title);
  const header = StickyNoteHeader.create(createdTitle, mediator, [
    renameButton.render(),
    editButton.render(),
    moveButton.render(),
    deleteButton.render(),
  ]);
  const createdContent = StickyNoteContent.create(mediator, content);
  const height = MeasureOfLength.create(300);
  const width = MeasureOfLength.create(300);
  const note = createStickyNote(
    header,
    createdContent,
    { height, width },
    mediator,
  );

  const movableStickyNote = makeMovable(note);
  const resizableAndMovableStickyNote = makeResizable(movableStickyNote);
  const colorfulNote = makeColorful(
    resizableAndMovableStickyNote,
    colorPalette,
  );

  return colorfulNote;
};

export default createDefaultStickyNote;
