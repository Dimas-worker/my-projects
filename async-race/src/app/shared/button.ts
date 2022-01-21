class Button {
  button: HTMLButtonElement;

  constructor(selector: string) {
    this.button = document.createElement('button');
    this.button.classList.add(selector);
    this.button.textContent = selector.replace('-', ' ');
  }
}
export default Button;
