import { useRef, useState } from 'react';
import '../../../styles/map/kakaomap.css';
import { useNavigate } from 'react-router-dom';

function FloatingButton() {
  const [style, setStyle] = useState({ opacity: 1 });
  const navigate = useNavigate();

  function doImage() {
    navigate("/map/photo");
  }
  
  const upOpacity = () => {
    setStyle({opacity:1});
  }
  const downOpacity = () => {
    setStyle({opacity:0.5});
  }


  const FABImage = require('../../../assets/map/map_photo_button.png');

  return (
    <img className='FloatingButton' style={style}
      src={FABImage}
      onTouchStart={downOpacity}
      onTouchEnd={upOpacity}
      onClick={doImage}
    />
  );

}

export default FloatingButton;