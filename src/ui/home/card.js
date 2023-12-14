import Col from 'react-bootstrap/Col';

export default function Card({obj, i}){
    return (
      <Col key={i}>
        <img src={"https://codingapple1.github.io/shop/shoes"+(i+1)+".jpg"} className='list-img'/>
        <h4>{obj.title}</h4>
        <p>{obj.price}</p> 
      </Col>
    )
}