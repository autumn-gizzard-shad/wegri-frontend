import '../../../styles/map/bottomSheet.css';
import { useEffect, useState } from "react";
import { distanceMeterCalc } from "../../../utils/calculator";
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { fetchRentBicycle } from "../../../app/map_api/pinApi";


function BottomSheetContent({
  map_id,
  category,
  selectedMarker,
  setSelectedMarkerState,
  selectedMarkerInfo,
  isRentOn,
  setIsRentOn,
  currentPosition
  }) {
  const [isBicycle, setIsBicycle] = useState(false);
  const [isEmpty , setIsEmpty] =  useState(true);
  const [style, setStyle] = useState({ opacity: 1 });
  
  const notify = () => toast("자전거에 가까이 가셔야 합니다.");

  async function doRent() {
    const distance = distanceMeterCalc(selectedMarkerInfo.lat, selectedMarkerInfo.lng, currentPosition.lat,currentPosition.lng);
    if(distance >= 50){
      notify();
      return;
    }
    
    await fetchRentBicycle(map_id, selectedMarkerInfo.id);

    if(!isRentOn){
      setIsRentOn(true);
    }
    setSelectedMarkerState(null);
    selectedMarker.setImage(selectedMarker.basicImage);
  }


  const upOpacity = () => {
    setStyle({opacity:1});
  }
  const downOpacity = () => {
    setStyle({opacity:0.5});
  }


  useEffect(() => {
    if(category === "bicycle"){
      setIsBicycle(true);
    }
    if(selectedMarker===null){
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  },[selectedMarker]);

  const provider = "민국";

    return (
      <div className="content-body">
        {/* {toast && <Toast setToast={setToast} text="자전거에 가까이 가셔야 합니다."></Toast>} */}
        {isEmpty
        ?<div>
          <h2>환영합니다 !</h2>
          <p>핀을 눌러 내용을 확인하시거나</p>
          <p>우측 상단 버튼을 눌러 새로운 핀을 등록하세요.</p>
        </div>
      
        :<div>
          <h2 className="content-date">{selectedMarkerInfo?.date}</h2>
          <p>{selectedMarkerInfo?.addr}</p>
          <img className="content-image" src= {selectedMarkerInfo?.image}/>        
        </div>
          }
        {!isEmpty && isBicycle
        ?<div>
          <button 
            className="rent-button"
            style={style}
            onTouchStart={downOpacity}
            onTouchEnd={upOpacity}
            onClick={doRent}
          >
            <p>대여하기</p>
          </button>
          <div className="categorical-text">
            <p className="row-head">제공자</p>
            <p className="row-content">{selectedMarkerInfo?.provider}</p>
          </div>
        </div>
        : <div></div>
        }

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          draggable
          theme="light"
        />

     </div>
    );
}

export default BottomSheetContent;