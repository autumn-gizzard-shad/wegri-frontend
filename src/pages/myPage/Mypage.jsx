import { useRef } from "react"
import Bottom from "../../components/Bottom"
import "../../styles/myPage/myPage.css"

function Mypage(){

    const inputRef = useRef(null);
    
    const onUploadImageButton = () => {
        if(inputRef.current){
            inputRef.current.click()
        }
    }

    const onUploadImage = (event) => {
        if (!event.target.files || event.target.files.length === 0){
            return;
        }

        const file = event.target.files[0];
    }
    return(
        <div className="mypage-index">
            <div className="mypage-profile">
                <div className="mypage-profile__img"  onClick={(event) => {onUploadImageButton()}}>
                    <input type="file" accept="image/*" onChange={onUploadImage} ref={inputRef}   style={{display:"none" }}>
                    </input>
                </div>
                
                <div className="mypage-profile__name">
                    <div className="mypage-profile__myname">
                        신영재
                    </div>
                    <div className="mypage-profile__mynamesir">
                        님
                    </div>
                </div>

            </div>
            <div className="mypage-menus">
                <div className="mypage-menu">
                    <div className="mypage-menu__icon" id="point">

                    </div>
                    <div className="mypage-menu__name">
                        포인트 교환하기
                    </div>

                </div>
                <div className="mypage-menu">
                    <div className="mypage-menu__icon" id="password">

                    </div>
                    <div className="mypage-menu__name">
                        비밀번호 변경
                    </div>

                </div>
                <div className="mypage-menu" style={{color:"red"}}>
                    <div className="mypage-menu__icon" id="logout">

                    </div>
                    <div className="mypage-menu__name">
                        로그아웃

                    </div>

                </div>


            </div>
            <Bottom current="mypage"></Bottom>

        </div>

    )
}

export default Mypage