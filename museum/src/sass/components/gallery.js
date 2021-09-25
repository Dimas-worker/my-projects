// console.log('gallery');

const galleryContainerInner = document.querySelector('.gallery__container_inner');

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
// let arr = [{number: 1, height: 456},
//    {number: 2, height: 570},
//    {number: 3, height: 570},
//    {number: 4, height: 456}, 
//    {number: 5, height: 570}, 
//    {number: 6, height: 570}, 
//    {number: 7, height: 570}, 
//    {number: 8, height: 570}, 
//    {number: 9, height: 570}, 
//    {number: 10, height: 456}, 
//    {number: 11, height: 456},
//    {number: 12, height: 342}, 
//    {number: 13, height: 342}, 
//    {number: 14, height: 570}, 
//    {number: 15, height: 456}];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  let dif = Math.abs(array.indexOf(12) - array.indexOf(13));
  if (dif < 5) {
    shuffle(array);
  } else {
    return;
  }
  // let empty = [];
  // array.reduce((acc, cur, index) => {
  //   if (index ===  5) {
  //     empty.push(acc);
  //     acc = 0;
  //   }
  //   if (index ===  10) {
  //     empty.push(acc);
  //     acc = 0;
  //   }
  //   if (index ===  14) {
  //     acc += cur.height
  //     empty.push(acc);
  //   }
  //   return acc + cur.height;
  // }, 0)
  // let maxHeight = Math.max(...empty) + 24 * 4;
  // console.log(maxHeight)
  // galleryContainerInner.style.height = `${maxHeight}px`;
}
shuffle(arr);

arr.map(el => {
  const img = document.createElement('img');
  img.classList.add('gallery__card');
  img.src = `assets/img/galery/galery${el}.jpg`;
  img.alt = `galery${el}`;
  galleryContainerInner.append(img);
  return img
})
