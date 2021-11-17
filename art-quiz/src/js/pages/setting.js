export class Setting {
  render() {
    return document.body.innerHTML = `
        <div class="wrapper wrapper__setting">
            <div class="setting__header">
                <a href="/#/" class="setting__btn">
                    <span class="arrow_icon"></span>
                    <span>Setting</span>
                </a>
                <a href="/#/" class="close__btn"></a>
            </div>
            <div class="setting__main">
                <div class="setting__volume">
                    <h3>Volume</h3>
                    <div class="volume__container">
                        <input type="range" class="progress__volume" max="1" min="0" step="0.05" value="0.4"> 
                        <button class="volume__icon"></button>
                    </div>
                </div>
                <div class="setting__time">
                    <h3>Time game</h3>
                    <div class="switcher">
                        <span class="val_switch">On</span>
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider round"></span>
                        </label>
                    </div>
                </div>
                <div class="setting__answer">
                    <h3>Time to answer</h3>
                    <div class="time__container">
                        <button class="btn_time minus">_</button>
                        <input type="number" class="time_count" value="20">
                        <button class="btn_time plus">+</button>
                    </div>
                </div>
                <div class="setting__button">
                    <button class="btn btn_default">Default</button>
                    <button class="btn btn_save">Save</button>
                </div>
            </div>
            <div class="footer">
                <div class="school__logo">
                    <a href="https://rs.school/js/" target="_blank" class="rss"></a>
                </div>
                <div class="developer">
                    <a href="https://github.com/Dimas-worker" target="_blank">dimas-worker</a>
                </div>
                <div class="create__year">2021</div>
            </div>
        </div>
    `
  }
}
