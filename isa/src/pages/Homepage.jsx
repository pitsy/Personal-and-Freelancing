import { useEffect, useState } from 'react';
import { Carousel } from "react-bootstrap";
import styles from '../css/Homepage.module.css';

function Homepage() {

    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
            });
    }, []);

    return ( 
        <div className={styles.homepage}>
            <Carousel className={styles.imgContainer}>
                {pictures.map(element =>
                    <Carousel.Item key={element.id}>
                        <img className={styles.image} src={element.bigpicture} alt={element.name} />
                    </Carousel.Item> )}
            </Carousel>
        </div> );
}

export default Homepage;