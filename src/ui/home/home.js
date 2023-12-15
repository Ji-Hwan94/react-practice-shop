import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from './card'
import axios from 'axios';
import { useState } from 'react';

export default function Home({shoes}){
    let [shoesData, setShoesData] = useState(shoes);
    let [clickCnt, setClickCnt] = useState(0);
    return (
        <>
            <div className='main-bg'></div>
            <Container>
                <Row>
                {
                    shoesData.map((obj, i) => {
                    return (
                            <Card obj={obj} i={i} key={i}/>
                        );
                    })
                }
                </Row>
                <button onClick={(e) => {   
                    setClickCnt(++clickCnt);
                    if(clickCnt == 1){
                        axios.get("https://codingapple1.github.io/shop/data2.json")
                        .then((result) => {
                            setShoesData(shoesData.concat([...result.data]));
                        })
                        .catch(() => {
                            console.log("실패함 ㅅㄱ")
                        })
                    } else if (clickCnt == 2){
                        axios.get("https://codingapple1.github.io/shop/data3.json")
                        .then((result) => {
                            setShoesData(shoesData.concat([...result.data]));
                        })
                        .catch(() => {
                            console.log("실패함 ㅅㄱ")
                        })
                    } else {
                        alert("상품 없음");
                    }

                }}>더보기</button>
            </Container>    
        </>
    )
}