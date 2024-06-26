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


const formEl = document.querySelector('.search-form');
const ulEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more_button');

let page = 1;
let query = '';
let totalHits = 0;

let simpleGallery = new SimpleLightbox('.gallery-link', {
    captionsData: 'alt',
    captionDelay: 250,
});
simpleGallery.on('error.simplelightbox', function (e) {
    console.log(e); 
});


function showToast(message) {
    iziToast.show({
        class: 'izt-toast-message',
        message: message,
        messageSize: '12',
        messageLineHeight: '24',
        iconUrl: iconClose,
        messageColor: '#ffffff',
        backgroundColor: '#b51b1b',
        position: 'topRight',
        theme: 'dark',
        timeout: 2000
    });
}


function smoothScroll() {
    const cardHeight = ulEl.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}


async function fetchImages() {
    try {
      addLoader(loader);
        const data = await getImages(query, page);
        totalHits = data.totalHits;
        
        if (data.hits.length === 0) {
            ulEl.innerHTML = '';
            showToast('Sorry, there are no images matching your search query. Please try again!');
        } else {
            const markup = imagesTamplate(data.hits);
            ulEl.innerHTML = markup;
            simpleGallery.refresh();
            if (data.hits.length < totalHits) {
                loadMoreBtn.classList.remove('hidden');
            } else {
                loadMoreBtn.classList.add('hidden');
                showToast("We're sorry, but you've reached the end of search results.");
            }
        }
    } catch (err) {
        console.log("Error", err);
        showToast('There was an error loading images. Try again later!');
    } finally {
      removeLoader(loader);
        formEl.reset();
    }
}


formEl.addEventListener('submit', e => {
    e.preventDefault();
    query = e.target.elements.query.value.trim();
    page = 1;

    if (!query) {
        return;
    }

    loadMoreBtn.classList.add('hidden');
    fetchImages();
});


loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    try {
      addLoader(loader);
        const data = await getImages(query, page);
        const markup = imagesTamplate(data.hits);
        ulEl.insertAdjacentHTML('beforeend', markup);
        simpleGallery.refresh();
        smoothScroll();
        if ((page * 15) >= totalHits) {
            loadMoreBtn.classList.add('hidden');
            showToast("We're sorry, but you've reached the end of search results.");
        }
    } catch (err) {
        console.log("Error", err);
        showToast('There was an error loading images. Try again later!');
    } finally {
      removeLoader(loader);
    }
}); 