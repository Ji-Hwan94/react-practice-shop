import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Nav } from "react-bootstrap";
import { Context1 } from "../../App.js"
import { useDispatch } from "react-redux";
import { addCart } from "../../store.js";


export default function Detail({shoes}){

    // let {재고} = useContext(Context1);
    
    let {id} = useParams();
    let detailShoes = shoes.find((param) => {
        return param.id == id;
    })
    let navigate = useNavigate();
    let [display, setDisplay] = useState(true);
    let [numChk, setNumChk] = useState(detailShoes.price);
    let [tab, setTab] = useState(0);
    let dispatch = useDispatch();
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
    }, [numChk]);

    let [fade, setFade] = useState("");
    useEffect(() => {
        setFade("end")
        return () => {
            setFade("");
        }
    }, [tab]);

    useEffect(() => {
        let localList = JSON.parse(localStorage.getItem("watched"));
        localList.push(detailShoes.id);
        localList = [...new Set(localList)];
        localStorage.setItem("watched", JSON.stringify(localList));
    }, []);

    return(
        <div className={`start ${fade}`}>
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
                                <img src={"https://codingapple1.github.io/shop/shoes"+id+".jpg"} width="100%" alt=""/>
                            </div>
                            <div className="col-md-6">
                                <h4 className="pt-5">{detailShoes.title}</h4>
                                <p>{detailShoes.content}</p>
                                <InputGroup className="sm-6">
                                    <Form.Control defaultValue={numChk} onChange={(e) => {
                                        setNumChk(e.target.value);
                                    }}/>
                                </InputGroup>
                                <p>{detailShoes.price}</p>
                                <button className="btn btn-danger" onClick={() => {
                                    dispatch(addCart(detailShoes));
                                }}>주문하기</button> 
                                <button className="btn" onClick={() => {navigate(-1)}}>뒤로가기</button> 
                            </div>
                        </div>
                        <Nav variant="tabs" defaultActiveKey="link0">
                            <Nav.Item>
                                <Nav.Link eventKey="link0" onClick={ () => setTab(0)}>버튼0</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link1" onClick={ () => setTab(1)}>버튼1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link2" onClick={ () => setTab(2)}>버튼2</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <TabContent tab={tab}></TabContent>
                    </div>
                : 
                    <div className="container">
                        없는 건디요
                    </div>
            }
        </div>
    )
}

function TabContent({tab}){
    let [fade, setFade] = useState("");
    let {재고} = useContext(Context1);
    useEffect(() => {
        let a = setTimeout(() => {
            setFade("end")
        }, 100)
        return () => {
            clearTimeout(a);
            setFade("");
        }
    }, [tab])
    return  (
                <div className={`start ${fade}` }>
                    {[<div>{재고}</div>, <div>내용2</div>, <div>내용3</div>][tab]}
                </div>
            )
}