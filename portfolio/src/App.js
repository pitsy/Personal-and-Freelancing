import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.body.style.backgroundColor = '#f0f8ff';
  }, []);

  return (
    <div>
      <Navbar>
        <Container>
            <Navbar.Brand as={Link} to='/'>RP</Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav.Link as={Link} to='/about'>About</Nav.Link>
              <Nav.Link as={Link} to='/projects'>Projects</Nav.Link>
              <Nav.Link as={Link} to='/resume'>Resume</Nav.Link>
              <Nav.Link as={Link} to='/contact'>Contact</Nav.Link>
            </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='' element={ <Homepage /> } />
      </Routes>
      <Routes>
        <Route path='about' element={ <About /> } />
      </Routes>
      <Routes>
        <Route path='projects' element={ <Projects /> } />
      </Routes>
      <Routes>
        <Route path='resume' element={ <Resume /> } />
      </Routes>
      <Routes>
        <Route path='contact' element={ <Contact /> } />
      </Routes>
    </div>
  );
}

export default App;
