import "../styles/component/components.css"
function MapButton(props){

    return(
        <div className="map-btn button" id={props.size}>
            <div className="map-btn__content">
                <div className="map-btn__title">
                    title
                </div>
                {
                    props.size === "small" ?
                    <div className="map-btn__emoji" id="small"> 🚲</div>
                    :
                    ""
                }
                <div className="map-btn__pins">
                    pins
                </div>

            </div>
            {
                props.size === "big" ?
                <div className="map-btn__content">
                    <div className="map-btn__desc">
                        desc desc desc desc desc desc
                    </div>
                    <div className="map-btn__emoji" id="big">
                        🚲
                    </div> 

                </div>
                :
                ""

            }
                
        
        </div>
    );
}

export default MapButton;