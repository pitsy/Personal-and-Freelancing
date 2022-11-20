import { useEffect, useState } from 'react';
import imageMapResize from 'image-map-resizer'; 
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import coupeTinted from '../images/Coupe/Coupe 2.png';
import coupe from '../images/Coupe/Coupe 3.png';
import front from '../images/Coupe/front.png';
import rear from '../images/Coupe/rear.png';
import r_1 from '../images/Coupe/r_1.png';
import r_2 from '../images/Coupe/r_2.png';
import r_3 from '../images/Coupe/r_3.png';
import l_1 from '../images/Coupe/l_1.png';
import l_2 from '../images/Coupe/l_2.png';
import l_3 from '../images/Coupe/l_3.png';
import rear_t from '../images/Coupe/rear_t.png';
import l_3_t from '../images/Coupe/l_3_t.png';
import r_3_t from '../images/Coupe/r_3_t.png';

function Coupe() {

    // display popup
    const [popup, setPopup] = useState(false);
    // determine if back windows are tinted
    const [tinted, setTinted] = useState(false);
    // toggle first time popup appears, popup should show just once
    const [popupConfirm, setPopupConfirm] = useState(false);
    // array of possible window selections for Coupe
    const [brokenWindows, setBrokenWindows] = useState([
        {window: 'front', broken: false, source: front},
        {window: 'rear', broken: false, source: rear},
        {window: 'l_1', broken: false, source: l_1},
        {window: 'l_2', broken: false, source: l_2},
        {window: 'l_3', broken: false, source: l_3},
        {window: 'r_1', broken: false, source: r_1},
        {window: 'r_2', broken: false, source: r_2},
        {window: 'r_3', broken: false, source: r_3},
        {window: 'rear_t', broken: false, source: rear_t},
        {window: 'r_3_t', broken: false, source: r_3_t},
        {window: 'l_3_t', broken: false, source: l_3_t}
    ]);

    // handle window selection
    function selectWindow(windowClicked) {
        let index = 0;
        // special cases for tinted windows
        if (windowClicked === 'r_3' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'r_3_t');
        } else if (windowClicked === 'l_3' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'l_3_t');
        } else if (windowClicked === 'rear' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'rear_t');
        } else {
            index = brokenWindows.findIndex(element => element.window === windowClicked);
        }
        brokenWindows[index].broken = !brokenWindows[index].broken;
        setBrokenWindows(windows => {
            return windows.slice();
        })        
        // display popup if a window which can be tinted is clicked for the first time
        if (!popupConfirm && (windowClicked === 'rear' || windowClicked === 'r_3' || windowClicked === 'l_3')) {
            setPopup(true);
        }
    }

    function handlePopup(answer) {
        setTinted(answer);
        setPopup(false);
        setPopupConfirm(true);
    }

    // handle tinted toggle button
    function tintedButtonHandle() {
        setTinted(!tinted);
        setPopupConfirm(true);
        // reset all windows to not broken to avoid issues
        for (let i = 0; i < brokenWindows.length; i++) {
            brokenWindows[i].broken = false;            
        }
        setBrokenWindows(brokenWindows.slice());
    }

    // necessary to maintain proper image map scaling
    useEffect(() => {
        imageMapResize();
    }, []);

    return ( 
        <div className='page'>
            {/* display popup */}
            <div className='popup'>
                <Alert show={popup} variant="secondary">
                    <Alert.Heading>Are your back windows tinted?</Alert.Heading>
                    <div className="d-flex justify-content-center">
                    <Button className='popup-button' onClick={() => handlePopup(true)} variant="outline-dark">
                        Yes
                    </Button>
                    <Button className='popup-button' onClick={() => handlePopup(false)} variant="outline-dark">
                        No
                    </Button>
                    </div>
                </Alert>
            </div>

            {/* car and buttons in one container */}
            <div className="container">
                <div className='button-container'>
                {brokenWindows.map(element =>
                    <button 
                        key={element.window} 
                        className={element.broken ? 'window-button-active' : 'window-button-inactive'}
                        onClick={() => selectWindow(element.window)}>
                            {element.window}
                    </button>
                )}
                </div>
                <div className='button-container'>
                    <button onClick={tintedButtonHandle}>Toggle tinted windows</button>
                </div>
                {/* display either car with tinted windows or normal */}
                {tinted && <img className="image" src={coupeTinted} alt="" />}
                {!tinted && <img className="image" src={coupe} alt="" />}

                {/* broken glass displays */}
                {brokenWindows.filter(element => element.broken === true).map(element => 
                    <img 
                        key={element.window} className='broken-glass' src={element.source} alt="" />
                )}

                {/* transparent layer on top of all car-related images to maintain image map */}
                <img className="selection-layer" src={coupe} alt="" usemap="#image-map" />

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
        </div> );
}

export default Coupe;