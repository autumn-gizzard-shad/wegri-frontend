import { useState } from 'react';
import '../../../styles/map/rentManager.css';

function RentManager({isRentOn, setIsRentOn}) {
  const [style, setStyle] = useState({ opacity: 1 });
  var runningTime = "00:33:32";

  function doReturn() {
    if(isRentOn){
      setIsRentOn(false);
    }
  }

  const upOpacity = () => {
    setStyle({opacity:1});
  }
  const downOpacity = () => {
    setStyle({opacity:0.5});
  }

  return (
    <div
      className="rent-manager-box"
    >
      <span
        className="rent-time"
      >{runningTime}</span>
      <button
        className="rent-return-button"
        style={style}
        onTouchStart={downOpacity}
        onTouchEnd={upOpacity}
        onClick={doReturn}

      >
        <p>반납하기</p>
      </button>
    </div>  
  );
}

export default RentManager;