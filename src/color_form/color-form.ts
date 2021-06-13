const createColorForm = (possibleColors: string[]) => {
  const form = document.createElement('form');
  form.className = 'colorForm';

  form.addEventListener('submit', (e) => e.preventDefault());

  const buttons: HTMLButtonElement[] = [];

  possibleColors.forEach((color) => {
    const colorButton = document.createElement('button');
    colorButton.className = 'colorButton';
    colorButton.style.backgroundColor = color;

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
