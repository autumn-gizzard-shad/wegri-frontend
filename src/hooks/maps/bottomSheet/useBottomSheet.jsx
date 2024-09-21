import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";


const useBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  // header 높이를 가져오기 위한 ref
  const headerRef = useRef(null);

  const onDragEnd = () => {
    const offsetTop = headerRef.current?.getBoundingClientRect().top;
    
    var shouldClose = offsetTop > window.innerHeight * (0.9);
    if(isOpen){
      shouldClose = offsetTop > window.innerHeight * (0.4);
    } 
    

    if (shouldClose) {
      controls.start("hidden");
      setIsOpen(false);
    } else {
      controls.start("visible");
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      controls.start("hidden");
    } else if (isOpen) {
      controls.start("visible");
    }
  }, [controls, isOpen]);

  return { onDragEnd, controls, setIsOpen, isOpen, headerRef};
};

export default useBottomSheet;
