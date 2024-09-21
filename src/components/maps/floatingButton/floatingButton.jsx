import { useRef, useState } from 'react';
import '../../../styles/map/floatingButton.css';
import { useNavigate } from 'react-router-dom';

function FloatingButton({category}) {
  const [style, setStyle] = useState({ opacity: 1 });
  const navigate = useNavigate();
  var featuredImageName = "photo";
  if(category === "bicycle"){
    featuredImageName = "register";
  }

  function doImage() {
    navigate("/map/photo", {state: {"from" : "floatingButton"}});
  }
  
  const upOpacity = () => {
    setStyle({opacity:1});
  }
  const downOpacity = () => {
    setStyle({opacity:0.5});
  }

  
  const FABImage = require('../../../assets/map/map_'+featuredImageName+'_button.png');

  return (
    <img className='floating-button' 
      style={style}
      src={FABImage}
      onTouchStart={downOpacity}
      onTouchEnd={upOpacity}
      onClick={doImage}
    />
  );

}

export default FloatingButton;