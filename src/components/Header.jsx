import { useState } from "react"
import "../styles/component/components.css"

function Header(props){
    const [myAddress,setMyAddress] = useState("내 주소");
    return(
        <div className="header-index">
            <div className="header-content">
                {props.children}
            </div>
        </div>
    )
}
export default Header