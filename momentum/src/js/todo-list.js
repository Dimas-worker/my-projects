// const taskList = document.querySelectorAll("LI");
let arrTask;
if (localStorage.getItem('arrTask')) {
  arrTask = localStorage.getItem('arrTask').split(',');
} else {
  arrTask = ['review four works'];
}

const close = document.getElementsByClassName("close");
Array.from(close).forEach(el => {
  el.addEventListener('click', () => {
    console.log('del');
    let div = el.parentElement;
    let item = div.textContent.slice(0, -1);
    let res = arrTask.filter(el => el !== item);
    arrTask = res;
    div.remove();
  })
});

const listTask = document.querySelector('.task__list');
listTask.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
  }
}, false);

function newElement() {
  const li = document.createElement("li");
  const inputValue = document.querySelector('.input_task');
  li.textContent = inputValue.value;
  if (inputValue.value === '') {
    return;
  } else {
    document.querySelector('.task__list').appendChild(li);
    arrTask.push(inputValue.value);
  }
  inputValue.value = '';
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.classList.add('close');
  span.appendChild(txt);
  li.appendChild(span);

  Array.from(close).forEach(el => {
    el.addEventListener('click', () => {
      let div = el.parentElement;
      let item = div.textContent.slice(0, -1);
      let res = arrTask.filter(el => el !== item);
      arrTask = res;
      div.remove();
    })
  });
}

document.querySelector('.btn__add').addEventListener('click', newElement);

function addElement(value) {
  const li = document.createElement("li");
  li.textContent = value;
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.classList.add('close');
  span.appendChild(txt);
  li.appendChild(span);
  document.querySelector('.task__list').appendChild(li);

  Array.from(close).forEach(el => {
    el.addEventListener('click', () => {
      let div = el.parentElement;
      let item = div.textContent.slice(0, -1);
      let res = arrTask.filter(el => el !== item);
      arrTask = res;
      div.remove();
    })
  });
}
function removeChecked() {
  let taskLists = document.getElementsByTagName("LI");
  Array.from(taskLists).forEach(el => {
    if (el.classList.contains('checked')) {
      let item = el.textContent.slice(0, -1);
      let res = arrTask.filter(el => el !== item);
      arrTask = res;
    }
  })
}
//-----------local storage-----------------------
function setLocalStorage() {
  localStorage.setItem('arrTask', arrTask);
}
function getLocalStorage() {
  if (localStorage.getItem('arrTask')) {
    let arr = localStorage.getItem('arrTask').split(',');
    arr.forEach(el => {
      addElement(el);
    })
  }
}
window.addEventListener('beforeunload', () => {
  removeChecked();
  setLocalStorage();
});
window.addEventListener('load', getLocalStorage);