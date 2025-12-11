import axios from 'axios';

const PIXABAY_KEY = '53658397-297125985b6b4c55411510f4b'; 
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15; 

export async function getImagesByQuery(query, page) {
  const params = {
    key: PIXABAY_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: PER_PAGE,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data; 
  } catch (error) {
    console.error("HTTP Request failed:", error);
    throw error;
  }
}