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

    const pin_list = response.data.pin_list;
    console.log(pin_list);

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
  // if(fromWhere === "returnButton"){
  //   url = `/api/maps/${}`; // TODO : pin_id 가져와야 함
  // } 

  try {
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

    console.log(response);

  } catch (error) {
    console.error(error);
  }
}

export {fetchPins, fetchSavePins};
