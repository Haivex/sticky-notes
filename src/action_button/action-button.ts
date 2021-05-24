class ActionButton {
  private button: HTMLButtonElement = document.createElement('button');

  private constructor(
    private actionName: string,
    private iconClassList: string[],
    private onClick: { (): unknown },
  ) {}

  static create(
    actionName: string,
    iconClassList: string[],
    onClick: { (): unknown },
  ): ActionButton {
    return new ActionButton(actionName, iconClassList, onClick);
  }

  render(): HTMLButtonElement {
    this.button.innerHTML = '';
    this.button.removeEventListener('click', this.onClick);
    this.button.className = 'action_button';
    const icon = document.createElement('i');
    icon.classList.add(...this.iconClassList);
    this.button.title = this.actionName;
    this.button.append(icon);
    this.button.addEventListener('click', this.onClick);
    return this.button;
  }
}

export default ActionButton;
