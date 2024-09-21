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
    console.log(selectedMarker);
  },[selectedMarker]);

  const imageSrcBase64 = base64TempImage;
  const pinDate = "2024-09-16";

    return (
      <div className="contentBody">
        {isEmpty
        ?<div>
          <h1>환영합니다 !</h1>
          <p>핀을 눌러 자세한 내용을 확인하세요.</p>
        </div>
      
        :<div>
          <h1 className="contentDate">{pinDate}</h1>
          <img className="contentImage" src= {imageSrcBase64}/>        
        </div>
          }
        {!isEmpty && isBicycle
        ?<div>
          
          <p>hkkhak</p>
          <h1>gkaewofjwei</h1>
        </div>
        : <div></div>
        }
     </div>
    );
}

export default BottomSheetContent;