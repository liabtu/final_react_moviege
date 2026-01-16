import axios from 'axios';

const API_KEY = 'bef98b8d9a1c948a665bfaaf8a447551';
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'ka-GE',
  },
});