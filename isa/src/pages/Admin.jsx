import { useContext, useEffect, useState } from 'react';
import styles from '../css/Admin.module.css';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import AuthContext from "../components/AuthContext";

function Admin() {

    const [pictures, setPictures] = useState([]);
    const categories = [...new Set(pictures.map(e => e.category))].sort();
    const [filteredPictures, setFilteredPictures] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
            });
    }, []);

    function filterByCategory(categoryClicked) {
        if (categoryClicked === 'all') {
            setFilteredPictures(pictures);
            setActiveCategory('all');
        } else {
            const result = pictures.filter(element => element.category === categoryClicked);
            setFilteredPictures(result);
            setActiveCategory(categoryClicked);
        }
    }

    function deletePicture(pictureClicked) {
        const index = pictures.findIndex(element => element.id === pictureClicked.id);
        pictures.splice(index,1);
        setPictures(pictures.slice());
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json', {
            method: 'PUT',
            body: JSON.stringify(pictures)
        });
        filterByCategory(activeCategory);
    }
    
    return ( 
        <div className='page'>
            <span className={styles.categoryBtn}><b>Categories:</b></span>
            <Button variant='outline-primary' size='sm' className={styles.categoryBtn} onClick={() => filterByCategory('all')}>all</Button>
            {categories.map(category => 
                <span key={category}>
                    <Button variant='outline-primary' size='sm' className={styles.categoryBtn} onClick={() => filterByCategory(category)}>
                        {category}
                    </Button>
                </span> )}
            
            <div>
                <Link to='/add-picture'>
                    <Button variant='outline-primary' size='lg' className={styles.categoryBtn}>Add picture</Button>
                </Link>
                <Button variant='outline-primary' size='lg' className={styles.logoutBtn} onClick={() => authCtx.updateLoggedIn(false)}>Log out</Button>
            </div>

            <div className={styles.gridContainer}>
            {filteredPictures.map(element =>
                <div key={element.id}>
                    <Card className={styles.image} style={{ width: '18rem' }} bg='light'>
                        <Card.Img src={element.thumbnail} alt={element.name} />
                        <Card.Text>ID: {element.id} Name: {element.name} Category: {element.category}</Card.Text>
                        <ButtonGroup>
                            <Button variant='outline-primary'><Link to={'/edit-picture/' + element.id}>Edit</Link></Button>
                            <Button variant='outline-danger' onClick={() => deletePicture(element)}>Delete</Button>
                        </ButtonGroup>
                    </Card>
                </div> )}    
            </div> 
        </div> );
}

export default Admin;