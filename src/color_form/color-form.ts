import { ColorPalette } from '../interfaces/color-palette.interface';

const createColorForm = (possibleColors: ColorPalette[]): HTMLFormElement => {
  const form = document.createElement('form');
  form.className = 'colorForm';

  form.addEventListener('submit', (e) => e.preventDefault());

  const labels: HTMLLabelElement[] = [];

  possibleColors.forEach((colorPalette) => {
    const colorButton = document.createElement('input');
    const buttonLabel = document.createElement('label');
    buttonLabel.className = 'colorLabel';
    buttonLabel.appendChild(colorButton);
    colorButton.type = 'radio';
    colorButton.className = 'colorRadio';
    colorButton.name = 'color';
    colorButton.value = JSON.stringify(colorPalette);
    buttonLabel.style.backgroundColor = colorPalette.primaryBgColor;

    buttonLabel.addEventListener('click', () => {
      labels.forEach((label) => {
        label.classList.remove('selected');
      });
      buttonLabel.classList.add('selected');
    });

    labels.push(buttonLabel);
  });

  labels[0].classList.add('selected');

  form.append(...labels);

  return form;
};

export default createColorForm;
