import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const ulEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(handleSearchCountry, DEBOUNCE_DELAY));

function handleSearchCountry() {
    const inputValue = inputEl.value.trim();

    if (!inputValue) {
        return;
    }
    
        API.fetchCountries(inputValue).then((data) => 
        {
            if (data.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                console.log(data)
            }
    
            if (data.length <= 10 && data.length > 2){
                ulEl.innerHTML = "";
                countryInfoEl.innerHTML = "";
                createMarkup(data);
            }
    
            if (data.length === 1) {
                ulEl.innerHTML = "";
                countryInfoEl.innerHTML = "";
                createInfoCountryMarkup(data)
            }

            
        }
       )
        .catch ((error) => Notiflix.Notify.failure('Oops, there is no country with that name'));
    };

const createListItem =(item) => 
    `<div class="country-contaiter"> 
    <img class="country-img" src="${item.flags.svg}" alt="{item.name.official}" width="40" height="40">
    <h2>${item.name.official}</h2>
    </div>`
;

const createArrayItem = (array) => 
    array.reduce((acc, item) => acc + createListItem(item), "")
;

const createMarkup = (array) => {
    const result = createArrayItem(array);
    ulEl.insertAdjacentHTML('beforeend', result);
};

const createInfoCountryItem = (item) =>
    ` <div class="country-contaiter">
    <img class="country-img" src="${item.flags.svg}" alt="{item.name.official}" width="80" height="40">
    <h2 class="country-title">${item.name.official}</h2>
    </div>
    <p><span class="description">Capital:</span> ${item.capital}</p>
    <p><span class="description">Population:</span> ${item.population}</p>
    <p><span class="description">Languages:</span> ${(Object.values(item.languages).join())}</p>
    `;

const createArrayInfoCountryItem = (array) => 
    array.reduce((acc, item) => acc + createInfoCountryItem(item), "")
;

const createInfoCountryMarkup = (array) => {
    const result = createArrayInfoCountryItem(array);
    countryInfoEl.insertAdjacentHTML('beforeend', result);
};








