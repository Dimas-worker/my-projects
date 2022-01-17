class App {
  private container: HTMLElement = document.body;

  test: HTMLDivElement;

  constructor() {
    this.test = document.createElement('div');
    this.test.textContent = 'hello';
  }

  run() {
    this.container.append(this.test);
  }
}

export default App;
