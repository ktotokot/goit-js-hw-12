import {
  imagesTamplate,
  imageTemplate,
  addLoader,
  removeLoader,
} from './js/render-functions.js';

import { getImages } from './js/pixabay-api.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iconClose from './img/icon-close.svg';



// ---------------------------------------------------------
const formEl = document.querySelector('.search-form');
const ulEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
// ---------------------------------------------------------



// ---------------------------------------------------------
formEl.addEventListener('submit', event => {
  event.preventDefault();
  
  const query = event.target.elements.query.value.trim();
  
  if (query.length !== 0) {
    
    addLoader(loader);

    getImages(query)
      .then(data => {
        if (data.hits.length === 0) {
          iziToast.show({
            class: 'izt-toast-message',

            message:
              'Sorry, there are no images matching your search query. Please try again!',
            messageSize: '16',
            messageLineHeight: '24',
            messageColor: '#ffffff',

            backgroundColor: '#b51b1b',
            iconUrl: iconClose,
            position: 'topRight',
            theme: 'dark',
          });
        } else {
          const markup = imagesTamplate(data.hits);

          ulEl.innerHTML = markup;

          const gallery = new SimpleLightbox('.gallery a');
          gallery.refresh();
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        removeLoader(loader);
      });
  }

  formEl.reset();
});