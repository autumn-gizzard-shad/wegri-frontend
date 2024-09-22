import { MainApi } from "../MainApi";

async function fetchPins(map_id) {
  try{
    const token = sessionStorage.getItem("accessToken");
    const url = `/api/maps/${map_id}/pins`;
    const response = await MainApi.get(
      url,
      {
        headers : {
          Authorization : "Bearer "+token

        }
      }
    );
    var pin_list;
    if(map_id == 1) {
      pin_list = response.data.pin_List;
    } else {
      pin_list = response.data.pin_list;
    }
    console.log(response);
    return pin_list;
  } catch(error){
    console.error(error);
  }
}

async function fetchSavePins(category,fromWhere,date,image,coords,map_id,pin_id) {
  // category ::: bicycle, etc
  // fromWhere ::: floatingButton, returnButton
  // date ::: string
  // image ::: base64/jpeg string
  // coords ::: coords.lat, coords.lng
  // map_id ::: int
  const token = sessionStorage.getItem("accessToken");
  var url = `/api/maps/${map_id}/pins`;
  if(fromWhere === "returnButton"){
    url = `/api/maps/${map_id}/pins/${pin_id}/return`; // TODO : pin_id 가져와야 함
  } 

  try {
    if(fromWhere !== "returnButton"){
      const response = await MainApi.post(
        url,
        {
          headers : {
            Authorization : "Bearer "+token
          },
          "pin_date" : date,
          "pin_latitude" : coords.lat,
          "pin_longitude" : coords.lng,
          "pin_image" : image
        }
      );  
    } else {
      const response = await MainApi.patch(
        url,
        {
          headers : {
            Authorization : "Bearer "+token
          },
          "pin_date" : date,
          "pin_latitude" : coords.lat,
          "pin_longitude" : coords.lng,
          "pin_image" : image
        }
      );  
    }


  } catch (error) {
    console.error(error);
  }
}

async function fetchRentBicycle(map_id, pin_id) {
  try{
    const token = sessionStorage.getItem("accessToken");
    const url = `/api/maps/${map_id}/pins/rental`;
    
    const response = await MainApi.post(
      url,
      {
        headers : {
          Authorization : "Bearer "+token
        },
        "pin_id" : pin_id
      }
    );

  } catch (error) {
    console.error(error);
  }
}

export {fetchPins, fetchSavePins, fetchRentBicycle};
