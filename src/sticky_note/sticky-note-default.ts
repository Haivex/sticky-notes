import ActionButton from '../action_button/action-button';
import MeasureOfLength from '../value_objects/measue-of-length';
import Title from '../value_objects/title';
import StickyNote from './sticky-note';
import StickyNoteContent from './sticky-note-content';
import StickyNoteHeader from './sticky-note-header';
import StickyNoteMediator from './sticky-note-mediator';

const createDefaultStickyNote = (
  title: string,
  content?: string,
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
  const createdTitle = Title.create(title);
  const header = StickyNoteHeader.create(createdTitle, mediator, [
    renameButton.render(),
    editButton.render(),
    deleteButton.render(),
  ]);
  const createdContent = StickyNoteContent.create(mediator, content);
  const height = MeasureOfLength.create(250);
  const width = MeasureOfLength.create(250);
  const note = new StickyNote(
    header,
    createdContent,
    { height, width },
    mediator,
  );
  return note;
};

export default createDefaultStickyNote;
