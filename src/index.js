import './css/styles.css';
// var debounce = require('lodash.debounce');

import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


fetch('https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages').then(response => response.json).then(data => console.log(data)).catch(error => console.log(error));





// https://restcountries.com/v2/all?fields=name.official,capital,population,flags.svg,languages

// https://restcountries.com/v3.1/all