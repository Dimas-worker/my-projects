function createProperty(property: string, value: string): HTMLParagraphElement {
  const paragraph = document.createElement('p');
  switch (property) {
    case 'count':
      paragraph.textContent = `Количество: ${value}`;
      break;
    case 'year':
      paragraph.textContent = `Год покупки: ${value}`;
      break;
    case 'shape':
      paragraph.textContent = `Форма: ${value}`;
      break;
    case 'color':
      paragraph.textContent = `Цвет: ${value}`;
      break;
    case 'size':
      paragraph.textContent = `Размер: ${value}`;
      break;
    case 'favorite':
      paragraph.textContent = `Любимая: ${value}`;
      break;
  }
  return paragraph;
}

interface toyData {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

async function getData(): Promise<void> {
  if (localStorage.getItem('toys')) return;
  const res: Response = await fetch('./json/data.json');
  const data: toyData[] = await res.json();
  const dataString: string = JSON.stringify(data);
  localStorage.setItem('toys', dataString);
}

function getAllCards(): toyData[] {
  const dataOfToys: string = localStorage.getItem('toys') ?? '';
  const allToys: toyData[] = JSON.parse(dataOfToys);
  return allToys;
}

function rightLetterSort(a: toyData, b: toyData): number {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
}

function backLetterSort(a: toyData, b: toyData): number {
  if (a.name < b.name) return 1;
  if (a.name > b.name) return -1;
  return 0;
}

function rightCountSort(a: toyData, b: toyData): number {
  return +a.count - +b.count;
}

function backCountSort(a: toyData, b: toyData): number {
  return +b.count - +a.count;
}

type callBackSort = (a: toyData, b: toyData) => number;

export {
  getData,
  toyData,
  createProperty,
  getAllCards,
  rightLetterSort,
  backLetterSort,
  rightCountSort,
  backCountSort,
  callBackSort,
};
