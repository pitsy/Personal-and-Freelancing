import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import Homepage from './pages/Homepage';
import Photography from './pages/Photography';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AddPicture from './pages/AddPicture';
import Login from './pages/Login';
import AuthContext from './components/AuthContext';
import { useEffect, useContext } from 'react';

function App() {

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    document.body.style.backgroundColor = '#ebfcf9';
  }, []);

  return (
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

      <Routes>
        <Route path='' element={ <Homepage /> } />
      </Routes>
      <Routes>
        <Route path='photography' element={ <Photography /> } />
      </Routes>
      <Routes>
        <Route path='contact' element={ <Contact /> } />
      </Routes>
      <Routes>
        <Route path='login' element={ <Login /> } />
      </Routes>
      { authCtx.isLoggedIn && <> </> }
        <Routes>
          <Route path='admin' element={ <Admin /> } />
        </Routes>
        <Routes>
          <Route path='add-picture' element={ <AddPicture /> } />
        </Routes>
      
    </div>
  );
}

export default App;
