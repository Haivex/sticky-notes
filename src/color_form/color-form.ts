import { ColorPalette } from './color-palette.interface';

const createColorForm = (possibleColors: ColorPalette[]): HTMLFormElement => {
  const form = document.createElement('form');
  form.className = 'colorForm';

  form.addEventListener('submit', (e) => e.preventDefault());

  const buttons: HTMLButtonElement[] = [];

  possibleColors.forEach((colorPalette) => {
    const colorButton = document.createElement('button');
    colorButton.className = 'colorButton';
    colorButton.style.backgroundColor = colorPalette.primaryBgColor;

    colorButton.addEventListener('click', () => {
      buttons.forEach((button) => {
        button.classList.remove('selected');
        colorButton.classList.add('selected');
      });
    });

    buttons.push(colorButton);
  });

  buttons[0].classList.add('selected');

  form.append(...buttons);

  return form;
};

export default createColorForm;
