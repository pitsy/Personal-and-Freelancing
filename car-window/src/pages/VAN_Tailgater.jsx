import { useEffect, useState } from 'react';
import imageMapResize from 'image-map-resizer'; 
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import vanTailgaterTinted from '../images/VAN_Tailgater/BLAC VAN TAGLIATELE.png'; // tinted window version was not available
import vanTailgater from '../images/VAN_Tailgater/VAN Tailgater 3.png';
import front from '../images/VAN_Tailgater/front.png';
import rear from '../images/VAN_Tailgater/rear.png';
import rear_t from '../images/VAN_Tailgater/rear_t.png';
import r_1 from '../images/VAN_Tailgater/r_1.png';
import r_2 from '../images/VAN_Tailgater/r_2.png';
import r_3 from '../images/VAN_Tailgater/r_3.png';
import r_4 from '../images/VAN_Tailgater/r_4.png';
import l_1 from '../images/VAN_Tailgater/l_1.png';
import l_2 from '../images/VAN_Tailgater/l_2.png';
import l_3 from '../images/VAN_Tailgater/l_3.png';
import l_4 from '../images/VAN_Tailgater/l_4.png';
import l_3_t from '../images/VAN_Tailgater/l_3_t.png';
import l_4_t from '../images/VAN_Tailgater/l_4_t.png';
import r_3_t from '../images/VAN_Tailgater/r_3_t.png';
import r_4_t from '../images/VAN_Tailgater/r_4_t.png';
import l_5 from '../images/VAN_Tailgater/l_5.png';
import r_5 from '../images/VAN_Tailgater/r_5.png';
import l_5_t from '../images/VAN_Tailgater/l_5_t.png';
import r_5_t from '../images/VAN_Tailgater/r_5_t.png';

function VAN_Tailgater() {

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
        {window: 'rear_t', broken: false, source: rear_t},
        {window: 'l_1', broken: false, source: l_1},
        {window: 'l_2', broken: false, source: l_2},
        {window: 'l_3', broken: false, source: l_3},
        {window: 'l_4', broken: false, source: l_4},
        {window: 'l_5', broken: false, source: l_5},
        {window: 'l_3_t', broken: false, source: l_3_t},
        {window: 'l_4_t', broken: false, source: l_4_t},
        {window: 'l_5_t', broken: false, source: l_5_t},
        {window: 'r_1', broken: false, source: r_1},
        {window: 'r_2', broken: false, source: r_2},
        {window: 'r_3', broken: false, source: r_3},
        {window: 'r_4', broken: false, source: r_4},
        {window: 'r_5', broken: false, source: r_5},
        {window: 'r_3_t', broken: false, source: r_3_t},
        {window: 'r_4_t', broken: false, source: r_4_t},
        {window: 'r_5_t', broken: false, source: r_5_t}
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
        } else if (windowClicked === 'r_5' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'r_5_t');
        } else if (windowClicked === 'l_5' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'l_5_t');
        } else if (windowClicked === 'rear' && tinted) {
            index = brokenWindows.findIndex(element => element.window === 'rear_t');
        } else {
            index = brokenWindows.findIndex(element => element.window === windowClicked);
        }   
        // display popup if a window which can be tinted is clicked for the first time
        if (!popupConfirm && (windowClicked === 'l_rear' || windowClicked === 'r_rear' || windowClicked === 'r_3' || windowClicked === 'l_3' || 
            windowClicked === 'r_4' || windowClicked === 'l_4' || windowClicked === 'r_5' || windowClicked === 'l_5')) {
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
                {tinted && <img className="image" src={vanTailgaterTinted} alt="" />}
                {!tinted && <img className="image" src={vanTailgater} alt="" />}

                {/* broken glass displays */}
                {brokenWindows.filter(element => element.broken === true).map(element => 
                    <img 
                        key={element.window} 
                        // image scaling wonky so windows need different css classes
                        className='bg3' 
                        src={element.source} alt="" />
                )}

                {/* transparent layer on top of all car-related images to maintain image map */}
                <img className="selection-layer" src={vanTailgater} alt="" usemap="#image-map" />

                <map name="image-map">
                    <area onClick={() => selectWindow("front")} alt="front" title="front" coords="806,610,793,446,846,393,1003,372,1153,395,1205,444,1196,605,1000,584" shape="poly" />
                    <area onClick={() => selectWindow("rear")} alt="rear" title="rear" coords="779,1740,788,1715,1212,1715,1224,1742,991,1756" shape="poly" />
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

export default VAN_Tailgater;