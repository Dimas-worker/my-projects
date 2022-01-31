class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [], text = '') {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.textContent = text;
  }

  updateTextContent(text: string): void {
    this.element.textContent = text;
  }
}

export default BaseComponent;
