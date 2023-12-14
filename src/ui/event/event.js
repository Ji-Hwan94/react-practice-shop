import { Outlet } from 'react-router-dom';

export default function Event(){
    return (
        <>
            <h3>오늘의 이벤트</h3>
            <Outlet></Outlet>
        </>
    )
}