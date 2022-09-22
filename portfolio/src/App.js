import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Homepage from './pages/Homepage';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.body.style.backgroundColor = 'black';
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand as={Link} to='/'>My page</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#features">Portfolio</Nav.Link>
                <Nav.Link href="#pricing">Contact</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='' element={ <Homepage /> } />
      </Routes>
    </div>
  );
}

export default App;
