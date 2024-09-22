import { MainApi } from "../MainApi";

async function fetchPins(map_id) {
  try{
    const url = `/api/maps/${map_id}/pins`;
    const response = await MainApi.get(
      url
    );

    
    console.log(response);
  } catch(error){
    console.error(error);
  }
}

async function fetchSavePins(category,fromWhere,date,image,coords,map_id) {
  // category ::: bicycle, etc
  // fromWhere ::: floatingButton, returnButton
  // date ::: string
  // image ::: base64/jpeg string
  // coords ::: coords.lat, coords.lng
  // map_id ::: int

  var url = `/api/maps/${map_id}/pins`;
  if(fromWhere === "returnButton"){
    url = `/api/maps/`; // TODO : pin_id 가져와야 함
  } 

  try {
    const response = await MainApi.post(
      url,
      {
        "pin_date" : date,
        "pin_latitude" : coords.lat,
        "pin_longitude" : coords.lng,
        "pin_image" : image
      }
    );

    console.log(response);

  } catch (error) {
    console.error(error);
  }
}

export {fetchPins, fetchSavePins};
