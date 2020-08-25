let addElementToList = (resourceArray) => {
    let listMovie = document.querySelector('.listContainer');
    resourceArray.forEach((each) => {
        let temp = document.createElement('div');
        temp.className = 'card';
        let title = document.createElement('h2'),
            popularity = document.createElement('p'),
            delBtn = document.createElement('button'),
            editBtn = document.createElement('button'),
            star_like = document.createElement('i'),
            star_unlike = document.createElement('i'),
            drag = document.createElement('i');

        title.textContent = each.title;
        popularity = each.popularity;
        delBtn.textContent = 'Delete';
        editBtn.textContent = 'Edit';
        star_like.className = 'fas fa-star';
        star_unlike.className = 'far fa-star';
        drag.className = 'fas fa-bars';

        temp.append(
            star_like,
            star_unlike,
            title,
            popularity,
            delBtn,
            editBtn,
            drag
        );
        listMovie.append(temp);
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
console.log(results);
addElementToList(results);
///
