import { useLocation, useNavigate } from "react-router-dom"
import Bottom from "../../components/Bottom"
import Header from "../../components/Header"
import MapButton from "../../components/MapButton"
import PlusButton from "../../components/PlusButton"
import "../../styles/pages/moreMenu.css"
import { useEffect, useState } from "react"
import Modal from "../../components/Modal"
import CommonButton from "../../components/CommonButton"
function MoreMenu(props){

    const location = useLocation();
    const navigate = useNavigate();
    const [plusBtn,setPlusBtn] = useState("plus");
    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => {
        if(modalOpen === true){
            setPlusBtn("plus");
            setModalOpen(false);
        }
        else if (modalOpen === false){
            setPlusBtn("close");
            setModalOpen(true);

        }
    }
    const address = location.state.address;
    return(
        
        <div className="more-index">
            <Header>
                <div>{address}</div>
            </Header>
            <div className="more-menu__top">
                <div className="more-menu__back-button" onClick={(event)=>{navigate(-1)}}>
                    &lt;
                </div>
                <div className="more-menu__desc">
                모두가 새로운 지도를 <br></br>만들 수 있어요!

                </div>

            </div>
            <MapButton size="small"></MapButton>
            <MapButton size="small"></MapButton>
            <MapButton size="small"></MapButton>
            <MapButton size="small"></MapButton>
            <MapButton size="small"></MapButton>
            <MapButton size="small"></MapButton>
            <MapButton size="small"></MapButton>
            <MapButton size="small"></MapButton> 
            <MapButton size="small"></MapButton>
            <PlusButton type={plusBtn} onClick={(event)=>openModal()}></PlusButton>
            {
                modalOpen ?
                <Modal>
                    
                    <div className="modal-top">
                        <div className="modal-title">
                            제목
                        </div>
                        <div className="modal-title__input">
                            <input className="modal-title__input-text">

                            </input>
                            <div className="modal-title__input-emoji">

                            </div>

                        </div>

                    </div>
                    <div className="modal-content">
                        <div className="modal-content__desc">
                            자세한 설명
                        </div>
                        <input className="modal-content__input-text">

                        </input>

                    </div>
                    <CommonButton backgroundColor="#6DC553" width="84%" >
                        <div>                              
                            작성 완료
                        </div>
                    </CommonButton>

                       
                </Modal>
                :          
                ""

            }
            
            <Bottom current="main"></Bottom>
        
        </div>
    )
}

export default MoreMenu