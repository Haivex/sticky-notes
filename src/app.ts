import createDefaultStickyNote from './sticky_note/sticky-note-default';

const app = (): HTMLElement =>
  createDefaultStickyNote('My title', 'Example content').render();
export default app;
