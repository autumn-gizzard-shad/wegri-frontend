import { useEffect, useState } from 'react';
import BottomSheet from '../../components/maps/bottomSheet/bottomSheet';
import useBottomSheet from "../../hooks/maps/bottomSheet/useBottomSheet";
import BottomSheetContent from '../../components/maps/bottomSheet/bottomSheetContent';
import FloatingButton from '../../components/maps/floatingButton/floatingButton';
import RentManager from '../../components/maps/rentManager/rentManager';
import { MainApi } from '../../app/MainApi';
import { fetchPins } from '../../app/map_api/pinApi';
import { useLocation, useNavigate } from 'react-router-dom';

const { kakao } = window;

function KaKao() {

  const navigate = useNavigate();
  const location = useLocation();
  const map_id = location.state.map_id;
  var geocoder;
  var category = "etc";
  if(map_id === 1 ) category = "bicycle";
  const [map, setMap] = useState(null);
  const PIN_WIDTH = 60;
  const PIN_HEIGHT = 69;
  const BASIC_PIN_SRC = require("../../assets/map_emoji/basic.png");
  const SELECTED_PIN_SRC = require("../../assets/map_emoji/selected.png");
  const [userLoc, setUserLoc] = useState(null);
  const {setIsOpen, isOpen, controls,onDragEnd, headerRef } = useBottomSheet();
  const [selectedMarkerState, setSelectedMarkerState] = useState(null);
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  var selectedMarker = null;
  const [isRentOn, setIsRentOn ] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [userMarker, setUserMarker] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [markerList, setMarkerList] = useState([]);
  const [userPathList, setUserPathList] = useState([]);
  const [userPolyPath, setUserPolyPath] = useState(null);

  // 마커 이미지 등록
  function createMarkerImage(imageSrc, width, height){
    const markerSize = new kakao.maps.Size(width, height);
    const markerOption = {offset: new kakao.maps.Point(width/2, height)};

    const markerImage = 
      new kakao.maps.MarkerImage(
        imageSrc, 
        markerSize, 
        markerOption
      );

    return markerImage;
  }

  // 마커 찍기
  function addMarker(map,position){
    const basicImage = createMarkerImage(BASIC_PIN_SRC, PIN_WIDTH, PIN_HEIGHT);
    const selectedImage = createMarkerImage(SELECTED_PIN_SRC, PIN_WIDTH*1.3, PIN_HEIGHT*1.3);
    const latlng = new kakao.maps.LatLng(position.lat, position.lng);
    const marker = new kakao.maps.Marker({
        map : map,
        position : latlng,
        image : basicImage
    });

    marker.basicImage = basicImage;

    kakao.maps.event.addListener(marker, 'click', function() {
    
      if(!selectedMarker || selectedMarker !== marker ){
        !!selectedMarker && selectedMarker.setImage(selectedMarker.basicImage);

        marker.setImage(selectedImage);
        setIsOpen(true);

      }

      // bottomSheetContent에서 사용할 정보들
      setSelectedMarkerInfo(position);
      setSelectedMarkerState(marker);
      selectedMarker = marker;

    });

    const tempArr = markerList;
    tempArr.push(marker);
    setMarkerList(tempArr);
  } 

  // user Location 추적
  function keepGettingCurrentLoc() {
    if(navigator.geolocation){
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setCurrentPosition({
            lat : position.coords.latitude,
            lng : position.coords.longitude,
          });
        },
        (err) => {
          console.error("Error while wathing position:", err);
        },
        {
          enableHighAccuracy : true,
          timeout: 2000,
          maximumAge : 0,
        }
      );
      console.log(watchId);
      sessionStorage.setItem("watchId",watchId);
      setWatchId(watchId);

    }
  }

  // 추적 stop
  function stopGeetingCurrentLoc(){

    const ID = sessionStorage.getItem("watchId");
    if(ID){
      navigator.geolocation.clearWatch(ID);
      setWatchId(null);
    }
  }

  // 마커 리스트 만들기 <- pin 정보 가져오기
  async function fetchMarkerList(map) {

    const list_from_BE = await fetchPins(map_id);

    var addressString = "기본 주소예요";
    for(let i = 0 ; i < list_from_BE.length; i++ ){
      const item = list_from_BE[i];

      geocoder.coord2Address(item.pin_longitude, item.pin_latitude, (result, status)=> {
        if (status === kakao.maps.services.Status.OK) {
          addressString = result[0].address.address_name;
          if(category === "bicycle") {
            if(item.pin_is_rent){
              const position = {
                date:item.pin_date,
                lat:item.pin_latitude,
                lng:item.pin_longitude,
                addr:addressString,
                image:item.pin_image,
                id : item.pin_id,
                provider : item.pin_provider,
                is_rent : item.pin_is_rent  
              };
              addMarker(map,position);  
            }

          } else {
            const position = {
              date:item.pin_date,
              lat:item.pin_latitude,
              lng:item.pin_longitude,
              addr:addressString,
              image:item.pin_image
  
            };
            addMarker(map,position);  

          }
        }
      });
    }
  }



  useEffect(() => {
    async function getCoords () {
      keepGettingCurrentLoc();
      var userInitialLoc;
      if(navigator.geolocation){
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        userInitialLoc = await new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      } else {
        userInitialLoc = await new kakao.maps.LatLng(37.402707, 126.922044);
      }
      setUserLoc(userInitialLoc);

    }

    getCoords();

    return ()=>{stopGeetingCurrentLoc()};
  },[]);

  useEffect(()=>{
    async function mapEffectFunction() {
      if(userLoc){
        // map 생성
        const container = document.getElementById('map');
        const options = {
            center : userLoc,
            level : 3 // 지도의 확대 레벨
        };
  
        const map =new kakao.maps.Map(container,options);
        setMap(map);
        setMarkerList([]);

        geocoder  = new kakao.maps.services.Geocoder(); 
        await fetchMarkerList(map);
      }
  
    }
    mapEffectFunction();
  },[userLoc]);

  useEffect(() => {
    if(map){
      if(userMarker) {
        userMarker.setMap(null);
      }

      // 유저 이동경로 기록하기
      if(isRentOn){
        const tempArr = userPathList;
        tempArr.push(
          new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng)
        );
        
        if(userPolyPath){
          userPolyPath.setMap(null);
        }


        const polyline = new kakao.maps.Polyline({
          path: userPathList,
          strokeWeight: 5, 
          strokeColor: '#FFAE00', 
          strokeOpacity: 0.7, 
          strokeStyle: 'solid' 
        });
        
        polyline.setMap(map);

        setUserPolyPath(polyline);
        
      }
      // 사용자의 현재 위치 pin
      const userImage = createMarkerImage(
        require("../../assets/map/user_location_circle.png"),
        25,
        25
      );
      const userLocation = new kakao.maps.LatLng(currentPosition.lat, currentPosition.lng);

      const marker = new kakao.maps.Marker({
        map : map,
        position : userLocation,
        image : userImage
      });

      setUserMarker(marker);
    }
  },[currentPosition]);

  useEffect(() => {
    if(map){
      if(isRentOn){
        markerList.forEach((marker)=>{
          marker.setMap(null);
        });
        if(isOpen){
          setIsOpen(false);
        }
    
      } else {
        markerList.forEach((marker)=>marker.setMap(map));
        userPolyPath.setMap(null);
        setUserPolyPath(null);
        setUserPathList([]);
      }  
    }
  },[isRentOn]);

  return (
    <div id = "map" style = {{
        width : '100vw',
        height : '100vh',
        overflowY:"none",
    }}>
      <div style={{
        position:"fixed",
        top: "5%",
        left : "5%",
        fontSize : "35px",
        zIndex: "10"
      }}
        onClick={()=>navigate(-1)}
      >
        &lt;
      </div>
      <FloatingButton
        category={category}
        map_id={map_id}
      ></FloatingButton>
      {isRentOn
      ?
      <RentManager
        map_id = {map_id}
        isRentOn={isRentOn}
        setIsRentOn={setIsRentOn}
        selectedMarkerInfo={selectedMarkerInfo}
      >
      </RentManager>
      :
      <BottomSheet
        onDragEnd = {onDragEnd}
        controls = {controls}
        headerRef = {headerRef}
      >
        <BottomSheetContent
          map_id = {map_id}
          category = {category}
          selectedMarker = {selectedMarkerState}
          setSelectedMarkerState = {setSelectedMarkerState}
          selectedMarkerInfo = {selectedMarkerInfo}
          currentPosition = {currentPosition}
          isRentOn = {isRentOn}
          setIsRentOn = {setIsRentOn}
        ></BottomSheetContent>
      </BottomSheet>

      }
    </div>
  );
}

export default KaKao;