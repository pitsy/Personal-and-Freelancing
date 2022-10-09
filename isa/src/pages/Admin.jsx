import { useEffect, useState } from 'react';
import styles from '../css/Admin.module.css';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import {Routes, Route, Link} from 'react-router-dom';
import AddPicture from './AddPicture';

function Admin() {

    const [thumbnails, setThumbnails] = useState([]);
    const [bigPictures, setBigPictures] = useState([]);
    const categories = [...new Set(thumbnails.map(e => e.category))].sort();
    const [filteredPictures, setFilteredPictures] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/thumbnails.json')
            .then(res => res.json())
            .then(data => {
                setThumbnails(data || []);
            });
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/big-pictures.json')
            .then(res => res.json())
            .then(data => {
                setBigPictures(data || []);
            });
    }, []);

    function filterByCategory(categoryClicked) {
        if (categoryClicked === 'all') {
            setFilteredPictures(thumbnails);
            setActiveCategory('all');
        } else {
            const result = thumbnails.filter(element => element.category === categoryClicked);
            setFilteredPictures(result);
            setActiveCategory(categoryClicked);
        }
    }

    function deletePicture(pictureClicked) {
        const index = thumbnails.findIndex(element => element.id === pictureClicked.id);
        thumbnails.splice(index,1);
        setThumbnails(thumbnails.slice());
        bigPictures.splice(index,1);
        setBigPictures(bigPictures.slice());
        // fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/thumbnails.json', {
        //     method: 'PUT',
        //     body: JSON.stringify(thumbnails)
        // });
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
                <Button variant='outline-primary' size='lg' className={styles.categoryBtn}><Link to='/add-picture'>Add picture</Link></Button>
            </div>

            <div className={styles.gridContainer}>
            {filteredPictures.map((element, index) =>
                <div key={element.id}>
                    <Card className={styles.image} style={{ width: '18rem' }} bg='light'>
                        <Card.Img src={element.image} alt={element.name} />
                        <Card.Text>ID: {element.id} Name: {element.name} Category: {element.category}</Card.Text>
                        <ButtonGroup>
                            <Button variant='outline-primary'>Edit</Button><Button variant='outline-danger' onClick={() => deletePicture(element)}>Delete</Button>
                        </ButtonGroup>
                    </Card>
                </div> )}    
            </div>

            
            <Routes>
                <Route path='add-picture' element={ <AddPicture /> } />
            </Routes>
        </div> );
}

export default Admin;