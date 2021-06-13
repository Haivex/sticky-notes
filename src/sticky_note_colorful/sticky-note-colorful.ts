import { ColorPalette } from '../interfaces/color-palette.interface';
import { StickyNote } from '../interfaces/sticky-note/sticky-note.interface';

const makeColorful = (
  stickyNote: StickyNote,
  colorPalette: ColorPalette,
): StickyNote => {
  const givenNote = stickyNote;

  givenNote.content.getContainer().style.backgroundColor =
    colorPalette.primaryBgColor;
  givenNote.content.getContainer().style.color = colorPalette.primaryTextColor;
  givenNote.header.getContainer().style.backgroundColor =
    colorPalette.secondaryBgColor;
  givenNote.header.getContainer().style.color = colorPalette.secondaryTextColor;

  return givenNote;
};
export default makeColorful;
