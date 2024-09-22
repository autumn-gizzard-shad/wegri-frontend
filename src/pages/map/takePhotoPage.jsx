import { useEffect, useRef, useState } from "react";
import '../../styles/map/takePhoto.css';
import { useNavigate, useLocation } from "react-router-dom";
import { dateCalc } from "../../utils/calculator";
import { fetchSavePins } from "../../app/map_api/pinApi";
function TakePhotoPage () {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // returnButton( from rentManager ) or floatingButton ( from floatingButton )
  const fromWhere = location.state.from;
  const category = location.state.category;
  const map_id = location.state.map_id;

  function pauseVideo () {
    videoRef.current.pause();
  }

  async function saveImage() {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const context = canvas.getContext('2d');
    if( context != null ){
      context.drawImage(videoRef.current, 0, 0);
    }

    const dataURL = canvas.toDataURL('image/jpeg');
    return dataURL;
  }
  
  async function getCurrentCoords () {
    if(navigator.geolocation){
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        lat : pos.coords.latitude,
        lng : pos.coords.longitude
      };
    } else {
      return {
        lat : 37.402707,
        lng : 126.922044
      };
    }
  }

  async function takePhoto () { 
    const date = dateCalc();

    // 1. pause
    pauseVideo();

    // 2. save It
    const image = await saveImage();

    // 3. get current location
    const coords = await getCurrentCoords();
    // TODO: 4. fetch
    await fetchSavePins(category,fromWhere,date,image,coords,map_id);
    // 5. pop
    navigate(-1);
  }

  useEffect(() => {
    navigator.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if(navigator.getUserMedia){
      navigator.mediaDevices.getUserMedia({
        video : {
          facingMode:"environment",
        },
        audio: false
      }).then(stream => {
        if( videoRef && videoRef.current){
          streamRef.current = stream;
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }).catch(error => {
        console.error("something wrong with getting VIDEO" , error);
      });
    }

    return () => {
      if(streamRef.current){
        streamRef.current.getTracks().forEach((track)=>track.stop());
      }
    }
  },[]);

  return (
    <div>
      <div>
        <video
          className ="camera-area"
          ref={videoRef}
          autoPlay
          muted
          playsInline
        />
      </div>
      <div
        className="button-area"
      >
        <button
          className="photo-button"
          onClick={takePhoto}
        >
        </button>
      </div>
    </div>
  );

}

export default TakePhotoPage;