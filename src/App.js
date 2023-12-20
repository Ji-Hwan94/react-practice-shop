import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import Home from './ui/home/home'
import Detail from './ui/detail/detail';
import Event from './ui/event/event';
import Cart from './ui/cart/cart'
import { createContext, useEffect, useState } from 'react';
import data from './data';

// context api
// 안쓰는 이유 
// 1. context를 사용하지 않는 컴포넌트도 재랜더링이 된다.
// 2. 자식컴포넌트를 재사용성을 힘들게 해준다. => redux를 사용함
export let Context1 = createContext();

function App() {

  let navigate = useNavigate();
  let [shoes] = useState(data);
  let [재고] = useState([10, 11, 12]);
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, [])
  
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick={() => {navigate("/")}}>Home</Nav.Link>
                <Nav.Link onClick={() => {navigate("/detail")}}>Detail</Nav.Link>
                <Nav.Link onClick={() => {navigate("/event")}}>Event</Nav.Link>
                <Nav.Link onClick={() => {navigate("/cart")}}>Cart</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={ <Home shoes={shoes}></Home> }/>
        <Route path='/detail/:id' 
          element={
            <Context1.Provider value={{ 재고, shoes }}>
              <Detail shoes={shoes}></Detail> 
            </Context1.Provider>
          }
        />
        <Route path='/event' element={ <Event></Event> }>
          <Route path='one' element={<>첫 주문시 양배추즙 서비스</> } />
          <Route path='two' element={<>생일기념 쿠폰 받기</>} />
        </Route>
        <Route path='/cart' element={<Cart></Cart>}>

        </Route>
        <Route path='*' element={ <>없는 페이지</> }/>
      </Routes>
    </div>
  );
}

export default App;
