import './style.css';
import autocompleteWidget from './autocomplete.js';
import { renderSummary, runComparison } from './utils.js';
const leftAutocomplete = document.querySelector('#left-autocomplete');
const rightAutocomplete = document.querySelector('#right-autocomplete');
let leftMovie;
let rightMovie;
const autocompleteConfig = {
  debounceDuration: 500,
  fetchData: async (searchInp) => {
    const response = await axios.get('http://www.omdbapi.com', {
      params: {
        apikey: 'ae5cd549',
        s: searchInp,
      },
    });
    return response.data.Search;
  },
  inputVal: ({ Title }) => Title,
  renderOption: ({ Poster, Title }) => `
  <a class="hover:bg-gray-100 cursor-pointer my-2 flex gap-2 items-center">
            <img
              src="${Poster}"
              alt=""
              srcset=""
              class="w-20 h-20 bg-cover block"
            />
            <div class="title">${Title}</div>
          </a>
  `,
};
autocompleteWidget({
  ...autocompleteConfig,
  root: leftAutocomplete,
  onOptionClick: async ({ imdbID }) => {
    const res = await axios.get('http://www.omdbapi.com', {
      params: {
        apikey: 'ae5cd549',
        i: imdbID,
      },
    });
    const movieData = res.data;
    leftMovie = movieData;
    document.querySelector('#left-summary').innerHTML =
      renderSummary(movieData);

    leftMovie && rightMovie ? runComparison() : null;
  },
});
autocompleteWidget({
  ...autocompleteConfig,
  root: rightAutocomplete,
  onOptionClick: async ({ imdbID }) => {
    const res = await axios.get('http://www.omdbapi.com', {
      params: {
        apikey: 'ae5cd549',
        i: imdbID,
      },
    });
    const movieData = res.data;
    document.querySelector('#right-summary').innerHTML =
      renderSummary(movieData);

    rightMovie = movieData;
    leftMovie && rightMovie ? runComparison() : null;
  },
});
