import { useState } from "react"
import "../../styles/loginIndex/loginIndex.css"

function LoginIndex(){
    const [id,setId] = useState("");
    const [password,setPassWord] = useState("");
    const inputType = (event,type) => {
        if(type === "id"){
            setId(event.target.value)
        }
        if(type ==="password"){
            setPassWord(event.target.value)
        }
    }

    return(
        <div className="login-index">
            <div className="login-logo__div">
                <div className="login-logo" ></div>
            </div>
            <div className="login-main">
                <input className="login-input id" value={id} placeholder="아이디"   onChange={(event) => inputType(event,"id")} >
                    
                </input>
                <input className="login-input password" value={password} placeholder="비밀번호" type="password" onChange={(event) => inputType(event,"password")}>

                </input>
                <div className="login-btn" id="login">
                    로그인
                </div>
                <div className="login-btn" id="kakao">
                    
                </div>
                <div className="login-register">

                </div>
            </div>

        </div>
    )
}

export default LoginIndex