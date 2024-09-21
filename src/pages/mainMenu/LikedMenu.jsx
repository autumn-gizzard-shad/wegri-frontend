import "../../styles/pages/mainMenu.css"
import Header from "../../components/Header"
import MapButton from "../../components/MapButton"
import Bottom from "../../components/Bottom"

function LikedMenu(props){
    
    
    const address = "address"
    return(
        <div className="more-index">
            <Header>
                <div>{address}</div>
            </Header>
            <MapButton size="big"></MapButton>
            <MapButton size="big"> </MapButton>
            <MapButton size="big"></MapButton>
            <MapButton size="small"></MapButton>
            <MapButton size="small"></MapButton>
            <MapButton size="small"></MapButton> 
            <MapButton size="small"></MapButton>
            <Bottom current="liked"></Bottom>
        </div>
    )

}
export default LikedMenu