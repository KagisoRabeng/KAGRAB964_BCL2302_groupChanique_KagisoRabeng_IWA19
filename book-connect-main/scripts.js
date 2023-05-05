import {  books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};
const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
}

// Preview Layout/Overlay
  const fragment = document.createDocumentFragment()
  const startIndex = 0;
  const endIndex = 36;
  const extracted = books.slice(startIndex, endIndex)
  for (let i = 0; i < extracted.length; i++) {
      const preview = document.createElement('dl')
      preview.className = 'preview'
      preview.dataset.id = books[i].id
      preview.dataset.title = books[i].title
      preview.dataset.image = books[i].image
      preview.dataset.subtitle = `${authors[books[i].author]} (${(new Date(books[i].published)).getFullYear()})`
      preview.dataset.description = books[i].description
      preview.dataset.genre = books[i].genres


      preview.innerHTML= /*html*/`
      <div>
      <image class='preview__image' src="${books[i].image}" alt="book pic"}/>
      </div>
      <div class='preview__info'>
      <dt class='preview__title'>${books[i].title}<dt>
      <dt class='preview__author'> By ${authors[books[i].author]}</dt>
      </div>`
      fragment.appendChild(preview)
  }

  const firstBookList = document.querySelector('[data-list-items]')
  firstBookList.appendChild(fragment)
  const searchBtn = document.querySelector("[data-header-search]");
  searchBtn.addEventListener('click', (event) => {
  document.querySelector("[data-search-overlay]").style.display = "block";
})

const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "none";
})



const detailsToggle = (event) => {
    const overlay1 = document.querySelector('[data-list-active]');
    const title = document.querySelector('[data-list-title]')
    const subtitle = document.querySelector('[data-list-subtitle]')
    const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')


    event.target.dataset.id ? overlay1.style.display = "block" : undefined;
    event.target.dataset.description ? description.innerHTML = event.target.dataset.description : undefined;
    event.target.dataset.subtitle ? subtitle.innerHTML = event.target.dataset.subtitle : undefined;
    event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
    event.target.dataset.image ? image1.setAttribute ('src', event.target.dataset.image) : undefined;
    event.target.dataset.image ? imageblur.setAttribute ('src', event.target.dataset.image) : undefined;
};

// Book Details
const booksDetailsClose = document.querySelector('[data-list-close]')
booksDetailsClose.addEventListener('click', (event) => {
document.querySelector("[data-list-active]").style.display = "none";
})
const bookDetails = document.querySelector('[data-list-items]')
bookDetails.addEventListener('click', detailsToggle)


// Authors
const authorSelect = document.querySelector("[data-search-authors]");
const anyAuthors = document.createElement('option')
anyAuthors.value = 'Any Author'
anyAuthors.textContent = 'Any Author'
authorSelect.appendChild(anyAuthors);

for (const authorId in authors) {
  const optionElement = document.createElement('option')
  optionElement.value = authorId
  optionElement.textContent = authors[authorId]
  authorSelect.appendChild(optionElement)
  
}

// Genres
const genreSelect = document.querySelector("[data-search-genres]");
const anygenre = document.createElement('option')
anygenre.value = 'Any Genre'
anygenre.textContent = 'Any Genre'
genreSelect.appendChild(anygenre);
for (const genreId in genres) {
  const optionElement = document.createElement('option')
  optionElement.value = genreId
  optionElement.textContent = genres[genreId]
  genreSelect.appendChild(optionElement)
}

//Settings
const settingbutton = document.querySelector("[data-header-settings]")
settingbutton.addEventListener('click', (event) => {
 document.querySelector("[data-settings-overlay]").style.display = "block";
})
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";
})



//--------------------Changing themes-----------------------------
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
saveButton.addEventListener('click', (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
  }
  document.querySelector("[data-settings-overlay]").style.display = "none";
  
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
     } 
     document.querySelector("[data-settings-overlay]").style.display = "none";
} )

function displayBooks(pageNum) {
    const booksPerPage = 36;
    const startIndex = (pageNum - 1) * booksPerPage;
    const endIndex = pageNum * booksPerPage;
    const extracted = books.slice(startIndex, endIndex);
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < extracted.length; i++) {
      const preview = document.createElement('dl');
      preview.className = 'preview';
      preview.dataset.id = extracted[i].id;
      preview.dataset.title = extracted[i].title;
      preview.dataset.image = extracted[i].image;
      preview.dataset.subtitle = `${authors[extracted[i].author]} (${(new Date(extracted[i].published)).getFullYear()})`;
      preview.dataset.description = extracted[i].description;
      preview.dataset.genre = extracted[i].genres;
      preview.innerHTML = /*html*/`
        <div>
          <image class='preview__image' src="${extracted[i].image}" alt="book pic"/>
        </div>
        <div class='preview__info'>
          <dt class='preview__title'>${extracted[i].title}</dt>
          <dt class='preview__author'>By ${authors[extracted[i].author]}</dt>
        </div>`;
      fragment.appendChild(preview);
    }
    const booklist1 = document.querySelector('[data-list-items]');
    booklist1.innerHTML = '';
    booklist1.appendChild(fragment);
  }
  const nextPageButton = document.querySelector('[data-list-button]');
  nextPageButton.textContent = 'Show More'
  let currentPage = 1;
  nextPageButton.addEventListener('click', () => {
    currentPage++;
    displayBooks(currentPage);
  });