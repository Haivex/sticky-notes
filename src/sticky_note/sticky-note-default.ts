import deleteButton from '../actions/delete';
import editButton from '../actions/edit';
import renameButton from '../actions/rename';
import MeasureOfLength from '../value_objects/measue-of-length';
import Title from '../value_objects/title';
import StickyNote from './sticky-note';
import StickyNoteContent from './sticky-note-content';
import StickyNoteHeader from './sticky-note-header';

const createDefaultStickyNote = (
  title: string,
  content?: string,
): StickyNote => {
  const createdTitle = Title.create(title);
  const header = StickyNoteHeader.create(createdTitle, [
    renameButton,
    editButton,
    deleteButton,
  ]);
  const createdContent = StickyNoteContent.create(content);
  const height = MeasureOfLength.create(250);
  const width = MeasureOfLength.create(250);
  const note = new StickyNote(header, createdContent, { height, width });
  return note;
};

export default createDefaultStickyNote;
