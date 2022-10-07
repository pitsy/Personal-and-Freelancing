import { useState } from 'react';
import picturesFromFile from '../pictures.json';
import styles from '../css/Photography.module.css';
import { Card } from 'react-bootstrap';
import arrow from '../images/arrow.png'
import close from '../images/close.png'

function Photography() {

    const [pictures, setPictures] = useState(picturesFromFile);
    const [pictureClicked, setPictureClicked] = useState([]);

    // function setActivePicture(picClicked) {
    //     const index = pictures.findIndex(element => element.id === picClicked.id);
    //     set
    // }

    return ( 
        <div className='page'>

            <div className={styles.popup}>
                <div className={styles.topBar}>
                    <p>image name</p>
                    <img className={styles.closeBtn} src={require('../images/close.png')} alt="" />
                </div>
                <img className={styles.rightBtn} src={require('../images/arrow.png')} alt="" />
                <img className={styles.leftBtn} src={require('../images/arrow.png')} alt="" />
            </div>

            <br /><br />
            <div className={styles.gridContainer}>
            {pictures.map(element =>
                <div key={element.id}>
                    {/* <img src={element.image} alt={element.name} />
                    <br /><br /> */}
                    <Card className={styles.image} style={{ width: '18rem' }} bg='light'>
                        <Card.Img src={element.image} alt={element.name} />
                    </Card>
                </div> )}
            </div>
        </div> );
}

export default Photography;