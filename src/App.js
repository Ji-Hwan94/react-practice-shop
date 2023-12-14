import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import Home from './ui/home/home'
import Detail from './ui/detail/detail';
import Event from './ui/event/event';
import { useState } from 'react';
import data from './data';

function App() {

  let navigate = useNavigate();
  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link onClick={() => {navigate("/")}}>Home</Nav.Link>
                <Nav.Link onClick={() => {navigate("/detail")}}>Detail</Nav.Link>
                <Nav.Link onClick={() => {navigate("/event")}}>Event</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={ <Home shoes={shoes}></Home> }/>
        <Route path='/detail/:id' element={ <Detail shoes={shoes}></Detail> }/>
        <Route path='/event' element={ <Event></Event> }>
          <Route path='one' element={<>첫 주문시 양배추즙 서비스</> } />
          <Route path='two' element={<>생일기념 쿠폰 받기</>} />
        </Route>
        <Route path='*' element={ <>없는 페이지</> }/>
      </Routes>
    </div>
  );
}

export default App;
