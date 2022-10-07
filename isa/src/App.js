import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import { Container, Nav, Navbar, Card, ListGroup } from 'react-bootstrap';
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

      <h2>Allan Pits</h2>

      <div>
        <Card className='category-card' border='light'>
            <ListGroup variant='flush'>
                <ListGroup.Item >
                    <div><h2 className='nav-header'>Allan Pits</h2></div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div><Link className='nav-element' to='/'>Homepage</Link></div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div><Link className='nav-element' to='/photography'>Photography</Link></div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div><Link className='nav-element' to='/contact'>Contact</Link></div>
                </ListGroup.Item>
            </ListGroup>
        </Card>
      </div>

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
