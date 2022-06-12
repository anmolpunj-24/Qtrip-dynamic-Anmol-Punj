import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const res = await fetch(config.backend+"/reservations/");
    const data = await res.json();
    return data;
  }
  catch(e){
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null; 
}

function getMonthName(num){
  switch(num){
    case 0:return "January";break;
    case 1:return "February";break;
    case 2:return "March";break;
    case 3:return "April";break;
    case 4:return "May";break;
    case 5:return "June";break;
    case 6:return "July";break;
    case 7:return "August";break;
    case 8:return "September";break;
    case 9:return "October";break;
    case 10:return "November";break;
    case 11:return "December";break;
  }
  return null;
}

function getMonthFinal(time){
  const date=new Date(time);

  const setdate=date.getDate();
  const setmonth=date.getMonth();
  const setyear=date.getFullYear(); 

  const monthName=getMonthName(setmonth);

  const finaldate=setdate+" "+monthName+" "+setyear;
  return finaldate;
}

function getTimeFinal(time){
  console.log("time",time);

  const date = new Date(time);
  console.log("date",date);
  const stringdate=date.toLocaleString('en-IN');

  return stringdate.split(" ")[1]+" "+stringdate.split(" ")[2];
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  if(reservations.length){
    document.getElementById('no-reservation-banner').style.display="none";
    document.getElementById('reservation-table-parent').style.display="block";
  }
  else{
    document.getElementById('no-reservation-banner').style.display="block"
    document.getElementById('reservation-table-parent').style.display="none"
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  let getTableBody=document.getElementById('reservation-table');

  reservations.forEach(element=>{
    const createTr=document.createElement('tr');
    // createTr.setAttribute('id',`${element.id}`);

    const event = new Date(element.date)
    const finalDate=event.toLocaleDateString('en-IN');
    console.log(finalDate);

    const time=getTimeFinal(element.time);
    const dateFull=getMonthFinal(element.time);
    const timeFull=getTimeFinal(element.time);

    const finaltime=dateFull+", "+timeFull;
    //  console.log(timeFull);
    createTr.innerHTML=`
    <td>${element.id}</td>
    <td>${element.name}</td>
    <td>${element.adventureName}</td>
    <td>${element.person}</td>
    <td>${finalDate}</td>
    <td>${element.price}</td>
    <td>${finaltime}</td>
    <td id="${element.id}"><a  href="../detail/?adventure=${element.adventure}" class="reservation-visit-button">Visit Adventure</a>
    </td>`
    getTableBody.append(createTr)
  });
}

export { fetchReservations, addReservationToTable };
