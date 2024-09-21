import "../styles/component/components.css"

function CommonButton(props){

    return(
        <div className="button common-btn" style={{width:props.width,height:props.height,backgroundColor:props.backgroundColor}}>
            {props.children}
        </div>
    )
}

export default CommonButton;