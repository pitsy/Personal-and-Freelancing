import { useEffect, useState } from 'react';
import imageMapResize from 'image-map-resizer'; 
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import fiveDoorTinted from '../images/5DoorHatch/5-Door Hatch 2.png';
import fiveDoor from '../images/5DoorHatch/5-Door Hatch 4.png';
import front from '../images/5DoorHatch/front.png';
import rear from '../images/5DoorHatch/rear.png';
import r_1 from '../images/5DoorHatch/r_1.png';
import r_2 from '../images/5DoorHatch/r_2.png';
import r_3 from '../images/5DoorHatch/r_3.png';
import r_4 from '../images/5DoorHatch/r_4.png';
import l_1 from '../images/5DoorHatch/l_1.png';
import l_2 from '../images/5DoorHatch/l_2.png';
import l_3 from '../images/5DoorHatch/l_3.png';
import l_4 from '../images/5DoorHatch/l_4.png';
import rear_t from '../images/5DoorHatch/rear_t.png';
import l_3_t from '../images/5DoorHatch/l_3_t.png';
import l_4_t from '../images/5DoorHatch/l_4_t.png';
import r_3_t from '../images/5DoorHatch/r_3_t.png';
import r_4_t from '../images/5DoorHatch/r_4_t.png';

function Five_Door_Hatch() {

    // display popup
    const [popup, setPopup] = useState(false);
    // determine if back windows are tinted
    const [tinted, setTinted] = useState(false);
    // toggle first time popup appears, popup should show just once
    const [popupConfirm, setPopupConfirm] = useState(false);
    // array of possible window selections for Sedan
    const [brokenWindows, setBrokenWindows] = useState([
        {window: 'front', broken: false, source: front},
        {window: 'rear', broken: false, source: rear},
        {window: 'l_1', broken: false, source: l_1},
        {window: 'l_2', broken: false, source: l_2},
        {window: 'l_3', broken: false, source: l_3},
        {window: 'l_4', broken: false, source: l_4},
        {window: 'r_1', broken: false, source: r_1},
        {window: 'r_2', broken: false, source: r_2},
        {window: 'r_3', broken: false, source: r_3},
        {window: 'r_4', broken: false, source: r_4},
        {window: 'rear_t', broken: false, source: rear_t},
        {window: 'r_3_t', broken: false, source: r_3_t},
        {window: 'r_4_t', broken: false, source: r_4_t},
        {window: 'l_3_t', broken: false, source: l_3_t},
        {window: 'l_4_t', broken: false, source: l_4_t}
    ]);

    // handle window selection
    function selectWindow(windowClicked) {
        let index = 0;
        // special cases for tinted windows
        if (windowClicked === 'r_3' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'r_3_t');
        } else if (windowClicked === 'l_3' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'l_3_t');
        } else if (windowClicked === 'r_4' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'r_4_t');
        } else if (windowClicked === 'l_4' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'l_4_t');
        } else if (windowClicked === 'rear' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'rear_t');
        } else {
            index = brokenWindows.findIndex(element => element.window === windowClicked);
        }       
        // display popup if a window which can be tinted is clicked for the first time
        if (!popupConfirm && (windowClicked === 'rear' || windowClicked === 'r_3' || windowClicked === 'l_3' || windowClicked === 'r_4' || windowClicked === 'l_4')) {
            setPopup(true);
            return; // don't allow back window selecting if popup is still active
        }
        brokenWindows[index].broken = !brokenWindows[index].broken;
        setBrokenWindows(windows => {
            return windows.slice();
        }) 
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
        <div className="page">
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
                {tinted && <img className="image" src={fiveDoorTinted} alt="" />}
                {!tinted && <img className="image" src={fiveDoor} alt="" />}

                {/* broken glass displays */}
                {brokenWindows.filter(element => element.broken === true).map(element => 
                    <img 
                        key={element.window} 
                        // image scaling wonky so windows need different css classes
                        className='bg3' src={element.source} alt="" />
                )}

                {/* transparent layer on top of all car-related images to maintain image map */}
                <img className="selection-layer" src={fiveDoor} alt="" usemap="#image-map" />

                <map name="image-map">
                    <area onClick={() => selectWindow("front")} alt="front" title="front" coords="786,914,746,715,749,690,850,632,1003,610,1153,637,1252,685,1215,911,996,900" shape="poly" />
                    <area onClick={() => selectWindow("rear")} alt="rear" title="rear" coords="1199,1473,1219,1539,1153,1588,1000,1607,848,1592,779,1542,795,1473,843,1489,1138,1493" shape="poly" />
                    <area onClick={() => selectWindow("r_1")}  alt="r_1" title="r_1" coords="1268,727,1273,849,1236,879" shape="poly" />
                    <area onClick={() => selectWindow("r_2")}  alt="r_2" title="r_2" coords="1273,868,1273,1080,1208,1114,1213,986,1229,893" shape="poly" />
                    <area onClick={() => selectWindow("r_3")}  alt="r_3" title="r_3" coords="1206,1166,1270,1143,1266,1330,1210,1333" shape="poly" />
                    <area onClick={() => selectWindow("r_4")}  alt="r_4" title="r_4" coords="1210,1345,1210,1387,1259,1440,1272,1343" shape="poly" />
                    <area onClick={() => selectWindow("l_1")}  alt="l_1" title="l_1" coords="733,730,726,847,765,879" shape="poly" />
                    <area onClick={() => selectWindow("l_2")}  alt="l_2" title="l_2" coords="728,867,767,897,786,982,793,1123,723,1079" shape="poly" />
                    <area onClick={() => selectWindow("l_3")}  alt="l_3" title="l_3" coords="723,1134,790,1164,790,1335,726,1331" shape="poly" />
                    <area onClick={() => selectWindow("l_4")}  alt="l_4" title="l_4" coords="730,1347,730,1449,790,1391,793,1349" shape="poly" />
                </map>
            </div>
        </div> );
}

export default Five_Door_Hatch;