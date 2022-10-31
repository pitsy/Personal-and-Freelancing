import { useContext, useEffect, useState } from 'react';
import styles from '../css/Admin.module.css';
import { Card, Button, ButtonGroup, Alert } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import AuthContext from "../components/AuthContext";

function Admin() {

    const [pictures, setPictures] = useState([]);
    const categories = [...new Set(pictures.map(e => e.category))].sort();
    const [filteredPictures, setFilteredPictures] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const authCtx = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState(false);
    const [tempPicId, setTempPicId] = useState('');

    // keyword variables
    let receivedKeywords = [];
    const [usedKeywords, setUsedKeywords] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
            });
    }, []);

    useEffect(() => {
        receivedKeywords = [];
        filteredPictures.forEach(element => receivedKeywords.push(...element.keywords));
        setUsedKeywords([...new Set(receivedKeywords)].sort());
    }, [filteredPictures]);

    function filterByCategory(categoryClicked) {
        setSelectedKeywords([]);
        if (categoryClicked === 'all') {
            setFilteredPictures(pictures);
            setActiveCategory('all');
        } else {
            let result = pictures.filter(element => element.category === categoryClicked);
            setFilteredPictures(result);
            setActiveCategory(categoryClicked);
        }
    }

    function deletePicture() {
        const index = pictures.findIndex(element => element.id === tempPicId);
        pictures.splice(index,1);
        setPictures(pictures.slice());
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json', {
            method: 'PUT',
            body: JSON.stringify(pictures)
        });
        filterByCategory(activeCategory);
        setShowAlert(false);
    }

    function alert(pictureClicked) {
        // trigger alert and save id of picture to be deleted
        setTempPicId(pictureClicked.id);
        setShowAlert(true);
    }

    function saveKeywords(keywords) {
        const getKeywords = JSON.stringify(keywords);
        sessionStorage.setItem('keywords', getKeywords)
    }

    // handle filtering pictures by keywords
    function searchKeyword(wordClicked) {
        // check if keyword is already selected
        const index = selectedKeywords.findIndex(element => element === wordClicked);
        if (index >= 0) {
            // remove keyword if it is already selected
            selectedKeywords.splice(index,1);
        } else {
            // add the new keyword if it was not previously selected
            selectedKeywords.push(wordClicked);
        }
        setSelectedKeywords(selectedKeywords.slice());
        // filter pictures which include the selected keywords
        let filteredResult = [];
        // separate cases since 'all' includes all categories
        if (activeCategory === 'all') {
            filteredResult = pictures;
            for (let i = 0; i < selectedKeywords.length; i++) {
                filteredResult = filteredResult.filter(element => element.keywords.indexOf(selectedKeywords[i]) >= 0);
                setFilteredPictures(filteredResult);
            }
        } else {
            filteredResult = pictures.filter(element => element.category === activeCategory);
            for (let i = 0; i < selectedKeywords.length; i++) {
                filteredResult = filteredResult.filter(element => element.keywords.indexOf(selectedKeywords[i]) >= 0);
                setFilteredPictures(filteredResult);
            }
        }
        if (selectedKeywords.length === 0) {
            filterByCategory(activeCategory);
        }
    }

    return ( 
        <div className='page'>
            {/* alert to confirm/cancel picture delete */}
            <Alert show={showAlert}>
                <Alert.Heading>Tahad sa kindlasti selle pildi kustutada?</Alert.Heading>
                <div>
                    <Button variant='outline-primary' className={styles.alertBtn} onClick={deletePicture}>Jah kustuta</Button> 
                    <Button variant='outline-primary' className={styles.alertBtn} onClick={() => setShowAlert(false)}>Ei</Button>
                </div>                
            </Alert>
            {/* map buttons for categories */}
            <span className={styles.categoryBtn}><b>Categories:</b></span>
            <Button variant='outline-primary' size='sm' className={styles.categoryBtn} onClick={() => filterByCategory('all')}>all</Button>
            {categories.map(category => 
                <span key={category}>
                    <Button variant='outline-primary' size='sm' className={styles.categoryBtn} onClick={() => filterByCategory(category)}>
                        {category}
                    </Button>
                </span> )}
            {/* various buttons */}
            <div>
                <Link to='/add-picture'>
                    <Button variant='outline-primary' size='lg' className={styles.categoryBtn}>Add picture</Button>
                </Link>
                <Button variant='outline-primary' size='lg' className={styles.logoutBtn} onClick={() => authCtx.updateLoggedIn(false)}>Log out</Button>
            </div>
            {/* keyword selection */}
            <div>
                {usedKeywords.map(element => 
                    <Button className={styles.mapKeywordBtn} key={element} size='sm' variant='outline-light'
                    onClick={() => searchKeyword(element)}>
                        {element}
                    </Button> )}
                {selectedKeywords.map(element => 
                <Button
                    key={element} className={styles.mapKeywordBtn} size='sm' variant='light'
                    onClick={() => searchKeyword(element)}>
                        {element}
                </Button>)}
            </div>
            {/* display the picture cards */}
            <div className={styles.gridContainer}>
            {filteredPictures.map(element =>
                <div key={element.id}>
                    <Card className={styles.image} style={{ width: '18rem' }} bg='light'>
                        <Card.Img src={element.thumbnail} alt={element.name} />
                        <Card.Text>
                            ID: {element.id} | 
                            Nimi: {element.name} | 
                            Kategooria: {element.category} | 
                            Märksõnad: {element.keywords} | 
                            Kuupäev: {element.date}
                        </Card.Text>
                        <ButtonGroup>
                            <Button 
                                variant='outline-primary' 
                                onClick={() => saveKeywords(element.keywords)}
                                href={'/edit-picture/' + element.id}>
                                    Edit
                            </Button>
                            <Button variant='outline-danger' onClick={() => alert(element)}>Delete</Button>
                        </ButtonGroup>
                    </Card>
                </div> )}    
            </div> 
        </div> );
}

export default Admin;