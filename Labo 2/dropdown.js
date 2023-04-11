function showDropdown() {
  var cities = ['Quebec','Montreal','Toronto','Calgary','Alberta','Vancouver']

  var dropdownContainer = document.getElementById('dropdown-container');
  var inputElement = createInputElement();
  dropdownContainer.appendChild(inputElement);
  var clearElement = createClearElement();
  dropdownContainer.appendChild(clearElement);

  function createInputElement(){
    var element = document.createElement('input');
    element.placeholder = 'Search...';
    element.addEventListener('click', function(){
      var dropdown = document.getElementById('dropdown-cities');
      if(dropdown){
        dropdown.remove();
      }else{
        filterAndRenderOptions();
      }
    });
    element.addEventListener('keyup',function(){
      var dropdown = document.getElementById('dropdown-cities');
      if(dropdown){
        dropdown.remove();
      }
      filterAndRenderOptions();
    });

    element.addEventListener('focusout', function(){
      var dropdown = document.getElementById('dropdown-cities');
      if(dropdown){
        dropdown.remove();
      }
    });
    return element;
  }

  function createClearElement(){
    var element = document.createElement('span');
    element.innerText = 'X';
    element.style.cursor = 'pointer';

    element.addEventListener('click', function(){
      inputElement.value = '' ;
      if(dropdown){
        dropdown.remove();
      }
      filterAndRenderOptions();
    });
    return element;
  }

  function createDropdownElement(filteredCities){
    console.log(filteredCities)
    var options = document.createElement('div');
    options.id = 'dropdown-cities';
    filteredCities.forEach(function(city){
      var option = document.createElement('div');
      option.innerText = city;
      options.appendChild(option);
    });
    return options;
  }

  function filterAndRenderOptions(){
    var filteredCities = cities.filter(function(city){
      return city.includes(inputElement.value) ;
    });
    if(filteredCities.length === 0){
      renderOptions(['no results found'])
    }else{
      renderOptions(filteredCities)
    }
  }

  function renderOptions(options){

    var optionsElement = createDropdownElement(options);
    dropdownContainer.appendChild(optionsElement);
  }
}
