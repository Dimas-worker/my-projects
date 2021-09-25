// console.log('explore');

function initComparisons() {
  /*find all elements with an "overlay" class:*/
  const overlay = document.querySelector(".compare__overlay");
  compareImages(overlay);
  
  function compareImages(img) {
    /*get the width and height of the img element*/
    let clicked = 0;
    let w = img.offsetWidth;
    let h = img.offsetHeight;
    /*set the width of the img element to 50%:*/
    img.style.width = (w * 43 / 70) + "px";
    /*create slider:*/
    let slider = document.createElement("DIV");
    slider.setAttribute("class", "comparison__img");
    /*insert slider*/
    img.parentElement.insertBefore(slider, img);
    /*position the slider in the middle:*/
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w * 43 / 70) - (slider.offsetWidth / 2) + "px";
    /*execute a function when the mouse button is pressed:*/
    slider.addEventListener("mousedown", slideReady);
    /*and another function when the mouse button is released:*/
    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/
    slider.addEventListener("touchstart", slideReady);
     /*and released (for touch screens:*/
    window.addEventListener("touchstop", slideFinish);

    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }
    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }
    function slideMove(e) {
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;
      /*get the cursor's x position:*/
      let pos = getCursorPos(e)
      /*prevent the slider from being positioned outside the image:*/
      if (pos < (0 + 20)) pos = 0 + 20;
      if (pos > (w - 20)) pos = w - 20;
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
    }
    function getCursorPos(e) {
      let a, x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
  }
}
initComparisons();