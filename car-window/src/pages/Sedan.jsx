import { useEffect, useState } from 'react';
import imageMapResize from 'image-map-resizer'; 
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import sedanTinted from '../images/Sedan/Sedan 1.png';
import sedan from '../images/Sedan/Sedan 3.png';

function Sedan() {

    // display popup
    const [popup, setPopup] = useState(false);
    // determine if back windows are tinted
    const [tinted, setTinted] = useState(false);
    // toggle first time popup appears, popup should show just once
    const [popupConfirm, setPopupConfirm] = useState(false);
    // array of possible window selections for Sedan
    const [brokenWindows, setBrokenWindows] = useState([
        {window: 'front', broken: false},
        {window: 'rear', broken: false},
        {window: 'l_1', broken: false},
        {window: 'l_2', broken: false},
        {window: 'l_3', broken: false},
        {window: 'l_4', broken: false},
        {window: 'r_1', broken: false},
        {window: 'r_2', broken: false},
        {window: 'r_3', broken: false},
        {window: 'r_4', broken: false}
    ]);

    // handle window selection
    function selectWindow(windowClicked) {
        const index = brokenWindows.findIndex(element => element.window === windowClicked);
        brokenWindows[index].broken = !brokenWindows[index].broken;
        setBrokenWindows(windows => {
            return windows.slice();
        })
        if (!popupConfirm && (windowClicked === 'rear' || windowClicked === 'r_3' || windowClicked === 'l_3' || windowClicked === 'r_4' || windowClicked === 'l_4')) {
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
                {tinted && <img className="image" src={sedanTinted} alt="" />}
                {!tinted && <img className="image" src={sedan} alt="" />}

                {/* transparent layer on top of all car-related images to maintain image map */}
                <img className="selection-layer" src={sedan} alt="" usemap="#image-map" />

                <map name="image-map">
                    <area onClick={() => selectWindow("front")} alt="front" title="front" coords="834,941,781,747,857,714,1000,699,1122,714,1217,751,1168,941,1002,932" shape="poly" />
                    <area onClick={() => selectWindow("rear")} alt="rear" title="rear" coords="807,1550,837,1398,1168,1398,1189,1554,1000,1591" shape="poly" />
                    <area onClick={() => selectWindow("r_1")} alt="r_1" title="r_1" coords="1242,755,1247,831,1213,856" shape="poly" />
                    <area onClick={() => selectWindow("r_2")} alt="r_2" title="r_2" coords="1245,853,1245,1079,1173,1108,1183,1002,1210,867" shape="poly" />
                    <area onClick={() => selectWindow("r_3")} alt="r_3" title="r_3" coords="1245,1112,1236,1350,1175,1308,1176,1140" shape="poly" />
                    <area onClick={() => selectWindow("r_4")} alt="r_4" title="r_4" coords="1183,1328,1238,1367,1235,1418,1217,1425" shape="poly" />
                    <area onClick={() => selectWindow("l_1")} alt="l_1" title="l_1" coords="758,754,788,860,754,837" shape="poly" />
                    <area onClick={() => selectWindow("l_2")} alt="l_2" title="l_2" coords="754,854,788,870,818,1011,822,1105,751,1078" shape="poly" />
                    <area onClick={() => selectWindow("l_3")} alt="l_3" title="l_3" coords="758,1109,823,1139,822,1307,763,1355" shape="poly" />
                    <area onClick={() => selectWindow("l_4")} alt="l_4" title="l_4" coords="762,1367,765,1417,783,1429,816,1330" shape="poly" />
                </map>
            </div>
        </div> );
}

export default Sedan;