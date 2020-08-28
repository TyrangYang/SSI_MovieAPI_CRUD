// import fake data //
import { response as res } from './fakeData.js';
let { results } = res;
///

let main = async (results) => {
    let favoriteData = [];
    let listData = [];
    // create a new card for display by given message
    let createNewCard = (
        title,
        popularity,
        id,
        isFavorite,
        cardList,
        isAppendEnd
    ) => {
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

        star.className = isFavorite ? 'fas fa-star fa-lg' : 'far fa-star fa-lg';
        star.addEventListener('click', (e) => {
            let cardId = +e.target.parentNode.id;
            let cardData = listData.find((e) => e.id == cardId);
            cardData.isFavorite = !cardData.isFavorite;
            e.target.className = cardData.isFavorite
                ? 'fas fa-star fa-lg'
                : 'far fa-star fa-lg';

            // add to or remove from favorite list */
            if (cardData.isFavorite) {
                favoriteData.push(listData.filter((e) => e.id === cardId)[0]);
            } else {
                favoriteData = favoriteData.filter((e) => {
                    return e.id !== cardId;
                });
            }
        });
        drag.className = 'fas fa-bars fa-lg';

        newCard.append(star, cardTitle, cardPopularity, delBtn, editBtn, drag);
        if (isAppendEnd) cardList.append(newCard);
        else cardList.prepend(newCard);
    };
    // create favorite list
    let createAllNewFavoriteCard = (favoriteData) => {
        let favoriteList = document.getElementById('favorite-list');

        favoriteData.forEach((each) => {
            let newCard = document.createElement('div');
            newCard.className = 'card favoriteCard';
            let cardTitle = document.createElement('h2'),
                cardPopularity = document.createElement('p');
            cardTitle.textContent = each.title;
            cardPopularity.textContent = each.popularity;

            newCard.append(cardTitle, cardPopularity);
            favoriteList.append(newCard);
        });
    };

    let addElementToList = (resourceArray, listName) => {
        let listMovie = document.getElementById(listName);

        resourceArray.forEach((each) => {
            createNewCard(
                each.title,
                each.popularity,
                each.id,
                each.isFavorite,
                listMovie,
                true
            );
        });
    };
    /**
     * Init data though api
     * Currently commented
     *  */
    // const apiURL = 'https://api.themoviedb.org/3/movie';
    // const apiKey = 'ae09140db64f8c19eae245a3b5feed8a';
    // var {
    //     data: { results, total_pages },
    // } = await axios.get(`${apiURL}/popular?api_key=${apiKey}&language=en-US&page=1`);
    results.forEach((e) => (e.isFavorite = false));
    listData = results;
    console.log(listData);
    addElementToList(listData, 'all-list');

    // Form submit event listener
    document
        .getElementById('card-create-form')
        .addEventListener('submit', (e) => {
            e.preventDefault();
            let title = document.getElementById('title-input').value,
                popularity = document.getElementById('popularity-input').value,
                id = Math.floor(Math.random() * 100000);
            createNewCard(
                title,
                popularity,
                id,
                document.getElementById('all-list'),
                false
            );
            listData.push({ title, popularity, id });
            e.target.reset();
        });

    // edit card event listener
    document
        .getElementById('card-edit-form')
        .addEventListener('submit', (e) => {
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
            document.getElementsByClassName(
                'editCardContainer'
            )[0].style.display = 'none';
        });

    // add tab control
    let showCurTab = (tabName) => {
        let allTabNames = ['all', 'favorite'];

        allTabNames.forEach((name) => {
            document.getElementById(`${name}-btn`).className = '';
            document.getElementById(`${name}-list`).style.display = 'none';
        });
        document.getElementById(`${tabName}-list`).style.display = 'flex';
        document.getElementById(`${tabName}-btn`).className = 'active';
    };
    document.getElementById('all-btn').addEventListener('click', (e) => {
        showCurTab('all');
    });
    document.getElementById('favorite-btn').addEventListener('click', (e) => {
        document.getElementById('favorite-list').textContent = '';
        createAllNewFavoriteCard(favoriteData);
        // addElementToList(favoriteData, 'favorite-list');
        showCurTab('favorite');
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
};

main(results);
