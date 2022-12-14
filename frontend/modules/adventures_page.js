import config from "../conf/index.js";
 

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  var urlParams = new URLSearchParams(search);
  var city = urlParams.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let result = await fetch(
      config.backendEndpoint + `/adventures?city=${city}`
    ).then((response) => response.json());
    //console.log(response);
    return result;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const dataContainer = document.getElementById("data");
  adventures.forEach((adventure) => {
    let adventureCityEl = document.createElement("div");
    adventureCityEl.className = "col-6 col-lg-3 flex mb-4";
    adventureCityEl.innerHTML = `<a id="${adventure.id}"  href="detail/?adventure=${adventure.id}">
      <div class ="activity-card">
        <div class = "category-banner">
          <h6>${adventure.category}</h6>
        </div>
        <img class="activity img" src="${adventure.image}" />
        <div class = "d-flex justify-content-between  px-1 pt-1 w-100">
          <p style= "font-weight:bold">${adventure.name}</p>
          <p>₹ ${adventure.costPerHead}</p>
        </div>
        <div class = "d-flex justify-content-between px-1 pt-1 w-100">
          <p style= "font-weight:bold">Duration</p>
          <p>${adventure.duration} Hours</p>
        </div>
      </div> 
      </a> 
     `;
    dataContainer.appendChild(adventureCityEl);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filterList = list.filter(
    (key) => key.duration >= low && key.duration <= high
  );
  return filterList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  if (categoryList.length == 0) return list;

  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < categoryList.length; j++) {
      if (list[i].category === categoryList[j]) {
        filteredList.push(list[i]);
        break;
      }
    }
  }
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let category = filters.category;

  let newlist = [];

  if (filters.duration.length === 0) {
    newlist = filterByCategory(list, category);
  } else {
    let arr = filters.duration.split("-");
    let low = arr[0];
    let high = arr[1];

    newlist = filterByDuration(list, low, high);
    newlist = filterByCategory(newlist, category);
  }
  return newlist;
}



//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  return localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const parent = document.getElementById("category-list");
  filters.category.forEach((element) => {
    const child = document.createElement("div");
    child.setAttribute("class", "category-filter");
    child.innerHTML = `${element}`;
    parent.append(child);
  });

  const getDuration = document.getElementById("duration-select");
  getDuration.value = filters.duration;
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
