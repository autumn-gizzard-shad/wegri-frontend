import { useRef, useState } from 'react';
import '../../../styles/map/kakaomap.css';
import { useNavigate } from 'react-router-dom';

function FloatingButton({category}) {
  const [style, setStyle] = useState({ opacity: 1 });
  const navigate = useNavigate();
  var featuredImageName;
  if(category == "bicycle"){
    
  }
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
    <img className='floating-button' style={style}
      src={FABImage}
      onTouchStart={downOpacity}
      onTouchEnd={upOpacity}
      onClick={doImage}
    />
  );

}

export default FloatingButton;