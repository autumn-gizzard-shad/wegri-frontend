import { useNavigate } from "react-router-dom";
import "../styles/component/components.css"
function Bottom(props){

    const navigate = useNavigate()

    const LikedMenu = () => {
        navigate("/liked")
    }
    return(
        <div className="bottom-index">
            <div className="bottom-btn"  id="current">
                <div className="bottom-btn__img home"  id="current">

                </div>
                <div className="bottom-btn__name" >
                    홈
                </div>
            </div>
            <div className="bottom-btn" onClick={(event) => {LikedMenu()}} >
                <div className="bottom-btn__img heart">

                </div>
                <div className="bottom-btn__name">
                    좋아요
                </div>
                    
            </div>
            <div className="bottom-btn" >
                <div className="bottom-btn__img myPage">
                    
                </div>
                <div className="bottom-btn__name">
                    마이페이지
                </div>
                    
            </div>
        </div>
    )
}

export default Bottom;