import base64TempImage from "./temp";
import '../../../styles/map/bottomSheet.css';
import { useEffect, useState } from "react";

function BottomSheetContent({category, selectedMarker}) {
  const [isBicycle, setIsBicycle] = useState(false);
  const [isEmpty , setIsEmpty] =  useState(true);

  useEffect(() => {
    if(category == "bicycle"){
      setIsBicycle(true);
    }
    if(selectedMarker==null){
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
          <p>핀을 눌러 자세한 내용을 확인하세요.</p>
        </div>
      
        :<div>
          <h2 className="content-date">{pinDate}</h2>
          <img className="content-image" src= {imageSrcBase64}/>        
        </div>
          }
        {!isEmpty && isBicycle
        ?<div>
          <button className="rent-button">
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