import { useState } from 'react';
import picturesFromFile from '../carouselPics.json';
import { Carousel } from "react-bootstrap";
import styles from '../css/Homepage.module.css';

function Homepage() {

    const [pictures, setPictures] = useState(picturesFromFile);

    return ( 
        <div className={styles.homepage}>
            <Carousel className={styles.imgContainer}>
                {pictures.map(element =>
                    <Carousel.Item key={element.id}>
                        <img className={styles.image} src={element.image} alt={element.name} />
                    </Carousel.Item> )}
            </Carousel>
        </div> );
}

export default Homepage;