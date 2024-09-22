import { useRef, useState } from "react"
import Bottom from "../../components/Bottom"
import "../../styles/myPage/myPage.css"
import { useEffect } from "react"
import { MainApi } from "../../app/MainApi"
import { useNavigate } from "react-router-dom"
function Mypage(){

    const [memberId,setMemberId] = useState("신영재")
    const [memberImage,setMemberImage] = useState("")
    const [memberPoint,setMemberPoint] = useState(0)

    const inputRef = useRef(null);
    const navigate = useNavigate()
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

    useEffect(()=>{
        const sessionMemberInfo = sessionStorage.getItem('memberInfo')
        console.log(sessionMemberInfo)
        if(sessionMemberInfo === null){
            MainApi.get('/api/members')
            .then(
                response => {
                    sessionStorage.setItem('memberInfo',JSON.stringify({"memberId" : response.data.member_id , "memberImage" : response.data.member_image, "memberPoint" : response.data.member_point}) )
                    setMemberId(response.data.member_id)
                    setMemberImage(response.data.member_image)
                    setMemberPoint(response.data.member_point)
                }
            ).catch(error => {})
        }
        else{
            const parsedData = JSON.parse(sessionMemberInfo)
            setMemberId(parsedData.memberId)
            setMemberImage(parsedData.memberImage)
            setMemberPoint(parsedData.memberPoint)
        }
    },[]);


    return(
        <div className="mypage-index">
            <div className="mypage-profile">
                <div className="mypage-profile__img"  onClick={(event) => {onUploadImageButton()}}>
                    <input type="file" accept="image/*" onChange={onUploadImage} ref={inputRef}   style={{display:"none" }}>
                    </input>
                </div>
                
                <div className="mypage-profile__name">
                    <div className="mypage-profile__myname">
                        {memberId}
                    </div>
                    <div className="mypage-profile__mynamesir">
                        님
                    </div>
                </div>

            </div>
            <div className="mypage-menus">
                <div className="mypage-menu" onClick={(event) => {navigate("/point")}}>
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