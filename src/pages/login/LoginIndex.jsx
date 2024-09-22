import { useState } from "react"
import "../../styles/loginIndex/loginIndex.css"
import { BASE_URL } from "../../app/url";
import { MainApi } from "../../app/MainApi";
import { useNavigate } from "react-router-dom";

function LoginIndex(){

    const navigate = useNavigate()
    const handleRedirect = () => {
        // 원하는 외부 URL로 리다이렉트
        window.location.href = 'http://13.125.9.132:8080/api/members/kakao/login'; // 여기에 연결할 도메인을 입력하세요.
    };
    const requestLogin = async () => {
        try{
            const response = await MainApi.post(
                '/api/members/login',
                {
                    "member_id":id,
                    "password":password
                },
            )
            
            sessionStorage.setItem("accessToken",response.data.token);
            MainApi.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            navigate("/main")
        }
        catch{
            
            alert("아이디 또는 비밀번호가 잘못 되었습니다.")
        }

    }
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
                <div className="login-btn" id="login" onClick={(event) => {requestLogin()}}>
                    로그인
                </div>
                <div className="login-btn" id="kakao" onClick={handleRedirect} >
                    
                </div>
                <div className="login-register">

                </div>
            </div>

        </div>
    )
}

export default LoginIndex