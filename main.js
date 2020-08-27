// create a new card for display by given message
let createNewCard = (title, popularity, id, cardList, isAppendEnd) => {
    let newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.id = id;
    let cardTitle = document.createElement('h2'),
        cardPopularity = document.createElement('p'),
        delBtn = document.createElement('i'),
        editBtn = document.createElement('i'),
        star = document.createElement('i'),
        drag = document.createElement('i');

    cardTitle.textContent = title;
    cardPopularity = popularity;

    delBtn.className = 'fas fa-trash-alt fa-lg';
    // add delete event
    delBtn.addEventListener('click', (e) => {
        let cardId = e.target.parentNode.id;
        if (confirm('delete?')) {
            let element = document.getElementById(cardId);
            element.parentNode.removeChild(element);
        }
    });
    editBtn.className = 'fas fa-edit fa-lg';
    //add edit event
    editBtn.addEventListener('click', (e) => {
        let editCardContainer = document.getElementsByClassName(
            'editCardContainer'
        )[0];
        editCardContainer.style.display = 'block';
        // Pass current card id to the form for editing
        document.getElementById('card-edit-form').cardId =
            e.target.parentNode.id;
        // add default value for edit
        document.querySelector('#title-edit').value =
            e.target.parentNode.childNodes[1].textContent;
        document.querySelector('#popularity-edit').value =
            e.target.parentNode.childNodes[2].textContent;
    });

    star.className = 'far fa-star fa-lg';
    star.isFavorite = false;
    star.addEventListener('click', (e) => {
        e.target.isFavorite = !e.target.isFavorite;
        e.target.className = e.target.isFavorite
            ? 'fas fa-star fa-lg'
            : 'far fa-star fa-lg';

        //** add to favorite list */
    });
    drag.className = 'fas fa-bars fa-lg';

    newCard.append(star, cardTitle, cardPopularity, delBtn, editBtn, drag);
    if (isAppendEnd) cardList.append(newCard);
    else cardList.prepend(newCard);
};

let addElementToList = (resourceArray) => {
    let listMovie = document.querySelector('.listContainer');

    resourceArray.forEach((each) => {
        createNewCard(each.title, each.popularity, each.id, listMovie, true);
    });
};

/* 
Init data though api
Currently commented 
*/
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

// import fake data //
import { response as res } from './fakeData.js';
let { results } = res;
addElementToList(results);
///

// Form submit event listener
document.getElementById('card-create-form').addEventListener('submit', (e) => {
    e.preventDefault();

    createNewCard(
        document.getElementById('title-input').value,
        document.getElementById('popularity-input').value,
        Math.random(),
        document.querySelector('.listContainer'),
        false
    );

    e.target.reset();
});

// edit card event listener
document.getElementById('card-edit-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Change card
    let targetCard = document.getElementById(e.target.cardId);
    targetCard.childNodes[1].textContent = document.getElementById(
        'title-edit'
    ).value;
    targetCard.childNodes[2].textContent = document.getElementById(
        'popularity-edit'
    ).value;

    // close popup
    document.getElementsByClassName('editCardContainer')[0].style.display =
        'none';
});

window.addEventListener('click', (e) => {
    // close popup
    if (e.target.className == 'editCardContainer') {
        let editCardContainer = document.getElementsByClassName(
            'editCardContainer'
        )[0];
        editCardContainer.style.display = 'none';

        // clean edit form
        document.getElementById('card-edit-form').reset();
    }
});
