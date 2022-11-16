import { useEffect, useState } from 'react';
import imageMapResize from 'image-map-resizer'; 
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import estateTinted from '../images/Estate/Estate 3.png';
import estate from '../images/Estate/Estate 1.png';

function Estate() {

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
        if (!popupConfirm && (windowClicked === 'rear' || windowClicked === 'r_3' || windowClicked === 'l_3' || 
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
                {tinted && <img className="image" src={estateTinted} alt="" />}
                {!tinted && <img className="image" src={estate} alt="" />}

                {/* transparent layer on top of all car-related images to maintain image map */}
                <img className="selection-layer" src={estate} alt="" usemap="#image-map" />

                <map name="image-map">
                    <area onClick={() => selectWindow("front")} alt="front" title="front" coords="800,903,758,700,864,644,1010,626,1155,649,1238,700,1199,902,993,893" shape="poly" />
                    <area onClick={() => selectWindow("rear")} alt="rear" title="rear" coords="807,1597,793,1657,855,1701,996,1720,1145,1703,1203,1659,1185,1597,1010,1622" shape="poly" />
                    <area onClick={() => selectWindow("r_1")} alt="r_1" title="r_1" coords="1250,738,1256,849,1220,872" shape="poly" />
                    <area onClick={() => selectWindow("r_2")} alt="r_2" title="r_2" coords="1252,867,1254,1065,1196,1093,1199,973,1217,890" shape="poly" />
                    <area onClick={() => selectWindow("r_3")} alt="r_3" title="r_3" coords="1252,1117,1249,1292,1196,1294,1196,1144" shape="poly" />
                    <area onClick={() => selectWindow("r_4")} alt="r_4" title="r_4" coords="1196,1307,1249,1311,1243,1394,1196,1348" shape="poly" />
                    <area onClick={() => selectWindow("r_5")} alt="r_5" title="r_5" coords="1199,1374,1240,1415,1220,1572,1203,1539" shape="poly" />
                    <area onClick={() => selectWindow("l_1")} alt="l_1" title="l_1" coords="749,732,744,842,779,872" shape="poly" />
                    <area onClick={() => selectWindow("l_2")} alt="l_2" title="l_2" coords="746,864,776,883,799,969,802,1098,744,1059" shape="poly" />
                    <area onClick={() => selectWindow("l_3")} alt="l_3" title="l_3" coords="744,1116,804,1138,802,1296,747,1296" shape="poly" />
                    <area onClick={() => selectWindow("l_4")} alt="l_4" title="l_4" coords="751,1312,804,1309,807,1353,754,1393" shape="poly" />
                    <area onClick={() => selectWindow("l_5")} alt="l_5" title="l_5" coords="800,1377,756,1418,779,1571,793,1543" shape="poly" />
                </map>
            </div>
        </div> );
}

export default Estate;