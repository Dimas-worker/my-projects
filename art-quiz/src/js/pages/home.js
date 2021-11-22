export class Home {
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
    </div>
    <div class="footer">
      <div class="school__logo"><a href="https://rs.school/js/" target="_blank" class="rss"></a></div>
      <div class="developer"><a href="https://github.com/Dimas-worker" target="_blank">dimas-worker</a></div>
      <div class="create__year">2021</div>
    </div>`; 
  }

  render() {
    const img = new Image();
    img.src = './assets/img/start_bg.jpg'
    img.onload = () => {
      this.container.append(this.section);
    }
  }
}
// export default Home;