import { useEffect, useState } from 'react';
import styles from '../css/Photography.module.css';
import { Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function CategoryGallery() {
    const [pictures, setPictures] = useState([]);
    const [dbPictures, setDbPictures] = useState([]);
    const [pictureIndex, setPictureIndex] = useState(0);
    const [imgActive, setImgActive] = useState(false);
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    const {category} = useParams(); // useParams always comes as a string

    // create array of unique keywords used in the pictures displayed
    // dbKeywords alternative is necessary to prevent error on category switch
    let usedKeywords = [];
    let usedDbKeywords = [];
    pictures.filter(element => element.category === category).forEach(element => addArrays(element.keywords));
    const uniqueUsedKeywords = [...new Set(usedKeywords)];
    dbPictures.filter(element => element.category === category).forEach(element => addDbArrays(element.keywords));
    const uniqueUsedDbKeywords = [...new Set(usedDbKeywords)];
    
    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
                setDbPictures(data || []);
            });
    }, []);

    function addArrays(array) {
        usedKeywords.push(...array);
    }

    function addDbArrays(array) {
        usedDbKeywords.push(...array);
    }

    function setActivePicture(picClicked) {
        const check = pictures.filter(element => element.category === category).length;
        if (check === 0) {
            setPictures(dbPictures.slice());
            selectedKeywords.splice(0,selectedKeywords.length)
            setSelectedKeywords(selectedKeywords.slice());
        }
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

    // handle filtering pictures by keywords
    function searchKeyword(wordClicked) {
        // initial check if pictures is empty -> empty selectedKeywords 
        // the keywords from the previous category carry over
        const check = pictures.filter(element => element.category === category).length;
        if (check === 0) {
            selectedKeywords.splice(0,selectedKeywords.length)
            setSelectedKeywords(selectedKeywords.slice());
        }
        // check if keyword is already selected
        const index = selectedKeywords.findIndex(element => element === wordClicked);
        let filteredResult = dbPictures.filter(element => element.category === category);
        if (index >= 0) {
            // remove keyword if it is already selected
            selectedKeywords.splice(index,1);
        } else {
            // add the new keyword if it was not previously selected
            selectedKeywords.push(wordClicked);
        }
        setSelectedKeywords(selectedKeywords.slice());
        // filter pictures which include the selected keywords
        for (let i = 0; i < selectedKeywords.length; i++) {
            filteredResult = filteredResult.filter(element => element.keywords.indexOf(selectedKeywords[i]) >= 0);
            setPictures(filteredResult);
        }
        // for loop doesn't run if removing keywords results in an empty array so it requires a special case
        if (selectedKeywords.length === 0) {
            setPictures(dbPictures.filter(element => element.category === category));
        }
    }

    return ( 
        <div className='page'>
            <div className={styles.searchContainer}>
                {uniqueUsedKeywords.map(element =>
                // check if keyword has been selected before
                    <Button key={element} className={styles.keywordBtn} size='sm' variant='outline-light'
                        onClick={() => searchKeyword(element)}>
                            {element}
                    </Button>
                )}
                {uniqueUsedKeywords.length === 0 && 
                // run incase unique keywords array becomes empty upon category change
                // doing so maintains the function of filtering the displayed keyword options
                    uniqueUsedDbKeywords.map(element => 
                        <Button key={element} className={styles.keywordBtn} size='sm' variant='outline-light'
                            onClick={() => searchKeyword(element)}>
                                {element}
                        </Button>
                        )
                }
                {/* hide this if the category was switched while keywords were selected */}
                {pictures.filter(element => element.category === category).length !== 0 && selectedKeywords.map(element => 
                    <Button
                        key={element}
                        className={styles.keywordBtn}
                        size='sm'
                        variant='light'
                        onClick={() => searchKeyword(element)}>
                            {element}
                    </Button>)}
            {/* image viewer popup, displays the thumbnail clicked */}
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
            {/* picture gallery */}
            <div className={styles.gridContainer}>
                {pictures.filter(element => element.category === category).length === 0 && 
                // case if pictures are filtered by keyword and then category changes (the pictures array becomes empty)
                // the fix in this case is to use dbPictures; this resets on reload or keyword filter
                    dbPictures.filter(element => element.category === category).map((element, index) =>
                    <div key={element.id}>
                        <Card onClick={() => setActivePicture(index)} className={styles.image} style={{ width: '18rem' }} bg='light'>
                            <Card.Img src={element.thumbnail} alt={element.name} />
                        </Card>
                    </div> )}
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