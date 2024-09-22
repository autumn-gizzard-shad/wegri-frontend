import { useLocation, useNavigate } from "react-router-dom"
import Bottom from "../../components/Bottom"
import Header from "../../components/Header"
import MapButton from "../../components/MapButton"
import PlusButton from "../../components/PlusButton"
import "../../styles/pages/moreMenu.css"
import { useEffect, useState } from "react"
import Modal from "../../components/Modal"
import CommonButton from "../../components/CommonButton"
import { MainApi } from "../../app/MainApi"
import EmojiPicker from "emoji-picker-react"
function MoreMenu(props){
    const [mapList,setMapList] = useState([
        {
            "map_id": "1",
            "map_title": "title1",
            "map_desc": "desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 desc1 ",
            "map_emoji": "❤️",
            "pin_count": 123
        },
        {
            "map_id": "3",
            "map_title": "title2",
            "map_desc": "desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 desc2 ",
            "map_emoji": "❤️",
            "pin_count": 33
        },{
            "map_id": "4",
            "map_title": "title3",
            "map_desc": "desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 desc3 ",
            "map_emoji": "❤️",
            "pin_count": 20
        }
   ])

    const location = useLocation();
    const navigate = useNavigate();
    const [plusBtn,setPlusBtn] = useState("plus");
    const [modalOpen, setModalOpen] = useState(false);
    const [emojiOpen, setEmojiOpen ] = useState(false)
    const [pickedEmoji,setPickedEmoji] = useState("");
    const [modalTitle,setModalTitle] = useState("")
    const [modalDesc, setModalDesc] = useState("")
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
    const onEmojiClick = (emoji) =>{
        setEmojiOpen(false)
        setPickedEmoji(emoji.emoji)
    }
    const postNewMap = () => {
        
        
        MainApi.post("/api/maps",{
            "map_title": modalTitle,
            "map_desc": modalDesc,
            "map_emoji": pickedEmoji
        }).then((response) => {
            setModalOpen(false)
        }).catch((error) => {
            alert("post error")
            console.log(MainApi.defaults)
        })
    }

    useEffect(()=>{
        const sessionMapList = sessionStorage.getItem('moreList')

        if(sessionMapList === null){
            MainApi.get('/api/maps/more')
            .then(
                response => {
                    sessionStorage.setItem('moreList',response.data.map_list)
                    setMapList(response.data.map_list)
                }
            ).catch(error => {})
        }
        else{
            setMapList(sessionMapList)
        }
    },[]);

    useEffect(()=>{
        setModalDesc("")
        setModalTitle("")
        setPickedEmoji("")
    },[modalOpen])
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
            {
                mapList.map((value,index) => (
                    
                    <MapButton content={value} size="small"></MapButton>
                ))
            }
            
            <PlusButton type={plusBtn} onClick={(event)=>openModal()}></PlusButton>
            {
                modalOpen &&
                <Modal>
                    
                    <div className="modal-top">
                        <div className="modal-title">
                            제목
                        </div>
                        <div className="modal-title__input">
                            <input className="modal-title__input-text" onChange={(event) => {setModalTitle(event.target.value)}} value={modalTitle}>

                            </input>
                            <div className="modal-title__input-emoji" onClick={() => {setEmojiOpen(true)}}>
                                {pickedEmoji}
                            </div>
                            

                        </div>
                        
                    </div>
                    { emojiOpen && <EmojiPicker className="emoji-picker" onEmojiClick={(emoji) =>{onEmojiClick(emoji)}} style={{zIndex:10,position:"absolute"}}></EmojiPicker>}
                    <div className="modal-content">
                        <div className="modal-content__desc">
                            자세한 설명
                        </div>
                        <textarea className="modal-content__input-text" onChange={event => {setModalDesc(event.target.value)}} value={modalDesc}maxLength={100} >

                        </textarea>

                    </div>
                    <div className="modal-content__complete" onClick={(event) => {postNewMap()}}>
                        <CommonButton backgroundColor="#6DC553" width="84%" >
                            <div>                              
                                작성 완료
                            </div>
                        </CommonButton>
                    </div>
                    

                       
                </Modal>
              

            }
            
            <Bottom current="main"></Bottom>
        
        </div>
    )
}

export default MoreMenu