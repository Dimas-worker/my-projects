const ARRAY_CATEGORIES = [
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

function setPicLS() {
  if (!localStorage.getItem('answer')) {
    const arr = Array.from({ length: 24 });
    const res = arr.map((el, index) => {
      const x = [];
      for (let i = 0; i < 10; i += 1) {
        if (!index) {
          x.push({ num: i, stats: false });
        } else {
          x.push({ num: `${index}${i}`, stats: false });
        }
      }
      return { visit: false, correct: 0, question: x };
    });
    const str = JSON.stringify(res);
    localStorage.setItem('answer', str);
  }
}

setPicLS();

export default ARRAY_CATEGORIES;
