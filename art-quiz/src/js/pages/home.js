import Footer from "../components/footer";

class Home {
  constructor() {
    this.container = document.body;
    this.section = document.createElement('div');
    this.section.classList.add('wrapper', 'wrapper__main');
    this.section.innerHTML = `
      <div class="main__header"><a href="./#/setting" class="set__btn"></a></div>
      <div class="main__content">
      <div class="main__log"><span class="logo"></span></div>
      <div class="game__button">
      <a href="./#/category" class="btn">Artist quiz</a>
      <a href="./#/pic-category"class="btn">Pictures quiz</a>
      </div>
      </div>`
    this.footer = new Footer();
    this.section.append(this.footer);
  }

  render() {
    const img = new Image();
    img.src = './assets/img/start_bg.jpg';
    img.onload = () => {
      this.container.append(this.section);
    };
  }
}

export default Home;
