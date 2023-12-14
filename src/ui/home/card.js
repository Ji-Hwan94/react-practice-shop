import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

export default function Card({obj, i}){
  let navigate = useNavigate();
    return (
      <Col key={i}>
        <img src={"https://codingapple1.github.io/shop/shoes"+(i+1)+".jpg"} className='list-img' onClick={() => { navigate("/detail/"+(i+1)) }}/>
        <h4>{obj.title}</h4>
        <p>{obj.price}</p> 
      </Col>
    )
}