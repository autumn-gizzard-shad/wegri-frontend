import { useState , useEffect } from "react"
import Header from "../../components/Header"
import "../../styles/myPage/pointExchange.css"
import CommonButton from "../../components/CommonButton"
import Bottom from "../../components/Bottom"
import { useNavigate } from "react-router-dom"
import { MainApi } from "../../app/MainApi"

function PointExchange(props){


    const [currentPoint,setCurrentPoint] = useState(1)
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
        ]);
    
    useEffect(()=>{
        const memberInfo = sessionStorage.getItem("memberInfo")
        console.log(memberInfo);
        if(memberInfo !== null){
            const json = JSON.parse(memberInfo)
            setCurrentPoint(json.memberPoint)
        }

        const productInfo = sessionStorage.getItem("productInfo")
        if(productInfo !== null){
            const json = JSON.parse(productInfo)
            setProductList(json)
        }
        else{
            MainApi.get("/api/products")
            .then(response => {
                sessionStorage.setItem("productInfo",JSON.stringify(response.data) )
                console.log(response.data)
                setProductList(response.data)
            }).catch(error => {})
        }

    },[])

    async function exchangePoint(product_id, product_price) {
      if(currentPoint < product_price){
        // 돈없음
        return
      } else {
        MainApi.post("/api/products",
          {
            "product_id" : product_id
          }
        )
        .then(response => {
          setCurrentPoint(currentPoint-product_price);
        }).catch(error => {
            console.error(error);
        })  
      }


    }
    
    return(
        <div className="point-exchange">
            <Header>
                <div className="point-header__title">
                    포인트 교환소
                </div>
                <div className="point-header__current-point">
                    <div className="point-icon">
                        
                    </div>
                    <div>
                        {currentPoint}
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
                                    <div className="point-icon" style={{position:"unset"}}>
                            
                                    </div>
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
                                        <div 
                                        className="product-content__button"  
                                        onClick={()=>exchangePoint(value.product_id,value.product_price)}
                                        >
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