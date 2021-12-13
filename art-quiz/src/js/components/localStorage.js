import { QUESTIONS_IN_ROUND, CATEGORIES_IN_GAME_AMOUNT } from './constants';

function setAllImgToLocalStorage() {
  if (!localStorage.getItem('answer')) {
    const countOfCategories = Array.from({ length: CATEGORIES_IN_GAME_AMOUNT })
      .map((el, index) => {
        const questionsInCategory = [];
        for (let i = 0; i < QUESTIONS_IN_ROUND; i++) {
          questionsInCategory.push({ num: `${index || ''}${i}`, stats: false });
        }
        return { visit: false, correct: 0, question: questionsInCategory };
      });
    const dataStr = JSON.stringify(countOfCategories);
    localStorage.setItem('answer', dataStr);
  }
}

setAllImgToLocalStorage();
