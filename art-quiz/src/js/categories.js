console.log('categories');

const cardsContainerInner = document.querySelector('.categories__list_inner');

// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let ARRAY_CATEGORIES = ['realism', 'impressionism', 'religion', 'portrait', 'renaissance', 'painting', 'landscape', 'marine', 'avant-garde', 'surrealism', 'romanticism', 'expressionism'];
console.log(ARRAY_CATEGORIES.length);

function creatCard(index) {
  const divCard = document.createElement('div');
  divCard.classList.add('category__card');
  divCard.innerHTML = `
  <div class="heading__card">
    <h4>${ARRAY_CATEGORIES[index]}</h4>
    <div class="progress__card">0/10</div>
  </div>`;
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card__img');
  const img = document.createElement('img');
  img.src = `./assets/img/categories/${index}.png`;
  img.alt = `${index}`;
  if (true) {
    img.classList.add('card_inactive');
  }
  cardDiv.append(img);
  divCard.append(cardDiv);
  return divCard;
}

ARRAY_CATEGORIES.forEach((el, index) => {
  const card = creatCard(index);
  cardsContainerInner.append(card);
})