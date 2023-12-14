import { useParams } from "react-router-dom"

export default function Detail({shoes}){

    let {id} = useParams();
    let detailShoes = shoes.find((param) => {
        return param.id == id;
    })
    return(
        <>
            {
                detailShoes !== undefined ? 
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={"https://codingapple1.github.io/shop/shoes"+id+".jpg"} width="100%" />
                        </div>
                        <div className="col-md-6">
                            <h4 className="pt-5">{detailShoes.title}</h4>
                            <p>{detailShoes.content}</p>
                            <p>{detailShoes.price}</p>
                            <button className="btn btn-danger">주문하기</button> 
                        </div>
                    </div>
                </div> 
                : 
                <div className="container">
                    없는 건디요
                </div>
            }
        </>
    )
}