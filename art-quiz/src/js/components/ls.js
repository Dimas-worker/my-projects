const ART_CATEGORIES = [
  'Realism',
  'Impressionism',
  'Religion',
  'Portrait',
  'Renaissance',
  'Painting',
  'Landscape',
  'Marine',
  'Avant-garde',
  'Surrealism',
  'Romanticism',
  'Expressionism',
];

function setAllImgToLocalStorage() {
  if (!localStorage.getItem('answer')) {
    const countOfCategories = Array.from({ length: 24 })
      .map((el, index) => {
        const interimArr = [];
        for (let i = 0; i < 10; i += 1) {
          if (!index) {
            interimArr.push({ num: i, stats: false });
          } else {
            interimArr.push({ num: `${index}${i}`, stats: false });
          }
        }
        return { visit: false, correct: 0, question: interimArr };
      });
    const dataStr = JSON.stringify(countOfCategories);
    localStorage.setItem('answer', dataStr);
  }
}

setAllImgToLocalStorage();

export default ART_CATEGORIES;
