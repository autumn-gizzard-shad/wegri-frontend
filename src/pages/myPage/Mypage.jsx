import "../../styles/myPage/myPage.css"

function Mypage(){
    return(
        <div className="mypage-index">
            <div className="mypage-profile">
                <div className="mypage-profile__img">

                </div>
                <div className="mypage-profile__name">
                    <div className="mypage-profile__myname">
                        신영재
                    </div>
                    <div className="mypage-profile__mynamesir">
                        님
                    </div>
                </div>

            </div>
            <div className="mypage-menus">
                <div className="mypage-menu">
                    <div className="mypage-menu__icon" id="point">

                    </div>
                    <div className="mypage-menu__name">
                        포인트 교환하기
                    </div>

                </div>
                <div className="mypage-menu">
                    <div className="mypage-menu__icon" id="password">

                    </div>
                    <div className="mypage-menu__name">

                    </div>

                </div>
                <div className="mypage-menu">
                    <div className="mypage-menu__icon" id="logout">

                    </div>
                    <div className="mypage-menu__name">

                    </div>

                </div>


            </div>

        </div>

    )
}

export default Mypage