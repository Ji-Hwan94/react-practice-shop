import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";


export default function Cart(){

    // store에 있는 state를 가져옴
    let cart = useSelector((state) => {return state.cart});
    return (
        <>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
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
                                    <td>안녕</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </>
    )
}