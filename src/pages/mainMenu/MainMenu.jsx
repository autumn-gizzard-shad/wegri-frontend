import { useEffect, useState } from "react";
import Header from "../../components/Header"
import "../../styles/pages/mainMenu.css"
import MapButton from "../../components/MapButton";
import CommonButton from "../../components/CommonButton";
import Bottom from "../../components/Bottom";
import { useNavigate } from "react-router-dom";
import { MainApi } from "../../app/MainApi";

function MainMenu() {    
    const [mapList,setMapList] = useState([
        {
            "map_id": "1",
            "map_title": "title1",
            "map_desc": "desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 ",
            "map_emoji": "❤️",
            "pin_count": 123
        },
        {
            "map_id": "3",
            "map_title": "title2",
            "map_desc": "desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 ",
            "map_emoji": "❤️",
            "pin_count": 33
        },{
            "map_id": "4",
            "map_title": "title3",
            "map_desc": "desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 ",
            "map_emoji": "❤️",
            "pin_count": 20
        }
   ])
    const [address,setAddress] = useState("대구 북구 대현로 19길")
    const navigate = useNavigate()
    const MoreMenu = () => {
        navigate("/more",{state:{"address":address}})
    }



    useEffect(()=>{
        const sessionMapList = sessionStorage.getItem('mapList')

        if(sessionMapList === null){
            MainApi.get('/api/maps')
            .then(
                response => {
                    sessionStorage.setItem('mapList',JSON.stringify({"mapList":response.data.map_list}))
                    setMapList(response.data.map_list)
                }
            ).catch(error => {})
        }
        else{
            setMapList(JSON.parse(sessionMapList).mapList)
        }
    },[]);
    return(
        <div className="main-index">
            <Header>
                <div>{address}</div>
            </Header>
            {
                mapList.map((value,index) => (
                    
                    <MapButton content={value} size="big"></MapButton>
                ))
            }
            <CommonButton width={"320px"} height={"32px"} backgroundColor="white" >
                <div className="button-content button-more" onClick={(event) => MoreMenu()}>
                    더 보기
                </div>
            </CommonButton>
            <Bottom current="main"></Bottom>

        </div>
    );
}

export default MainMenu