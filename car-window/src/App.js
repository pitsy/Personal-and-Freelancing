import './App.css';
import { useEffect, useState } from 'react';
import imageMapResize from 'image-map-resizer';
import coupe2 from './images/Coupe 2/Coupe 2.png';
import coupe2_broken from './images/Coupe 2/Coupe 2_broken.png';
import front from './images/Coupe 2/front.png';
import l_1 from './images/Coupe 2/l_1.png';
import rear from './images/Coupe 2/rear.png';

function App() {

  const [message, setMessage] = useState('');
  const [brokenWindows, setBrokenWindows] = useState([]);

  function selectWindow(windowClicked) {
    setMessage(windowClicked);
    brokenWindows.push(windowClicked);
    setBrokenWindows(brokenWindows.slice());
  }

  useEffect(() => {
    imageMapResize();
  }, []);

  return (
    <div>
      <div className="container">
        <div className='button-container'>
          {brokenWindows.map(element =>
            <button key={element} className='window-button'>{element}</button>
          )}
        </div>
        <img className="image" src={coupe2} alt="" usemap="#image-map" />
        {/* <img className='broken-glass' src={front} alt="" />
        <img className='broken-glass' src={l_1} alt="" />
        <img className='broken-glass' src={rear} alt="" /> */}

        <map name="image-map">
          <area onClick={() => selectWindow("front")} alt="front" title="front" coords="783,860,739,712,844,646,998,620,1160,650,1258,710,1219,865" shape="poly" />
          <area onClick={() => selectWindow("rear")} alt="rear" title="rear" coords="807,1278,1189,1276,1180,1513,1097,1548,1007,1560,890,1543,816,1513" shape="poly" />
          <area onClick={() => selectWindow("r_1")} alt="r_1" title="r_1" coords="1265,768,1270,831,1245,849" shape="poly" />
          <area onClick={() => selectWindow("r_2")} alt="r_2" title="r_2" coords="1266,850,1245,865,1217,1034,1215,1212,1259,1174" shape="poly" />
          <area onClick={() => selectWindow("r_3")} alt="r_3" title="r_3" coords="1273,1185,1224,1439,1215,1235" shape="poly" />
          <area onClick={() => selectWindow("l_1")} alt="l_1" title="l_1" coords="733,767,730,829,754,852" shape="poly" />
          <area onClick={() => selectWindow("l_2")} alt="l_2" title="l_2" coords="724,848,753,867,781,1017,783,1217,723,1157" shape="poly" />
          <area onClick={() => selectWindow("l_3")} alt="l_3" title="l_3" coords="728,1180,784,1240,779,1438" shape="poly" />
        </map>
      </div>
      <div>{message}</div>
    </div>
  );
}

export default App;
