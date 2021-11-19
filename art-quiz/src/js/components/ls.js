export const ARRAY_CATEGORIES = ['realism', 'impressionism', 'religion', 'portrait', 'renaissance', 'painting', 'landscape', 'marine', 'avant-garde', 'surrealism', 'romanticism', 'expressionism'];

function setLS(array) {
  array.forEach((element, index) => {
    if (!localStorage.getItem(element)) {
      const arr = [];
      for (let i = 0; i < 10; i++) {
        if (!index) {
          arr.push({num: i, stats: false})
        } else {
          arr.push({num: `${index}${i}`, stats: false})
        }
      }
      let obj = {visit: false, correct: 0, question: arr}
      let str = JSON.stringify(obj);
      localStorage.setItem(element, str);
    }
  });
}

setLS(ARRAY_CATEGORIES);
export { setLS };