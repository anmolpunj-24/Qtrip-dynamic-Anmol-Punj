import config from "../conf/index.js";
  
//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS  
  // 1. Get the Adventure Id from the URL
  var urlParams = new URLSearchParams(search); 
  var adventureId = urlParams.get('adventure');
  return adventureId; 
}   
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const result = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    const data = await result.json();
    return data;
  } catch (e) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const getAdventureName=document.getElementById('adventure-name')
  getAdventureName.innerHTML=`${adventure.name}`

  const getSubtitle=document.getElementById('adventure-subtitle')
  getSubtitle.innerHTML=`${adventure.subtitle}`


  const getPhotoparent=document.getElementById('photo-gallery');

  adventure.images.forEach(ele=>{
    const createChild=document.createElement('div');
    createChild.innerHTML=`<img src=${ele} class="activity-card-image"> </img>`
    getPhotoparent.append(createChild);
  });

  const getContent=document.getElementById('adventure-content')
  getContent.innerHTML=`${adventure.content}`
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" id="carousel-inner">
   
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`;

  images.map((image, idx) => {
    let ele = document.createElement("div");
    ele.className = `carousel-item ${idx === 2 ? "active" : ""}`;
    ele.innerHTML = `
    <img
        src=${image}
        class="activity-card-image pb-3 pb-md-0"
      />
          `;

    document.getElementById("carousel-inner").appendChild(ele);
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
   
  if(adventure.available){
    document.getElementById('reservation-panel-sold-out').style.display = "none";
    document.getElementById('reservation-panel-available').style.display = "block";


    const getPerHeadCost=document.getElementById('reservation-person-cost');
    getPerHeadCost.innerHTML=`${adventure.costPerHead}`;
  }
  else{
    document.getElementById('reservation-panel-available').style.display = "none";
    document.getElementById('reservation-panel-sold-out').style.display = "block";

  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalCost=persons*adventure.costPerHead;
  const reservationCost=document.getElementById('reservation-cost')
  reservationCost.innerHTML=totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  
  form.addEventListener("submit", async (event)=>{
    event.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";

    let formElements = form.Element;
    let payload ={
      name:formElements.element["name"].value.trim(),
      date:formElements.element["date"].value,
      person:formElements.element["person"].value,
      adventure:adventure.id,
    }
    try{
      const res = fetch (url,{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{
          "Content-type":"application/json"
        }
      });
      if(res.ok){
        alert("Success");
        location.reload();
      }else{
        alert("Failed")
      }
    }
    catch(e){
      alert("Failed-to-load")
    }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const getBanner = document.getElementById("reserved-banner")
  if(adventure.reserved){
    getBanner.style.display="block";
  }
  else{
    getBanner.style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
