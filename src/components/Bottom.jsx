import { useNavigate } from "react-router-dom";
import "../styles/component/components.css"
import Mypage from "../pages/myPage/Mypage";
function Bottom(props){

    const navigate = useNavigate()

    const MainMenu = () => {
        if(props.current !== "main"){
            navigate("/main")
        }
        
    }
    const LikedMenu = () => {
        if(props.current !== "liked"){
            navigate("/liked")
        }
        
    }

    const MyPage = () => {
        if(props.current !== "mypage"){
            navigate("/mypage")
        }
        
    }
    return(
        <div className="bottom-index">
            <div className="bottom-btn" onClick={(event) => {MainMenu()}} id={props.current === "main" ?"current" : ""} >
                <div className="bottom-btn__img home"  id={props.current === "main" ?"current" : ""}>

                </div>
                <div className="bottom-btn__name" >
                    홈
                </div>
            </div>
            <div className="bottom-btn" onClick={(event) => {LikedMenu()}} id={props.current === "liked" ?"current" : ""} >
                <div className="bottom-btn__img heart" id={props.current === "liked" ?"current" : ""}>

                </div>
                <div className="bottom-btn__name" >
                    좋아요
                </div>
                    
            </div>
            <div className="bottom-btn" onClick={(event) => {MyPage()}} id={props.current === "mypage" ?"current" : ""}>
                <div className="bottom-btn__img myPage" id={props.current === "mypage" ?"current" : ""}>
                    
                </div>
                <div className="bottom-btn__name">
                    마이페이지
                </div>
                    
            </div>
        </div>
    )
}

export default Bottom;