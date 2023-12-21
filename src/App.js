import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './ui/home/home'
import { createContext, lazy, useEffect, useState, Suspense } from 'react';
import data from './data';
import axios from 'axios';
import { useQuery } from 'react-query';

// 아래의 컴포넌트는 바로 랜더링 될 이유가 없기 때문에, lazy 함수를 사용해서 성능을 개선 시킨다. => Suspense를 사용해서 lazy 컴포넌트가 로딩 될때 대체 할만한 컴포넌트를 생성한다.
// import Detail from './ui/detail/detail';
// import Event from './ui/event/event';
// import Cart from './ui/cart/cart'
const Detail = lazy(() => import('./ui/detail/detail'));
const Event = lazy(() => import('./ui/event/event'));
const Cart = lazy(() => import('./ui/cart/cart'));

// context api
// 안쓰는 이유 
// 1. context를 사용하지 않는 컴포넌트도 재랜더링이 된다.
// 2. 자식컴포넌트를 재사용성을 힘들게 해준다. => redux를 사용함
export let Context1 = createContext();

function App() {

  let navigate = useNavigate();
  let [shoes] = useState(data);
  let [재고] = useState([10, 11, 12]);

  // 실시간 데이터를 가져옴 useQuery
  let result = useQuery("getUser", () => 
    axios.get("https://codingapple1.github.io/userdata.json")
    .then((a)=> {
      return a.data;
    }), {staleTime : 2000} // 2초 이내로 화면에 다시 들어가면 axios 안탐
  )

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, [])
  
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick={() => {navigate("/")}}>Home</Nav.Link>
                <Nav.Link onClick={() => {navigate("/detail")}}>Detail</Nav.Link>
                <Nav.Link onClick={() => {navigate("/event")}}>Event</Nav.Link>
                <Nav.Link onClick={() => {navigate("/cart")}}>Cart</Nav.Link>
            </Nav>
            <Nav className='dataName'>
              {
                result.isLoading ? "로딩 중" : result.data.name
              }
            </Nav>
          </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={ <Home shoes={shoes}></Home> }/>
        <Route path='/detail/:id' 
          element={
            <Suspense fallback={<>loading</>}>
              <Context1.Provider value={{ 재고, shoes }}>
                <Detail shoes={shoes}></Detail> 
              </Context1.Provider>
            </Suspense>
          }
        />
        <Route path='/event' element={ 
          <Suspense fallback={<>loading</>}>
            <Event></Event> 
          </Suspense>
        }>
          <Route path='one' element={<>첫 주문시 양배추즙 서비스</> } />
          <Route path='two' element={<>생일기념 쿠폰 받기</>} />
        </Route>
        <Route path='/cart' element={
          <Suspense fallback={<>loading</>}>
            <Cart></Cart>
          </Suspense>
        }>

        </Route>
        <Route path='*' element={ <>없는 페이지</> }/>
      </Routes>
    </div>
  );
}

export default App;
