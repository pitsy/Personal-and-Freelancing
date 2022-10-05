import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Homepage from './pages/Homepage';
import Photography from './pages/Photography';
import Contact from './pages/Contact';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.body.style.backgroundColor = '#ebfcf9';
  }, []);

  return (
    <div>
      <Navbar>
        <Container>
            <Navbar.Brand as={Link} to='/'>Allan Pits</Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav.Link as={Link} to='/photography'>Photography</Nav.Link>
              <Nav.Link as={Link} to='/contact'>Contact</Nav.Link>
            </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='' element={ <Homepage /> } />
      </Routes>
      <Routes>
        <Route path='photography' element={ <Photography /> } />
      </Routes>
      <Routes>
        <Route path='contact' element={ <Contact /> } />
      </Routes>
    </div>
  );
}

export default App;
