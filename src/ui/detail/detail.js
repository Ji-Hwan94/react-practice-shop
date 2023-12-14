import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


export default function Detail({shoes}){

    let {id} = useParams();
    let detailShoes = shoes.find((param) => {
        return param.id == id;
    })
    let navigate = useNavigate();
    let [display, setDisplay] = useState(true);
    let [numChk, setNumChk] = useState(detailShoes.price);

    useEffect(() => {
        setTimeout(()=> {
            setDisplay(false);
        }, 2000);
    }, []);

    useEffect(() => {
        let numericPattern = /^\d+$/;
        if(!numericPattern.test(numChk)){
            alert("그러지 말아 주세요");
        }
    }, [numChk])

    return(
        <>
            {
                detailShoes !== undefined ? 
                    <div className="container">
                        {
                            display ? 
                                <div className="alert alert-danger">
                                    2초이내 사라지렴
                                </div>
                                : null
                        }
                        
                        <div className="row">
                            <div className="col-md-6">
                                <img src={"https://codingapple1.github.io/shop/shoes"+id+".jpg"} width="100%" />
                            </div>
                            <div className="col-md-6">
                                <h4 className="pt-5">{detailShoes.title}</h4>
                                <p>{detailShoes.content}</p>
                                <InputGroup className="sm-6">
                                    <Form.Control defaultValue={detailShoes.price} onChange={(e) => {
                                        setNumChk(e.target.value);
                                    }}/>
                                </InputGroup>
                                <p>{detailShoes.price}</p>
                                <button className="btn btn-danger">주문하기</button> 
                                <button className="btn" onClick={() => {navigate(-1)}}>뒤로가기</button> 
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