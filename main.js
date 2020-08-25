let createNewCard = (title, popularity, id, cardList, isAppendEnd) => {
    let temp = document.createElement('div');
    temp.className = 'card';
    temp.id = id;
    let cardTitle = document.createElement('h2'),
        cardPopularity = document.createElement('p'),
        delBtn = document.createElement('button'),
        editBtn = document.createElement('button'),
        star = document.createElement('i'),
        drag = document.createElement('i');

    cardTitle.textContent = title;
    cardPopularity = popularity;
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', (e) => {
        let elementId = e.target.parentNode.id;
        if (confirm('delete?')) {
            let element = document.getElementById(elementId);
            element.parentNode.removeChild(element);
        }
    });
    editBtn.textContent = 'Edit';
    star.className = 'far fa-star';
    star.isFavorite = false;
    star.addEventListener('click', (e) => {
        e.target.isFavorite = !e.target.isFavorite;
        e.target.className = e.target.isFavorite
            ? 'fas fa-star'
            : 'far fa-star';
    });
    drag.className = 'fas fa-bars';

    temp.append(star, cardTitle, cardPopularity, delBtn, editBtn, drag);
    if (isAppendEnd) cardList.append(temp);
    else cardList.prepend(temp);
};

let addElementToList = (resourceArray) => {
    let listMovie = document.querySelector('.listContainer');

    resourceArray.forEach((each) => {
        createNewCard(each.title, each.popularity, each.id, listMovie, true);
    });
};

// const apiURL = 'https://api.themoviedb.org/3/movie';
// const apiKey = 'ae09140db64f8c19eae245a3b5feed8a';
// axios
//     .get(`${apiURL}/top_rated?api_key=${apiKey}`)
//     .then((res) => {
//         let {
//             data: { results },
//         } = res;
//         console.log(results);
//         addElementToList(results);
//     })
//     .catch((err) => console.log(err));

// test//
import { response as res } from './fakeData.js';
let { results } = res;
addElementToList(results);
///

let cardCreateForm = document.getElementById('card-create-form');

cardCreateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.getElementById('title-input').value;
    let popularity = document.getElementById('popularity-input').value;

    createNewCard(
        title,
        popularity,
        Math.random(),
        document.querySelector('.listContainer'),
        false
    );
    console.log(title, popularity);
});
