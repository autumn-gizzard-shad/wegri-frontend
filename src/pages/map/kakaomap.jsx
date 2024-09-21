import { useEffect, useState } from 'react';
import BottomSheet from '../../components/maps/bottomSheet/bottomSheet';
import useBottomSheet from "../../hooks/maps/bottomSheet/useBottomSheet";
import BottomSheetContent from '../../components/maps/bottomSheet/bottomSheetContent';
import FloatingButton from '../../components/maps/floatingButton/floatingButton';

const { kakao } = window;

function KaKao({category,map_id}) {
  const PIN_WIDTH = 60;
  const PIN_HEIGHT = 69;
  const BASIC_PIN_SRC = require("../../assets/map_emoji/"+category+"_basic.png");
  const SELECTED_PIN_SRC = require("../../assets/map_emoji/"+category+"_selected.png");
  var userInitialLoc;
  const [userLoc, setUserLoc] = useState(null);
  const { setIsOpen, isOpen, controls,onDragEnd, headerRef } = useBottomSheet();

  const [selectedMarkerState, setSelectedMarkerState] = useState(null);
  var selectedMarker = null;

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

  function addMarker(map,position){
    const basicImage = createMarkerImage(BASIC_PIN_SRC, PIN_WIDTH, PIN_HEIGHT);
    const selectedImage = createMarkerImage(SELECTED_PIN_SRC, PIN_WIDTH*1.3, PIN_HEIGHT*1.3);

    const marker = new kakao.maps.Marker({
        map : map,
        position : position.latlng,
        title : position.title,
        image : basicImage
    });

    marker.basicImage = basicImage;

    kakao.maps.event.addListener(marker, 'click', function() {
    
      if(!selectedMarker || selectedMarker !== marker ){
        !!selectedMarker && selectedMarker.setImage(selectedMarker.basicImage);

        marker.setImage(selectedImage);
        setIsOpen(true);

      }

      setSelectedMarkerState(marker);
      selectedMarker = marker;

    });

  }

  useEffect(() => {
    async function getCoords () {
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

  },[]);

  useEffect(()=>{
    if(userLoc != null){
      // map 생성
      const container = document.getElementById('map');
      const options = {
          center : userLoc,
          level : 3 // 지도의 확대 레벨
      };
      const map = new kakao.maps.Map(container,options);    

      const positions = [
      {
          title: '안양역', 
          latlng: new kakao.maps.LatLng(37.402707, 126.922044)
      },
      {
          title: '안양역 주위 1', 
          latlng: new kakao.maps.LatLng(37.400707, 126.920044)
      },
      {
          title: '안양역 주위 2', 
          latlng: new kakao.maps.LatLng(37.403007, 126.925044)
      },
      {
          title: '안양역 주위 3',
          latlng: new kakao.maps.LatLng(37.405707, 126.925044)
      }
      ]; 
      

      for(var i = 0; i < positions.length; i++){
        addMarker(map,positions[i]);  
      }
    }
  },[userLoc]);


  return (
    <div id = "map" style = {{
        width : '100vw',
        height : '100vh',
        overflowY:"none",
    }}>

      <FloatingButton></FloatingButton>

      <BottomSheet
        onDragEnd = {onDragEnd}
        controls = {controls}
        headerRef = {headerRef}
      >
        <BottomSheetContent
          category = {category}
          selectedMarker = {selectedMarkerState}
        ></BottomSheetContent>
      </BottomSheet>
    </div>
  );
}

export default KaKao;