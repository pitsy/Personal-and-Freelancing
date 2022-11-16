import { useEffect, useState } from 'react';
import imageMapResize from 'image-map-resizer'; 
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import vanBarnTinted from '../images/VAN_Barn/VAN Barn door 1.png';
import vanBarn from '../images/VAN_Barn/VAN Barn door 2.png';

function Van_Barn_door() {

    // display popup
    const [popup, setPopup] = useState(false);
    // determine if back windows are tinted
    const [tinted, setTinted] = useState(false);
    // toggle first time popup appears, popup should show just once
    const [popupConfirm, setPopupConfirm] = useState(false);
    // array of possible window selections for Sedan
    const [brokenWindows, setBrokenWindows] = useState([
        {window: 'front', broken: false},
        {window: 'l_rear', broken: false},
        {window: 'r_rear', broken: false},
        {window: 'l_1', broken: false},
        {window: 'l_2', broken: false},
        {window: 'l_3', broken: false},
        {window: 'l_4', broken: false},
        {window: 'l_5', broken: false},
        {window: 'r_1', broken: false},
        {window: 'r_2', broken: false},
        {window: 'r_3', broken: false},
        {window: 'r_4', broken: false},
        {window: 'r_5', broken: false}
    ]);

    // handle window selection
    function selectWindow(windowClicked) {
        const index = brokenWindows.findIndex(element => element.window === windowClicked);
        brokenWindows[index].broken = !brokenWindows[index].broken;
        setBrokenWindows(windows => {
            return windows.slice();
        })
        if (!popupConfirm && (windowClicked === 'l_rear' || windowClicked === 'r_rear' || windowClicked === 'r_3' || windowClicked === 'l_3' || 
            windowClicked === 'r_4' || windowClicked === 'l_4' || windowClicked === 'r_5' || windowClicked === 'l_5')) {
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
                {tinted && <img className="image" src={vanBarnTinted} alt="" />}
                {!tinted && <img className="image" src={vanBarn} alt="" />}

                {/* transparent layer on top of all car-related images to maintain image map */}
                <img className="selection-layer" src={vanBarn} alt="" usemap="#image-map" />

                <map name="image-map">
                    <area onClick={() => selectWindow("front")} alt="front" title="front" coords="806,610,793,446,846,393,1003,372,1153,395,1205,444,1196,605,1000,584" shape="poly" />
                    <area onClick={() => selectWindow("r_rear")} alt="r_rear" title="r_rear" coords="1017,1753,1016,1717,1210,1712,1222,1742,1122,1751" shape="poly" />
                    <area onClick={() => selectWindow("l_rear")} alt="l_rear" title="l_rear" coords="987,1758,982,1719,792,1712,779,1742,848,1754" shape="poly" />
                    <area onClick={() => selectWindow("r_1")} alt="r_1" title="r_1" coords="1238,459,1242,553,1217,542" shape="poly" />
                    <area onClick={() => selectWindow("r_2")} alt="r_2" title="r_2" coords="1245,568,1252,762,1190,773,1203,663,1220,554" shape="poly" />
                    <area onClick={() => selectWindow("r_3")} alt="r_3" title="r_3" coords="1196,790,1254,780,1261,1159,1201,1168" shape="poly" />
                    <area onClick={() => selectWindow("r_4")} alt="r_4" title="r_4" coords="1203,1189,1259,1177,1265,1540,1212,1547" shape="poly" />
                    <area onClick={() => selectWindow("r_5")} alt="r_5" title="r_5" coords="1213,1563,1265,1558,1263,1678,1212,1650" shape="poly" />
                    <area onClick={() => selectWindow("l_1")} alt="l_1" title="l_1" coords="762,448,753,548,779,541" shape="poly" />
                    <area onClick={() => selectWindow("l_2")} alt="l_2" title="l_2" coords="756,566,779,559,807,732,802,778,747,760" shape="poly" />
                    <area onClick={() => selectWindow("l_3")} alt="l_3" title="l_3" coords="746,783,807,790,799,1170,735,1158" shape="poly" />
                    <area onClick={() => selectWindow("l_4")} alt="l_4" title="l_4" coords="737,1178,799,1185,792,1545,732,1542" shape="poly" />
                    <area onClick={() => selectWindow("l_5")} alt="l_5" title="l_5" coords="739,1553,793,1562,786,1650,737,1675" shape="poly" />
                </map>
            </div>
        </div> );
}

export default Van_Barn_door;