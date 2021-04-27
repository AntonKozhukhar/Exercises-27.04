"use strict";

function sendRequest(url) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  xhr.send();

  xhr.onload = function () {
    if (xhr.status != 200) {
      alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
    } else {
      showFilm(xhr.response);
    }
  };
  xhr.onerror = function () {
    alert("Запрос не удался");
  };
}

let form = document.forms.form;
let input = form.elements.input;
let btn = form.elements.btn;
let div = document.getElementById("list");
let span = document.getElementById("totalPages");

let pagination = document.querySelector('.pagination');
let btnPrev = document.getElementById('prev');
let btnNext = document.getElementById('next');

let page = document.getElementById('currentPage');
let currentPage = 1;

const apiURL = "http://www.omdbapi.com/?i=tt3896198&apikey=468edc0e";

btn.addEventListener("click", function (e) {
  e.preventDefault();
  let url = apiURL + "&s=" + input.value;
  sendRequest(url);
});

// (page -1)*10+i

btnPrev.addEventListener('click', function() {

  if (currentPage === 1) {
    btnPrev.setAttribute('disabled', 'disabled');
    return;
  }
  currentPage--;
})
btnNext.addEventListener('click', function() {
  if (currentPage === 300) {
    btnNext.setAttribute('disabled', 'disabled');
    return;
  }
  currentPage++;

  let url = apiURL + "&s=" + input.value +"&page=" +currentPage;
  sendRequest(url);

})

function showFilm(json) {
  let obj = JSON.parse(json);
  let totalResult = obj.totalResults;

  let totalPages = Math.round(obj.totalResults / 10);
  
  span.innerText = `Pages found: ${totalPages}`;

  if (totalResult > 10) {
    pagination.classList.add('active');
  } else {
    pagination.classList.remove('active');
  }
  div.innerHTML = '';
  
  for (let i = 0; i < obj.Search.length; i++) {
    const element = obj.Search[i];
    
    div.innerHTML += `
      <div>${i+1}. Title: ${element.Title}</div>
    `;
    page.innerText = `${currentPage}`;
  }
}




