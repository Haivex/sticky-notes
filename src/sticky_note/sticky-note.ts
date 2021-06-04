import { Mediator } from '../interfaces/mediator.interface';
import { Size } from '../interfaces/size.interface';
import { StickyNote } from '../interfaces/sticky-note/sticky-note.interface';
import StickyNoteContent from './sticky-note-content';
import StickyNoteHeader from './sticky-note-header';

const createStickyNote = (
  stickyNoteHeader: StickyNoteHeader,
  stickyNoteContent: StickyNoteContent,
  size: Size,
  mediator: Mediator,
): StickyNote => {
  const container = document.createElement('div');

  container.innerHTML = '';
  container.className = 'note';
  const headerElement = stickyNoteHeader.render();
  const contentElement = stickyNoteContent.render();
  container.append(headerElement, contentElement);
  container.style.width = size.width.value;
  container.style.height = size.height.value;

  const self = {
    container,
    header: stickyNoteHeader,
    content: stickyNoteContent,
    size,
    mediator,
    render: () => self.container,
  };

  mediator.subscribe('deleteTriggered', {
    callback: () => {
      self.container.remove();
    },
    thisRef: self,
  });

  return self;
};

export default createStickyNote;
