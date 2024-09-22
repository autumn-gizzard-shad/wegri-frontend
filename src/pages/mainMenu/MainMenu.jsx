import { useEffect, useState } from "react";
import Header from "../../components/Header"
import "../../styles/pages/mainMenu.css"
import MapButton from "../../components/MapButton";
import CommonButton from "../../components/CommonButton";
import Bottom from "../../components/Bottom";
import { useLocation, useNavigate,  } from "react-router-dom";
import { MainApi } from "../../app/MainApi";

const { kakao } = window;

function MainMenu() {
    const [ userLocStr , setUserLocStr] = useState(null);
    const [mapList,setMapList] = useState(null)
    const [address,setAddress] = useState("대구 북구 대현로 19길")
    const navigate = useNavigate()
    const location = useLocation()
    const MoreMenu = () => {
        navigate("/more",{state:{"address":address}})
    }

    useEffect(()=>{
      async function getUserLoc() {
        var lat = 37.402707;
        var lng = 126.922044;

        if(navigator.geolocation){
          const pos = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          lat = pos.coords.latitude;
          lng = pos.coords.longitude;
        } 

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.coord2Address(lng, lat,(result,status)=> {
          if (status === kakao.maps.services.Status.OK) {
            const addressString = result[0].address.address_name;
            setUserLocStr(addressString);
            sessionStorage.setItem("addressString", addressString);
          }

        });
      }
      if(!sessionStorage.getItem("accessToken")){
        sessionStorage.setItem("accessToken",location.search.slice(7));
        MainApi.defaults.headers.common["Authorization"] = `Bearer ${location.search.slice(7)}`;

      }
      setMapList(null);
      getUserLoc();
    },[]);

    useEffect(()=>{
      if(userLocStr){
        const sessionMapList = sessionStorage.getItem('mapList')
        console.log(111);
        // if(sessionMapList === null){
          MainApi.get('/api/maps')
          .then(
              response => {
                  sessionStorage.setItem('mapList',JSON.stringify({"mapList":response.data.map_list}))
                  setMapList(response.data.map_list)
              }
          ).catch(error => {})
        // }
        // else{
        //   setMapList(JSON.parse(sessionMapList).mapList)
        // }
      }
    },[userLocStr]);


    return(
        <div className="main-index">
            <Header>
                <div>{sessionStorage.getItem("addressString")}</div>
            </Header>
            {
              mapList
              ? mapList.map((value,index) => (
                    
                    <MapButton content={value} size="big"></MapButton>
                ))
              : <div></div>
            }
            <CommonButton width={"320px"} height={"32px"} backgroundColor="white" >
                <div className="button-content button-more" onClick={(event) => MoreMenu()}>
                    더 보기
                </div>
            </CommonButton>
            <Bottom current="main"></Bottom>

        </div>
    );
}

export default MainMenu