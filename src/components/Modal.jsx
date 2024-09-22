import "../styles/component/components.css"
function Modal(props){

    return(
        <div className="modal-background" >
            <div className="modal-index">
                {props.children}
            </div>

        </div>
    );

}


export default Modal;
