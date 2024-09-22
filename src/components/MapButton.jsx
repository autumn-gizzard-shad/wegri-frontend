import "../styles/component/components.css"
function MapButton(props){

    return(
        <div className="map-btn button" id={props.size}>
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