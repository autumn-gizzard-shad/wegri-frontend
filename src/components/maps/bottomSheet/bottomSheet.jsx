import useBottomSheet from "../../../hooks/maps/bottomSheet/useBottomSheet";

import * as S from "./bottomSheet.style";
import Header from "./header";

const BottomSheet = ({ children, onDragEnd, controls, headerRef }) => {

  return (
    <S.Wrapper
      ref = {headerRef}
      drag="y"
      onDragEnd={onDragEnd}
      initial="hidden"
      animate={controls}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 400
      }}
      variants={{
        visible: { y: 0 },
        hidden: { y: "70%" }
      }}
      dragConstraints={{ top: 0 }}
      dragElastic={0.4}
    >
      <Header ref={headerRef}/>
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.Wrapper>
  );
};

export default BottomSheet;
