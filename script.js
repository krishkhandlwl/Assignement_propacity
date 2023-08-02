const filmsContainer = document.getElementById('films-container');
const filmDetailsSidebar = document.getElementById('film-details-sidebar');
const gridViewButton = document.getElementById('grid-view');
const listViewButton = document.getElementById('list-view');

let filmsData = [];

async function fetchFilmsData() {
    try {
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();
        filmsData = data.results;
        displayFilms(filmsData);
    } catch (error) {
        console.error('Error fetching films data:', error);
    }
}

function displayGrid() {
    filmsContainer.innerHTML = '';
    filmsData.forEach((film, index) => {
        const filmItem = document.createElement('div');
        filmItem.className = 'film-item';
        filmItem.innerHTML = `
            <img src="" alt="${film.title}">
            <p>${film.title}</p>
        `;
        filmItem.addEventListener('click', () => showFilmDetails(index));
        filmsContainer.appendChild(filmItem);
    });
}

// list view
function displayList() {
    filmsContainer.innerHTML = '';
    filmsData.forEach((film, index) => {
        const filmItem = document.createElement('div');
        filmItem.className = 'film-item';
        filmItem.innerHTML = `
            <p>${film.title}</p>
            <p>Release Date: ${film.release_date}</p>
        `;
        filmItem.addEventListener('click', () => showFilmDetails(index));
        filmsContainer.appendChild(filmItem);
    });
}
function showFilmDetails(index) {
    const film = filmsData[index];
    filmDetailsSidebar.innerHTML = `
        <h2>${film.title}</h2>
        <p>Release Date: ${film.release_date}</p>
        <p>Director: ${film.director}</p>
        <p>Actors: ${film.characters.join(', ')}</p>
        <p>Plot Summary: ${film.opening_crawl}</p>
    `;
    filmDetailsSidebar.style.display = 'block';
}

gridViewButton.addEventListener('click', displayGrid);
listViewButton.addEventListener('click', displayList);
fetchFilmsData();
