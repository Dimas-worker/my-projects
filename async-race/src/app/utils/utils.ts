function createInputElement(
  type: string,
  classSelector: string,
  value: string,
  placeHolder?: string
): HTMLInputElement {
  const input = document.createElement('input');
  input.type = type;
  input.classList.add(classSelector);
  input.value = value;
  if (placeHolder) {
    input.placeholder = placeHolder;
  }
  return input;
}

export default createInputElement;
