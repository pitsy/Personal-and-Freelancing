import { useEffect, useState } from 'react';
import imageMapResize from 'image-map-resizer'; 
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import coupeTinted from '../images/Coupe/Coupe 2.png';
import coupe from '../images/Coupe/Coupe 3.png';
import front from '../images/Coupe/front.png';
import l_1 from '../images/Coupe/l_1.png';
import rear from '../images/Coupe/rear.png';

function Coupe() {

    // display popup
    const [popup, setPopup] = useState(false);
    // determine if back windows are tinted
    const [tinted, setTinted] = useState(false);
    // toggle first time popup appears, popup should show just once
    const [popupConfirm, setPopupConfirm] = useState(false);
    // array of possible window selections for Coupe
    const [brokenWindows, setBrokenWindows] = useState([
        {window: 'front', broken: false},
        {window: 'rear', broken: false},
        {window: 'l_1', broken: false},
        {window: 'l_2', broken: false},
        {window: 'l_3', broken: false},
        {window: 'r_1', broken: false},
        {window: 'r_2', broken: false},
        {window: 'r_3', broken: false}
    ]);

    // handle window selection
    function selectWindow(windowClicked) {
        const index = brokenWindows.findIndex(element => element.window === windowClicked);
        brokenWindows[index].broken = !brokenWindows[index].broken;
        setBrokenWindows(windows => {
            return windows.slice();
        })
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

                {/* transparent layer on top of all car-related images to maintain image map */}
                <img className="selection-layer" src={coupe} alt="" usemap="#image-map" />
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
        </div> );
}

export default Coupe;