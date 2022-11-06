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
import { useContext, useEffect } from 'react';
import EditPicture from './pages/EditPicture';
import { useState } from 'react';
import CategoryGallery from './pages/CategoryGallery';
import ManageKeywords from './pages/ManageKeywords';
import ManageCategories from './pages/ManageCategories';

function App() {

  const authCtx = useContext(AuthContext);
  const [active, setActive] = useState(false);
  const [pictures, setPictures] = useState([]);
  const categories = [...new Set(pictures.map(e => e.category))].sort();
  const [categoryClicked, setCategoryClicked] = useState('');

  useEffect(() => {
    fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
        .then(res => res.json())
        .then(data => {
            setPictures(data || []);
        });
  }, []);
  
  return (
    <div>
      <Card className='category-card' border='light'>
        <ListGroup>
          <ListGroup.Item >
            <div><h2 className='nav-header'>Allan Pits</h2></div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div onClick={() => setCategoryClicked('')}><Link className='nav-element' to='/'>Homepage</Link></div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div><Link className='nav-element' onClick={() => setActive(!active)}>Photography</Link></div>
          </ListGroup.Item>
          {active && categories.map(element => 
            <ListGroup.Item key={element}>
              <div>
                <Link 
                  className={categoryClicked === element ? 'nav-category-active' : 'nav-category'}
                  to={'/gallery/' + element} 
                  onClick={() => setCategoryClicked(element)}>
                    {element}
              </Link></div>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <div onClick={() => setCategoryClicked('')}><Link className='nav-element' to='/contact'>Contact</Link></div>
          </ListGroup.Item>
          { authCtx.isLoggedIn && <>
            <ListGroup.Item>
              <div  onClick={() => setCategoryClicked('')}><Link className='nav-element' to='/admin'>Admin vaade</Link></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div  onClick={() => setCategoryClicked('')}><Link className='nav-category' to='/admin/manage-keywords'>Halda märksõnu</Link></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div  onClick={() => setCategoryClicked('')}><Link className='nav-category' to='/admin/manage-categories'>Halda kategooriaid</Link></div>
            </ListGroup.Item>
          </> }
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
      <Routes>
        <Route path='gallery/:category' element={ <CategoryGallery /> } />
      </Routes>
      { authCtx.isLoggedIn && <> 
        <Routes>
          <Route path='admin' element={ <Admin /> } />
        </Routes>
        <Routes>
          <Route path='admin/add-picture' element={ <AddPicture /> } />
        </Routes>
        <Routes>
          <Route path='admin/edit-picture/:id' element={ <EditPicture /> } />
        </Routes>
        <Routes>
          <Route path='admin/manage-keywords' element={ <ManageKeywords /> } />
        </Routes>
        <Routes>
          <Route path='admin/manage-categories' element={ <ManageCategories /> } />
        </Routes>
      </> }
    </div>
  );
}

export default App;
