import "../../styles/pages/mainMenu.css"
import Header from "../../components/Header"
import MapButton from "../../components/MapButton"
import Bottom from "../../components/Bottom"
import { useEffect, useState } from "react"
import { MainApi } from "../../app/MainApi"
function LikedMenu(props){
    const [mapList,setMapList] = useState([
        {
            "map_id": "1",
            "map_title": "title1",
            "map_desc": "desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 ",
            "map_emoji": "string",
            "pin_count": 123
        },
        {
            "map_id": "3",
            "map_title": "title2",
            "map_desc": "desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 ",
            "map_emoji": "string",
            "pin_count": 33
        },{
            "map_id": "4",
            "map_title": "title3",
            "map_desc": "desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 ",
            "map_emoji": "string",
            "pin_count": 20
        },
        {
            "map_id": "4",
            "map_title": "title4",
            "map_desc": "desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 ",
            "map_emoji": "string",
            "pin_count": 10
        },
        {
            "map_id": "22",
            "map_title": "title5",
            "map_desc": "desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 ",
            "map_emoji": "string",
            "pin_count": 9
        }
    ])

    useEffect(()=>{
        const sessionMapList = sessionStorage.getItem('LikedList')
        if(sessionMapList === null){
            MainApi.get('/api/members/favorites')
            .then(
                response => {
                    sessionStorage.setItem('LikedList',response.data.map_list)
                    setMapList(response.data.map_list)
                }
            ).catch(error => {})
        }
        else{
            setMapList(sessionMapList)
        }
    },[]);


    
    const address = "address"
    return(
        <div className="more-index">
            <Header>
                <div>{address}</div>
            </Header>
            {
                mapList.map((value,index) => (
                    <MapButton content={value} size={index <3 ? "big":"small"}></MapButton>
                ))
            }
            <Bottom current="liked"></Bottom>
        </div>
    )

}
export default LikedMenu