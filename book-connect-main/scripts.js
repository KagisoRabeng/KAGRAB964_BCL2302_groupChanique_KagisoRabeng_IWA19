import {  books, authors, genres, BOOKS_PER_PAGE } from "./data.js"; 
//imported variables from another JS file which was removed from the HTML 

const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};
const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
} //day and night are declared  using the constant

// Preview Layout/Overlay
  const fragment = document.createDocumentFragment() //created the fragment to show in the HTML
  const startIndex = 0;
  const endIndex = 36;
  const extracted = books.slice(startIndex, endIndex) //slice is used to show the number of books that will appear in the HTML
  for (let i = 0; i < extracted.length; i++) {
      const preview = document.createElement('dl') //this sets the data into the definition list in HTML
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
      fragment.appendChild(preview) //the preview will be appended in the fragment created earlier
  }

  const firstBookList = document.querySelector('[data-list-items]')
  firstBookList.appendChild(fragment)
  const searchBtn = document.querySelector("[data-header-search]");
  searchBtn.addEventListener('click', (event) => {
  document.querySelector("[data-search-overlay]").style.display = "block";
}) //this code enables the user to see the search overlay when the button is clicked

const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener('click', (event) => {
 document.querySelector("[data-search-overlay]").style.display = "none";
}) //this code removes the search overlay  when the cancel button is clicked


/*the following code selects various elements from the DOM (Document Object Model) using querySelector
Each querySelector call looks for an element with a specific data-list attribute value
*/
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
}; //this ternary code is the shorthand for if else statement. The purpose is the code is  for book details

// Book Details
const booksDetailsClose = document.querySelector('[data-list-close]')
booksDetailsClose.addEventListener('click', (event) => {
document.querySelector("[data-list-active]").style.display = "none";
})
const bookDetails = document.querySelector('[data-list-items]')
bookDetails.addEventListener('click', detailsToggle)
//This code  is for book detais: when a book is clicked, details (on the above code 65-71) show show


// Authors
const authorSelect = document.querySelector("[data-search-authors]");
const anyAuthors = document.createElement('option')
anyAuthors.value = 'Any Author'
anyAuthors.textContent = 'Any Author'
authorSelect.appendChild(anyAuthors);
/* The docnument createElement creates the AnyAuthors as an option in the HTML */

for (const authorId in authors) {
  const optionElement = document.createElement('option')
  optionElement.value = authorId
  optionElement.textContent = authors[authorId]
  authorSelect.appendChild(optionElement)
  
}
/* The above code creates a drop-down menu (also known as a select element) for selecting an author from a list of authors.
The code loops through an object called "authors" using a for...in loop. 
For each author in the "authors" object, it creates a new "option" element using the document.createElement() method */

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
}//code works same as the "Authors" code

//Settings
const settingbutton = document.querySelector("[data-header-settings]")
settingbutton.addEventListener('click', (event) => {
 document.querySelector("[data-settings-overlay]").style.display = "block"; //when the settings button is click, overlay should appear
})
const settingCancel = document.querySelector('[data-settings-cancel]')
settingCancel.addEventListener('click', (event) => {
document.querySelector("[data-settings-overlay]").style.display = "none";//when the cancel button is clicked, overlay should disappear
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
} ) /* the above if statements sets the colour themes to the value of an input field with data-settings-theme
      if the value selected is day then it sets the CSS property to the value day */

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
  } /* This particular block of code is responsible for creating a preview element for each book and setting its data attributes.
  The for loop iterates over each book in the extracted array, which contains a subset of books to display on the current page. 
  For each book, a dl element is created using document.createElement('dl'), and its class is set to preview using preview.className = 'preview'*/

  const nextPageButton = document.querySelector('[data-list-button]');
  nextPageButton.textContent = 'Show More'
  let currentPage = 1;
  nextPageButton.addEventListener('click', () => {
    currentPage++;
    displayBooks(currentPage);
  });