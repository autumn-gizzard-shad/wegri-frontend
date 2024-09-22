import "../styles/component/components.css"
import { useNavigate } from "react-router-dom";


function MapButton(props){
    const navigate = useNavigate();
    return(
        <div 
        className="map-btn button" 
        id={props.size}
        onClick={()=>navigate("/map",
            {state: {
                "map_id" : props.content.map_id,
                }
            }
        )}>
            <div className="map-btn__content">
                <div className="map-btn__title">
                    {props.content.map_title}
                </div>
                {
                    props.size === "small" ?
                    <div className="map-btn__emoji" id="small"> {props.content.map_emoji}</div>
                    :
                    ""
                }
                <div className="map-btn__pins">
                    {props.content.pin_count}
                </div>

            </div>
            {
                props.size === "big" &&
                <div className="map-btn__content">
                    <div className="map-btn__desc">
                        {props.content.map_desc}
                    </div>
                    <div className="map-btn__emoji" id="big">
                        {props.content.map_emoji}
                    </div> 

                </div>

            }
                
        
        </div>
    );
}

export default MapButton;