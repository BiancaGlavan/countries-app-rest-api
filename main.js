
const body = document.querySelector('body');
const countriesContainer = document.querySelector('.countries');
const mainSection = document.querySelector('.main-section');
const singleCountryPage = document.querySelector('.single-country-page');
const singleCountryContainer = document.querySelector('.single-country');
const searchInput = document.querySelector('.input-search');

const App = {
    countries: [],
    toggleDarkMode: () => {
        body.classList.toggle('dark');

    },

    openSingleCountry: (countryName) => {
        mainSection.classList.add('hide');
        singleCountryPage.classList.remove('hide');
        console.log('country: ', countryName);

        const currentCountry = App.countries.find((country, idx)=> country.name.common === countryName);
        console.log(currentCountry);
        App.printSingleCountry(currentCountry);
    },

    closeSingleCountry: () => {
        singleCountryPage.classList.add('hide');
        mainSection.classList.remove('hide');
    },

    printSingleCountry: (country) => {
        let borderButtons = '';

        if(country.borders) {
            country.borders.forEach((border, idx) => {
                let currentCountry = App.countries.find((c, idx) => c.fifa === border);

                if(currentCountry) {
                    let newButton = `<button onclick="App.openSingleCountry('${currentCountry.name.common}')">${currentCountry.name.common}</button>`;
                borderButtons = borderButtons + newButton;
                }
    
                
            });
        }



        let countryContent = `
            <img src="${country.flags.svg}" alt="">
            <div class="single-country-info">
                <h1 class="title">${country.name.common}</h1>
                <div class="country-details">
                    <p class="detail"><span>Native Name:</span> ${country.name.official}</p>
                    <p class="detail"><span>Population:</span> ${country.population}</p>
                    <p class="detail"><span>Region:</span> ${country.region}</p>
                    <p class="detail"><span>Sub Region:</span> ${country.subregion}</p>
                    <p class="detail"><span>Capital:</span> ${country.capital[0]}</p>
                    <p class="detail"><span>Top Level Domain:</span> ${country.tld[0]}</p>
                    <p class="detail"><span>Currencies:</span> ${Object.values(country.currencies)[0].name}</p>
                    <p class="detail"><span>Languages:</span> ${Object.values(country.languages).join(', ')}</p>
                </div>
                <div class="country-borders">
                    <h3>Border Countries:</h3>
                    ${borderButtons}
                </div>
            </div>
        `;

        singleCountryContainer.innerHTML = countryContent;
    },

    printCountries: (countriesList) => {
        let res = '';
        countriesList.forEach((country, idx) => {
            let element = `
            <div class="country" onclick="App.openSingleCountry('${country.name.common}')">
                <div class="country-image" style="background-image: url(${country.flags.svg});"></div>
                <div class="info">
                    <h1>${country.name.common}</h1>
                    <p class="info-text">
                        <span>Population:</span> ${country.population}
                    </p>
                    <p class="info-text">
                        <span>Region:</span> ${country.region}
                    </p>
                    <p class="info-text">
                        <span>Capital:</span> ${country.capital && country.capital.length > 0 ? country.capital[0] : ''}
                    </p>
                </div>
            </div>
            `;
            res = res + element;
        });
        countriesContainer.innerHTML = res;
    },
    fetchCountries: () => {

        fetch('https://restcountries.com/v3.1/all').then((response) => response.json())
        .then((data) => {
            console.log('fetchCountries: ', data);
            App.countries = [...data];
            App.printCountries(data);
        });

    },
    filterByRegion: (regionName) => {
        let newCountryList = App.countries.filter((country, idx) => country.region === regionName);
        App.printCountries(newCountryList);
    },
    changeRegion: () => {
        const selectValue = document.querySelector('#regions').value; 
        if(selectValue === 'All') {
            App.printCountries(App.countries);
        } else {
            App.filterByRegion(selectValue);
        }
        
    },

    searchCountries: () => {
        const term = searchInput.value;
        console.log('term: ', term);
        let newCountryList = App.countries.filter((country, idx) => country.name.common.toLowerCase().includes(term));
        App.printCountries(newCountryList);
    },


    init: () => {

        // fetch countries fom api
        // store the countries array in our app object
        // print the countries in the main container

        App.fetchCountries();

        searchInput.addEventListener("keyup", (e) => {
          App.searchCountries();
        });
    }
}

App.init();