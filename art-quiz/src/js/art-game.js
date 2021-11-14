const artMain = document.querySelector('.art-game__main');

async function getDateImg() {
  const res = await fetch('./json/data.json');
  const data = await res.json();
  let rmNumber = randomImg();
  const rmObj = data[rmNumber];
  console.log(rmObj);
  const img = document.createElement('img');
  img.alt = '' + rmNumber;
  img.className = 'art__img';
  img.src = `./assets/img/all-img/${rmNumber}.jpg`;
  
  const link = document.createElement('div');
  link.className = 'img__info';
  link.textContent = `${rmObj.author} / ${rmObj.name} / ${rmObj.year}`;

  img.onload = () => {
    artMain.append(img);
    artMain.append(link);
  }
}

function randomImg() {
  return Math.floor(Math.random() * 240);
}

getDateImg();