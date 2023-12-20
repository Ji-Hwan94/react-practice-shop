import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeAge } from "../../store/userSlice";
import { increment, deleteCart } from "../../store";


export default function Cart(){

    // store에 있는 state를 가져옴
    let cart = useSelector((state) => {return state.cart});
    let name = useSelector((state) => {return state.user});

    // store에 요청을 보냄
    let dispatch = useDispatch();

    return (
        <>
            <h6>{name.name}의 장바구니, 나이 {name.age}</h6>
            <button onClick={() => {
                dispatch(changeAge(10));
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    <th>주문취소</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map((obj, i) => {
                            return (
                                <tr key={i}>
                                    <td>{obj.id}</td>
                                    <td>{obj.name}</td>
                                    <td>{obj.count}</td>
                                    <td>
                                        <button onClick={()=>{
                                            dispatch(increment(obj.id));
                                        }}>+</button>
                                    </td>
                                    <td>
                                        <button onClick={()=>{
                                            console.log(obj.id)
                                            dispatch(deleteCart(obj.id));
                                        }}>x</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </>
    )
}