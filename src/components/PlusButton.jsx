import "../styles/component/components.css"

function PlusButton(props){
    return(
        <div className= {props.type ==="plus"  ?"plus-button plus-btn" :"plus-button close-btn" }
        onClick={props.onClick}
        >

        </div>
    );
}

export default PlusButton;