import { useState } from "react"
import Header from "../../components/Header"
import "../../styles/myPage/pointExchange.css"
import CommonButton from "../../components/CommonButton"
import Bottom from "../../components/Bottom"
import { useNavigate } from "react-router-dom"
function PointExchange(props){

    
    const navigate = useNavigate()
    const [productList,setProductList] = useState(
        [
            {
                "product_id": 1,
                "product_name": "product 1",
                "product_image": "string",
                "product_desc": "desc 1",
                "product_price": 1000
            },
            {
                "product_id": 2,
                "product_name": "product 1",
                "product_image": "string",
                "product_desc": "desc 1",
                "product_price": 1000
            },
            {
                "product_id": 3,
                "product_name": "product 1",
                "product_image": "string",
                "product_desc": "desc 1",
                "product_price": 1000
            }
        ])

    return(
        <div className="point-exchange">
            <Header>
                <div className="point-header__title">
                    포인트 교환소
                </div>
                <div className="point-header__current-point">
                    <div className="point-icon">
                        {props.currentPoint}
                    </div>

                </div>
            </Header>
            
            
            <div className="product-contents">
                <div className="product-goback" onClick={(event) => {navigate(-1)}}>
                    &lt;&lt; 뒤로 가기
                </div>
                {
                    productList.map((value,element) => (
                        <div className="product-content">
                            <div className="product-top">
                                <div className="product-content__title">
                                    {value.product_name}
                                </div>
                                <div className="product-content__price">
                                    {value.product_price}
                                </div>

                            </div>
                            <div className="product-content__body">
                                <div className="product-content__img">
                                    {value.product_image}
                                </div>
                                <div className="product-content__desc">
                                    <div className="product-content__desc-text">
                                        {value.product_desc}

                                    </div>
                                    
                                    
                                    <CommonButton width="82px" height="14px" backgroundColor="#6DC553">
                                        <div className="product-content__button"  >
                                            교환하기
                                        </div>
                                    </CommonButton>
                                    

                                </div>
                                

                            </div>
                            

                        </div> 
                    ))
                        
                
                }

            </div>
            <Bottom current="mypage"></Bottom>
            
            
            

            

        </div>
    )

}

export default PointExchange