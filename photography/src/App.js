import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AddPicture from './pages/AddPicture';
import { useEffect, useContext, useState } from 'react';
import EditPicture from './pages/EditPicture';
import CategoryGallery from './pages/CategoryGallery';
import ManageKeywords from './pages/ManageKeywords';
import ManageCategories from './pages/ManageCategories';
import AuthContext from './components/AuthContext';

function App() {

  const [active, setActive] = useState(false);
  // const categories = [...new Set(pictures.map(e => e.category))].sort();
  const [categoryClicked, setCategoryClicked] = useState('');
  const [categories, setCategories] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetch('https://photography-c4b7e-default-rtdb.europe-west1.firebasedatabase.app/categories.json')
        .then(res => res.json())
        .then(data => {
            setCategories(data || []);
        });
  }, []);

  function login() {
    if (authCtx.isLoggedIn) {
      authCtx.updateLoggedIn(false);
    } else {
      authCtx.updateLoggedIn(true);
    }
  }
  
  return (
    <div>
      <Card className='category-card' border='light'>
        <ListGroup>
          <ListGroup.Item >
            <div><h2 className='nav-header'>Photography Portfolio</h2></div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div onClick={() => setCategoryClicked('')}><Link className='nav-element' to='/'>Homepage</Link></div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div><Link className='nav-element' onClick={() => setActive(!active)}>Photography</Link></div>
          </ListGroup.Item>
          {active && categories.filter(element => element.public === true).map(element => 
            <ListGroup.Item key={element.category}>
              <div><Link 
                className={categoryClicked === element.category ? 'nav-category-active' : 'nav-category'}
                to={'/gallery/' + element.category} 
                onClick={() => setCategoryClicked(element.category)}>
                  {element.category}
              </Link></div>
            </ListGroup.Item>
          )}
          {active && authCtx.isLoggedIn && categories.filter(element => element.public === false).map(element => 
            <ListGroup.Item key={element.category}>
              <div><Link 
                className={categoryClicked === element.category ? 'nav-category-active' : 'nav-category'}
                to={'/gallery/' + element.category} 
                onClick={() => setCategoryClicked(element.category)}>
                  {element.category}
              </Link></div>
            </ListGroup.Item>
          )}
          <ListGroup.Item>
            <div onClick={() => setCategoryClicked('')}><Link className='nav-element' to='/contact'>Contact</Link></div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div onClick={login}><Link className='nav-element'>{authCtx.isLoggedIn ? 'Log Out' : 'Log In'}</Link></div>
          </ListGroup.Item>
          { authCtx.isLoggedIn && <>
            <ListGroup.Item>
              <div  onClick={() => setCategoryClicked('')}><Link className='nav-element' to='/admin'>Admin view</Link></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div  onClick={() => setCategoryClicked('')}><Link className='nav-category' to='/admin/manage-keywords'>Maintain keywords</Link></div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div  onClick={() => setCategoryClicked('')}><Link className='nav-category' to='/admin/manage-categories'>Maintain categories</Link></div>
            </ListGroup.Item>
          </> }
        </ListGroup>
      </Card>

      <Routes>
        <Route path='' element={ <Homepage /> } />
        <Route path='contact' element={ <Contact /> } />
        <Route path='gallery/:category' element={ <CategoryGallery /> } />
        { authCtx.isLoggedIn && <>
            <Route path='admin' element={ <Admin /> } />
            <Route path='admin/add-picture' element={ <AddPicture /> } />
            <Route path='admin/edit-picture/:id' element={ <EditPicture /> } />
            <Route path='admin/manage-keywords' element={ <ManageKeywords /> } />
            <Route path='admin/manage-categories' element={ <ManageCategories /> } />
        </> }
      </Routes>
    </div>
  );
}

export default App;
