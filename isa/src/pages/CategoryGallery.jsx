import { useContext, useEffect, useRef, useState } from 'react';
import styles from '../css/Photography.module.css';
import { Card, Button,ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AuthContext from '../components/AuthContext';

function CategoryGallery() {
    const [pictures, setPictures] = useState([]);
    const [dbPictures, setDbPictures] = useState([]);
    const [pictureIndex, setPictureIndex] = useState(0);
    const [imgActive, setImgActive] = useState(false);
    const [sort, setSort] = useState('');
    const authCtx = useContext(AuthContext);

    const dateSearchRef = useRef();

    const {category} = useParams(); // useParams always comes as a string

    // keyword variables
    let receivedKeywords = [];
    const [usedKeywords, setUsedKeywords] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    
    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data.filter(element => element.category === category) || []);
                setDbPictures(data || []);
            });
    }, []);

    useEffect(() => {
        // filter pictures based on category and reset values ()
        setPictures(dbPictures.filter(element => element.category === category));
        setSelectedKeywords([]);
        setSort('');
        // dateSearchRef.current.value = '';
    }, [category, dbPictures]);

    useEffect(() => {
        receivedKeywords = [];
        pictures.forEach(element => receivedKeywords.push(...element.keywords));
        setUsedKeywords([...new Set(receivedKeywords)].sort());
    }, [pictures]);

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

    // handle filtering pictures by keywords
    function searchKeyword(wordClicked) {
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

    // sort pictures by the most recent date first
    function sortDateDesc() {
        setSort('newer');
        pictures.sort((a,b) => Number(b.date.replaceAll('-','')) - Number(a.date.replaceAll('-','')));
        setPictures(pictures.slice());
    }

    // sort pictures by the oldest date first
    function sortDateAsc() {
        setSort('older');
        pictures.sort((a,b) => Number(a.date.replaceAll('-','')) - Number(b.date.replaceAll('-','')));
        setPictures(pictures.slice());
    }

    // search and filter pictures by the date
    function searchByDate() {
        // filter pictures
        const result = dbPictures.filter(element =>
            element.date.replaceAll('-','').includes(dateSearchRef.current.value.replaceAll('-','')));
        setPictures(result);
        // filter again based on category selected
        setPictures(currentPictures => {
            return currentPictures.filter(element => element.category === category);
        })
    }

    return ( 
        <div className='page'>
            <h2 className={styles.header}>{category}</h2>
            { authCtx.isLoggedIn && 
                <div className={styles.uiGroup}>
                    <span className={styles.categoryBtn}><b>Sorteeri:</b></span>
                    <ButtonGroup className={styles.categoryBtn}>
                        <ToggleButton 
                            id="older" 
                            type="radio" 
                            variant='outline-primary'
                            checked={sort === 'older'}
                            onChange={sortDateAsc}
                            name="radio" value="older">Vanemad enne</ToggleButton>
                        <ToggleButton 
                            id="newer" 
                            type="radio" 
                            variant='outline-primary'
                            checked={sort === 'newer'}
                            onClick={sortDateDesc}
                            name="radio" value="newer">Uuemad enne</ToggleButton>
                    </ButtonGroup>
                    <span className={styles.categoryBtn}><b>Kuup??ev:</b></span>
                    <input type="text" ref={dateSearchRef} placeholder='YYYY-MM-DD' onChange={searchByDate}/>
                </div>
            }
            <div className={styles.searchContainer}>
                {usedKeywords.map(element =>
                // check if keyword has been selected before
                    <Button key={element} className={styles.keywordBtn} size='sm' variant='outline-dark'
                        onClick={() => searchKeyword(element)}>
                            {element}
                    </Button>
                )}
                {/* display selected keywords */}
                {selectedKeywords.map(element => 
                    <Button
                        key={element}
                        className={styles.keywordBtn}
                        size='sm'
                        variant='dark'
                        onClick={() => searchKeyword(element)}>
                            {element}
                    </Button>)}
            {/* image viewer popup, displays the thumbnail clicked */}
            </div>
            { imgActive && <div className={styles.popup}>
                <div className={styles.topBar}>
                    <div>{pictures[pictureIndex].name}{authCtx.isLoggedIn && <span className={styles.date}>{pictures[pictureIndex].date}</span> }</div>
                    <img onClick={() => setImgActive(false)} className={styles.closeBtn} src={require('../images/close.png')} alt="" />
                </div>
                <img onClick={nextImage} className={styles.rightBtn} src={require('../images/arrow.png')} alt="" />
                <img onClick={previousImage} className={styles.leftBtn} src={require('../images/arrow.png')} alt="" />
                <img className={styles.largeImage} src={pictures[pictureIndex].bigpicture} alt="" />
            </div> }
            <br />
            {/* picture gallery */}
            <div className={styles.gridContainer}>
                {pictures.map((element, index) =>
                    <div key={element.id}>
                        <Card onClick={() => setActivePicture(index)} className={styles.imageCard}>
                            <Card.Img src={element.thumbnail} className={styles.image} alt={element.name} />
                        </Card>
                    </div> )}    
            </div>
        </div>
         );
}

export default CategoryGallery;