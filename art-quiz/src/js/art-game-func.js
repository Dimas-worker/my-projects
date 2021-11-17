const artGameCont = document.querySelector('.game__container');

async function getDateImg() {
  const res = await fetch('./json/data.json');
  const data = await res.json();
  let rmNumber = randomImg();
  const rmObj = data[rmNumber];
  console.log(rmObj);
  const img = document.createElement('img');
  img.alt = rmNumber;
  img.className = 'art__img';
  img.src = `./assets/img/all-img/${rmNumber}.jpg`;
  
  // const link = document.createElement('div');
  // link.className = 'img__info';
  // link.textContent = `${rmObj.author} / ${rmObj.name} / ${rmObj.year}`;
  
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('img__info');
  let arrAuthor =[];
  arrAuthor.push(rmObj.author);
  for (let i = 0; i < 3; i++) {
    let count = randomImg();
    if (!arrAuthor.includes(data[count].author)) {
      arrAuthor.push(data[count].author)
    } else {
      i--;
    }
  }
  shuffle(arrAuthor);
  arrAuthor.forEach(el => {
    const button = document.createElement('button');
    button.classList.add('btn', 'btn__choose');
    button.textContent = el;
    btnContainer.append(button);
  })

  img.onload = () => {
    artGameCont.innerHTML = `<div class="game__question">Who is the author of this picture?</div>`;
    artGameCont.append(img);
    artGameCont.append(btnContainer);
  }
  
}
getDateImg();

function randomImg() {
  return Math.floor(Math.random() * 240);
}


function creatAnswer(author) {
  const btn = document.createElement('button');
  btn.classList.add('btn');
  btn.textContent = author;
  return btn;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}