var app = function(){
  var url = 'https://restcountries.eu/rest/v1/all';
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  //create a new XMLHttpRequest
  var request = new XMLHttpRequest();

  //open the request, tell it what method (i.e. HTTP method) we want to use
  request.open("GET", url);

  //set the callback we want it to run when it's complete
  request.onload = callback;

  //send the request -- DON'T FORGET
  request.send();
}

var requestComplete = function(){
  //because request.onload = callback (above), 'this' is the request object
  if(this.status !== 200) return; 
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateSelect(countries);
}

//stick the data on the page
var populateSelect = function(countries){
  var select = document.getElementById('country-select');
  
  select.onchange = function(){
    var country = countries[this.value];
    handleSelectChange(countries, country);
    localStorage.setItem('lastCountrySelected', JSON.stringify(country));
  };

  for (var i = 0; i < countries.length; i++) {
    var option = document.createElement('option');
    option.innerText = countries[i].name;
    option.value = i;
    select.appendChild(option);
  }
}

var handleSelectChange = function(countries, country) {
  var ul = document.getElementById('select-result');

  var ulList = ul.childNodes;
  // ul.innerText = "";

  while (ul.hasChildNodes()) {
      ul.removeChild(ul.lastChild);
  }

  var liName = document.createElement('li');
  var liCapital = document.createElement('li');
  var liPopulation = document.createElement('li');

  liName.innerText = "Country: " + country.name;
  liCapital.innerText = "Capital: " + country.capital;
  liPopulation.innerText = "Population: " + country.population;

  ul.appendChild(liName);
  ul.appendChild(liCapital);
  ul.appendChild(liPopulation);

  var borderingArray = country.borders;
  for (var i = 0; i < borderingArray.length; i++) {
    var countryCode = borderingArray[i];
    for (var country of countries) {
      if (countryCode === country.alpha3Code) {
        // displayStats(country);
      };
    };
  };
}

// var displayStats = function() {

// }


window.onload = app;