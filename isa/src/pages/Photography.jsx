import { useEffect, useState } from 'react';
import styles from '../css/Photography.module.css';
import { Card } from 'react-bootstrap';

function Photography() {

    const [pictures, setPictures] = useState([]);
    const [pictureIndex, setPictureIndex] = useState(0);
    const [imgActive, setImgActive] = useState(false);

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
            });
    }, []);

    function setActivePicture(picClicked) {
        setImgActive(true);
        setPictureIndex(picClicked);
    }

    function nextImage() {
        if (pictureIndex <= (pictures.length - 2)) {
            let index = pictureIndex;
            index += 1;
            setPictureIndex(index);
        } else {
            return;
        }
    }

    function previousImage() {
        if (pictureIndex > 0) {
            let index = pictureIndex;
            index -= 1;
            setPictureIndex(index);
        } else {
            return;
        }
    }

    return ( 
        <div className='page'>

            { imgActive && <div className={styles.popup}>
                <div className={styles.topBar}>
                    <p>{pictures[pictureIndex].name}</p>
                    <img onClick={() => setImgActive(false)} className={styles.closeBtn} src={require('../images/close.png')} alt="" />
                </div>
                <img onClick={nextImage} className={styles.rightBtn} src={require('../images/arrow.png')} alt="" />
                <img onClick={previousImage} className={styles.leftBtn} src={require('../images/arrow.png')} alt="" />
                <img className={styles.largeImage} src={pictures[pictureIndex].bigpicture} alt="" />
            </div> }

            <br /><br />
            <div className={styles.gridContainer}>
            {pictures.map((element, index) =>
                <div key={element.id}>
                    <Card onClick={() => setActivePicture(index)} className={styles.image} style={{ width: '18rem' }} bg='light'>
                        <Card.Img src={element.thumbnail} alt={element.name} />
                    </Card>
                </div> )}    
            </div>
        </div> );
}

export default Photography;