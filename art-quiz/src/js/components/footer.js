class Footer {
  constructor() {
    this.footer = document.createElement('div');
    this.footer.classList.add('footer');
    this.footer.innerHTML = `
      <div class="school__logo">
        <a href="https://rs.school/js/" target="_blank" class="rss"></a>
      </div>
      <div class="developer">
        <a href="https://github.com/Dimas-worker" target="_blank">dimas-worker</a>
      </div>
      <div class="create__year">2021</div>
    `;
  }
}

export default Footer;