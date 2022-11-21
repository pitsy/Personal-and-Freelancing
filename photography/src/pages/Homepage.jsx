import { useState } from 'react';
import { Carousel } from "react-bootstrap";
import styles from '../css/Homepage.module.css';
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';

function Homepage() {

    const [pictures, setPictures] = useState([img1, img2, img3]);

    // useEffect(() => {
    //     fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             setPictures(data || []);
    //         });
    // }, []);

    return ( 
        <div>
            <Carousel fade indicators={false} controls={false} className={styles.imgContainer}>
                {pictures.map(element =>
                    <Carousel.Item key={element}>
                        <img className={styles.image} src={element} alt='' />
                    </Carousel.Item> )}
            </Carousel>
            {/* <img className='background-image' src={backgroundImg} alt="" /> */}
        </div> );
}

export default Homepage;