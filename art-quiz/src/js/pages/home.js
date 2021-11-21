export class Home {
  constructor() {
    this.container = document.body;
    this.view = `
    <div class="wrapper wrapper__main">
    <div class="main__header"><a href="/#/setting" class="set__btn"></a></div>
    <div class="main__content">
    <div class="main__log"><span class="logo"></span></div>
    <div class="game__button">
      <a href="/#/category" class="btn">Artist quiz</a>
      <a href="/#/pic-category"class="btn">Pictures quiz</a>
    </div>
    </div>
    <div class="footer">
      <div class="school__logo"><a href="https://rs.school/js/" target="_blank" class="rss"></a></div>
      <div class="developer"><a href="https://github.com/Dimas-worker" target="_blank">dimas-worker</a></div>
      <div class="create__year">2021</div>
    </div>
    </div>`; 
  }

  render() {
    return this.container.innerHTML = this.view;
  }
}
// export default Home;