import { useEffect, useRef, useState } from 'react';
import '../../../styles/map/rentManager.css';

function RentManager({isRentOn, setIsRentOn}) {
  const [style, setStyle] = useState({ opacity: 1 });
  const [sec, setSec] = useState(0);
  const [min,setMin] = useState(0);
  const timeSec = useRef(0);
  const timerId = useRef(null);
  var runningTime = min + ":" + sec;

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

  useEffect(()=>{
    if(isRentOn){
      timerId.current = setInterval(() => {
        setMin(parseInt(timeSec.current/60));
        setSec(timeSec.current % 60);
        timeSec.current += 1;
      }, 1000);
    } else {
      if(timerId.current){
        clearInterval(timerId.current);
      }
    }
  },[isRentOn]);


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