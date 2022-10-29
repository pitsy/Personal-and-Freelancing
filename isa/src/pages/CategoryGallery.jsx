import { useEffect, useState } from 'react';
import styles from '../css/Photography.module.css';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';

function CategoryGallery() {
    const [pictures, setPictures] = useState([]);
    const [dbPictures, setDbPictures] = useState([]);
    const [pictureIndex, setPictureIndex] = useState(0);
    const [imgActive, setImgActive] = useState(false);
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    // create array of unique keywords used in the pictures displayed
    let usedKeywords = [];
    const temp = pictures.forEach(element => addArrays(element.keywords));
    const uniqueUsedKeywords = [...new Set(usedKeywords)];
    
    const searchRef = useRef();

    const {category} = useParams(); // useParams always comes as a string
    // const pictureFound = pictures.find(element => element.category === category);

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
                setDbPictures(data.filter(element => element.category === category) || []);
            });
    }, []);

    function addArrays(array) {
        usedKeywords.push(...array);
    }

    function setActivePicture(picClicked) {
        setImgActive(true);
        setPictureIndex(picClicked);
    }

    function nextImage() {
        if (pictureIndex <= (pictures.filter(element => element.category === category).length - 2)) {
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

    function searchKeyword() {
        const result = dbPictures.filter(element => element.keywords.indexOf(searchRef.current.value) >= 0);
        setPictures(result);
    }

    return ( 
        <div className='page'>
            <div className={styles.searchContainer}>
                {/* <input ref={searchRef} className={styles.searchBar} onChange={searchKeyword} type="text" placeholder='Search'/> */}
                {uniqueUsedKeywords.map(element => 
                    <Button className={styles.keywordBtn} size='sm' variant='outline-light'>{element}</Button> )}
            </div>
            { imgActive && <div className={styles.popup}>
                <div className={styles.topBar}>
                    <p>{pictures.filter(element => element.category === category)[pictureIndex].name}</p>
                    <img onClick={() => setImgActive(false)} className={styles.closeBtn} src={require('../images/close.png')} alt="" />
                </div>
                <img onClick={nextImage} className={styles.rightBtn} src={require('../images/arrow.png')} alt="" />
                <img onClick={previousImage} className={styles.leftBtn} src={require('../images/arrow.png')} alt="" />
                <img className={styles.largeImage} src={pictures.filter(element => element.category === category)[pictureIndex].bigpicture} alt="" />
            </div> }

            <br />
            <div className={styles.gridContainer}>
            {pictures.filter(element => element.category === category).map((element, index) =>
                <div key={element.id}>
                    <Card onClick={() => setActivePicture(index)} className={styles.image} style={{ width: '18rem' }} bg='light'>
                        <Card.Img src={element.thumbnail} alt={element.name} />
                    </Card>
                </div> )}    
            </div>
        </div>
         );
}

export default CategoryGallery;