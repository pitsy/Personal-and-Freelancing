import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Coupe from './pages/Coupe';
import Sedan from './pages/Sedan';
import Estate from './pages/Estate';
import VAN_Barn_door from './pages/VAN _Barn_door';
import VAN_Tailgater from './pages/VAN_Tailgater';
import Three_Door_Hatch from './pages/3_Door_Hatch';
import Five_Door_Hatch from './pages/5_Door_Hatch';

function App() {

  return (
    <div className='page'>
      <ul>
        <li><Link to='/'>Coupe</Link></li>
        <li><Link to='/sedan'>Sedan</Link></li>
        <li><Link to='/estate'>Estate</Link></li>
        <li><Link to='/van-barn'>VAN Barn door</Link></li>
        <li><Link to='/van-tailgater'>VAN Tailgater</Link></li>
        <li><Link to='/three-door-hatchback'>3 Door Hatchback</Link></li>
        <li><Link to='/five-door-hatchback'>5 Door Hatchback</Link></li>
      </ul>

      <Routes>
        <Route path='' element={ <Coupe /> } />
        <Route path='/sedan' element={ <Sedan /> } />
        <Route path='/estate' element={ <Estate /> } />
        <Route path='/van-barn' element={ <VAN_Barn_door /> } />
        <Route path='/van-tailgater' element={ <VAN_Tailgater /> } />
        <Route path='/three-door-hatchback' element={ <Three_Door_Hatch /> } />
        <Route path='/five-door-hatchback' element={ <Five_Door_Hatch /> } />
      </Routes>
    </div>
  );
}

export default App;
