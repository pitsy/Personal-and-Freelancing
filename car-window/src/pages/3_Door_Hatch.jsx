import { useEffect, useState } from 'react';
import imageMapResize from 'image-map-resizer'; 
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import threeDoorTinted from '../images/3DoorHatch/3-Door Hatch 1.png';
import threeDoor from '../images/3DoorHatch/3-Door Hatch 3.png';
import front from '../images/3DoorHatch/front.png';
import rear from '../images/3DoorHatch/rear.png';
import r_1 from '../images/3DoorHatch/r_1.png';
import r_2 from '../images/3DoorHatch/r_2.png';
import r_3 from '../images/3DoorHatch/r_3.png';
import l_1 from '../images/3DoorHatch/l_1.png';
import l_2 from '../images/3DoorHatch/l_2.png';
import l_3 from '../images/3DoorHatch/l_3.png';
import rear_t from '../images/3DoorHatch/rear_t.png';
import l_3_t from '../images/3DoorHatch/l_3_t.png';
import r_3_t from '../images/3DoorHatch/r_3_t.png';

function Three_Door_Hatch() {

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
        // display popup if a window which can be tinted is clicked for the first time
        if (!popupConfirm && (windowClicked === 'rear' || windowClicked === 'r_3' || windowClicked === 'l_3')) {
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
                {tinted && <img className="image" src={threeDoorTinted} alt="" />}
                {!tinted && <img className="image" src={threeDoor} alt="" />}

                {/* broken glass displays */}
                {brokenWindows.filter(element => element.broken === true).map(element => 
                    <img 
                        key={element.window} className='bg3' src={element.source} alt="" />
                )}

                {/* transparent layer on top of all car-related images to maintain image map */}
                <img className="selection-layer" src={threeDoor} alt="" usemap="#image-map" />

                <map name="image-map">
                    <area onClick={() => selectWindow("front")} alt="front" title="front" coords="730,638,806,930,1196,926,1268,640,1245,610,1109,562,998,552,894,561,762,603" shape="poly" />
                    <area onClick={() => selectWindow("rear")} alt="rear" title="rear" coords="758,1551,779,1535,850,1588,1150,1590,1212,1535,1243,1551,1236,1595,1173,1653,1005,1668,816,1645,767,1604" shape="poly" />
                    <area onClick={() => selectWindow("r_1")}  alt="r_1" title="r_1" coords="1282,738,1288,817,1250,875" shape="poly" />
                    <area onClick={() => selectWindow("r_2")}  alt="r_2" title="r_2" coords="1282,855,1280,1282,1199,1295,1206,1044,1240,903" shape="poly" />
                    <area onClick={() => selectWindow("r_3")}  alt="r_3" title="r_3" coords="1203,1311,1280,1298,1224,1503,1203,1425" shape="poly" />
                    <area onClick={() => selectWindow("l_1")}  alt="l_1" title="l_1" coords="712,736,712,819,749,871" shape="poly" />
                    <area onClick={() => selectWindow("l_2")}  alt="l_2" title="l_2" coords="716,853,756,903,790,1053,795,1293,714,1279" shape="poly" />
                    <area onClick={() => selectWindow("l_3")}  alt="l_3" title="l_3" coords="716,1299,799,1311,776,1507" shape="poly" />
                </map>
            </div>
        </div> );
}

export default Three_Door_Hatch;