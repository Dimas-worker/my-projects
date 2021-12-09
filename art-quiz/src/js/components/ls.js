import { QUESTION_IN_ROUND, CATEGORIES_IN_GAME } from './constants';

function setAllImgToLocalStorage() {
  if (!localStorage.getItem('answer')) {
    const countOfCategories = Array.from({ length: CATEGORIES_IN_GAME })
      .map((el, index) => {
        const interimArr = [];
        for (let i = 0; i < QUESTION_IN_ROUND; i++) {
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
