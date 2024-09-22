import { useRef, useState } from "react"
import Bottom from "../../components/Bottom"
import "../../styles/myPage/myPage.css"
import { useEffect } from "react"
import { MainApi } from "../../app/MainApi"
import { useNavigate } from "react-router-dom"
function Mypage(){

    const [memberId,setMemberId] = useState("신영재")
    const [memberImage,setMemberImage] = useState("data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABKCAYAAAA2YDPeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMuSURBVHgB7ZzRjdpAEEDHnP1PB3EJWIIP/qCCJBUk10E6OFJBjgpy6eA6iO8LCbB86cAl8A3YZCbxSugUIiGvZ8ZmnoS4E8hrP69nd2d3CYCRPM+HZVn+xD9HoIPXu7u7eZIkO2AiACYUynawSmcRrli2g01668I7INvBIr1V4R2S7WhdemvCOyjb0ar0VoR3WLajNenehfdAtqMV6V6F90i2w7t0b8J7KNvhVboX4T2W7fAmPciy7Ds05HQ6kei+yv4DXmMxGAxSaEiw3W5PYLAxAIMVE86MCWfGhDNjwpkx4cyYcGZMODMmnJkQusUuCIIdDbPr/4f4iuv3TqBdOAl+RsEvmDxKMXlU/OtLq9UqjqJoVlXVDPMdn0AxWnMpVIuXYRg+Xpuhc/LxRj3gMWJQhkbhS6zNi6apUBJPx9FW4zUJJ8H34/H4GTyC1/cZ376BkjivopdCjSDWxsS3bAKP+XQ4HBIMMQUoQIPwHcbq+aUG0QfT6bTY7/dz+PsUiaJB+H2bsh0kHZ+kjyCMtPBlG2HkEpPJJKUyQRAx4XXcXgAzdZlioUVMOMbtRcK0RPgcKpP6+CCEiHCq3XjhP0AIGlCBUC0XEe5juUET6idL5IZLCWdrKP9DCgJIxfAXEIaSYSCAhPCdRGP5lvoc2M9DQvgr6KEAZm59xucmavhNwy4cs3Yx6IE9ZcsuHAc9muYfY2BGIqQM8zyPQZj1ek3r2ftfw4nj8fgBhMHBl8gGAhHhGMffgzwic51SvZQZ7QsCIWiCmc4BBBDrFmJY+QJCSOThHWLCad2IRONJtVty6YTowKcsy8Y76K4liiL2Ms+RHmnOsix7ACbqsmYgiPjQHgdCCw7pVAaVBcJoWQjUqnQtsglVawuxIX3EBu2rr3w5dT2rqiLZYj2it6jKFpIY7C6ip7xxL2Kz2dDy5VyTbELz1u8U+8tP18zuU43GGzaiLicIN46X6MJeewovKb2wtv4Kw7A4/xC7lpQTeYeSR/g55WhU74awHzdgxmZ8mDHhzJhwZkw4MyacGRPOjAlnxoQzY8KZMeHMmHBmTDgzJpwZE86MCWfGhDPzGy0hbDN4uE5LAAAAAElFTkSuQmCC")
    const [memberPoint,setMemberPoint] = useState(0)

    const inputRef = useRef(null);
    const navigate = useNavigate()
    const onUploadImageButton = () => {
        if(inputRef.current){
            inputRef.current.click()
        }
    }


    const onUploadImage = (event) => {
        console.log(event.target)
        if (!event.target.files || event.target.files.length === 0){
            return;
        }

        const file = event.target.files[0];
        console.log(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result)
                setMemberImage(reader.result); // Base64 문자열만 저장
            };
            reader.readAsDataURL(file);
        }
    }

    const logout = () => {
        sessionStorage.clear()
        navigate("/")
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
                    setMemberImage(`url(data:image/jpeg;base64,${response.data.member_image})`)
                    setMemberPoint(response.data.member_point)
                }
            ).catch(error => {})
        }
        else{
            const parsedData = JSON.parse(sessionMemberInfo)
            console.log(parsedData)
            setMemberId(parsedData.memberId)
            setMemberImage(parsedData.memberImage)
            setMemberPoint(parsedData.memberPoint)
        }
    },[]);


    return(
        <div className="mypage-index">
            <div className="mypage-profile">
                <div className="mypage-profile__img" style={{backgroundImage:`url(${memberImage})`}} >
                    
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
                    <div className="mypage-menu__name" onClick={(event) => {onUploadImageButton()}} >
                        사진 변경
                    </div>
                    <input type="file" accept="image/*" onChange={(event) => {onUploadImage(event)}} ref={inputRef}   style={{display:"none" }}>
                    </input>

                </div>
                <div className="mypage-menu" style={{color:"red"}}>
                    <div className="mypage-menu__icon" id="logout">

                    </div>
                    <div className="mypage-menu__name" onClick={event => {logout()}}>
                        로그아웃

                    </div>

                </div>


            </div>
            <Bottom current="mypage"></Bottom>

        </div>

    )
}

export default Mypage