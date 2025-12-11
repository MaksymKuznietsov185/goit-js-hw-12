import { getImagesByQuery } from './js/pixabay-api.js';
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showLoadMoreButton, 
  hideLoadMoreButton, 
  smoothScroll 
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchInput = form.elements['search-text'];
const loadMoreButton = document.querySelector('[data-load-more]');
const PER_PAGE = 15;

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) {
    iziToast.warning({ message: 'Enter a search query.', position: 'topRight' });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    await fetchImages();
  } catch {
    iziToast.error({ message: 'Error fetching images.', position: 'topRight' });
  } finally {
    hideLoader();
    searchInput.value = '';
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    await fetchImages(true);
    smoothScroll();
  } catch {
    iziToast.error({ message: 'Error fetching more images.', position: 'topRight' });
  } finally {
    hideLoader();
  }
});

async function fetchImages(isLoadMore = false) {
  try {
    const data = await getImagesByQuery(currentQuery, currentPage, PER_PAGE);
    const hits = data.hits;
    totalHits = data.totalHits;

    if (!hits.length && currentPage === 1) {
      iziToast.error({ message: 'No images found. Try another query.', position: 'topRight' });
      return;
    }

    createGallery(hits);

    const totalLoaded = (currentPage - 1) * PER_PAGE + hits.length;

    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      if (totalHits) {
        iziToast.info({ message: "We've reached the end of results.", position: 'bottomCenter' });
      }
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    throw error;
  }
}
