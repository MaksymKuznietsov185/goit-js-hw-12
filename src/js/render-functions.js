import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('[data-load-more]');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

function createGalleryItemMarkup(image) {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;

    return `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="info">
                <p class="info-item"><b>Likes</b>${likes}</p>
                <p class="info-item"><b>Views</b>${views}</p>
                <p class="info-item"><b>Comments</b>${comments}</p>
                <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
        </li>
    `;
}

export function createGallery(images) {
    const markup = images.map(createGalleryItemMarkup).join('');
    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryContainer.innerHTML = '';
}

export function showLoader() {
    if (loader) {
        loader.classList.remove('is-hidden');
    }
}

export function hideLoader() {
    if (loader) {
        loader.classList.add('is-hidden');
    }
}

export function showLoadMoreButton() {
    if (loadMoreButton) {
        loadMoreButton.classList.remove('is-hidden');
    }
}

export function hideLoadMoreButton() {
    if (loadMoreButton) {
        loadMoreButton.classList.add('is-hidden');
    }
}

export function smoothScroll() {
    const firstGalleryItem = document.querySelector('.gallery-item');
    if (!firstGalleryItem) return;

    const cardHeight = firstGalleryItem.getBoundingClientRect().height;

    window.scrollBy({
        top: 2 * cardHeight,
        behavior: 'smooth',
    });
}