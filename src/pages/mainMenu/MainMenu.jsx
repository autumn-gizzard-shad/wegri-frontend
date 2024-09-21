import { useState } from "react";
import Header from "../../components/Header"
import "../../styles/pages/mainMenu.css"
import MapButton from "../../components/MapButton";
import CommonButton from "../../components/CommonButton";
import Bottom from "../../components/Bottom";
import { useNavigate } from "react-router-dom";

function MainMenu() {
    
    const [address,setAddress] = useState("대구 북구 대현로 19길")
    const navigate = useNavigate()
    const MoreMenu = () => {
        navigate("/more",{state:{"address":address}})
    }

    return(
        <div className="main-index">
            <Header>
                <div>{address}</div>
            </Header>
            <MapButton size="big"></MapButton>
            <MapButton size="big"> </MapButton>
            <MapButton size="big"></MapButton>
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