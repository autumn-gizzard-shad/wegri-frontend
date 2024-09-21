import base64TempImage from "./temp";
import '../../../styles/map/bottomSheet.css';
import { useEffect, useState } from "react";

function BottomSheetContent({category,
  selectedMarker, 
  setSelectedMarkerState,
  isOpen, 
  setIsOpen, 
  isRentOn,
  setIsRentOn
  }) {
  const [isBicycle, setIsBicycle] = useState(false);
  const [isEmpty , setIsEmpty] =  useState(true);
  const [style, setStyle] = useState({ opacity: 1 });

  async function doRent() {
    if(!isRentOn){
      setIsRentOn(true);
    }
    setSelectedMarkerState(null);
    selectedMarker.setImage(selectedMarker.basicImage);
    if(isOpen){
      setIsOpen(false);
    }
    //

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
    console.log(isBicycle);
  },[selectedMarker]);

  const imageSrcBase64 = base64TempImage;
  const pinDate = "2024-09-16";
  const provider = "민국";

    return (
      <div className="content-body">
        {isEmpty
        ?<div>
          <h2>환영합니다 !</h2>
          <p>핀을 눌러 내용을 확인하시거나</p>
          <p>우측 상단 버튼을 눌러 새로운 핀을 등록하세요.</p>
        </div>
      
        :<div>
          <h2 className="content-date">{pinDate}</h2>
          <img className="content-image" src= {imageSrcBase64}/>        
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
            <p className="row-content">{provider}</p>
          </div>
        </div>
        : <div></div>
        }
     </div>
    );
}

export default BottomSheetContent;