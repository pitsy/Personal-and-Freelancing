import styles from '../css/Homepage.module.css';

function Homepage() {
    return ( 
        <div>
            <div className={styles.scrollContainer}>
                <div className={styles.scrollArea}>Frontend Developer.</div>
                <div className={styles.scrollArea}>Design and Engineering</div>
                <div className={styles.scrollArea}>Experience</div>
                <div className={styles.scrollArea}>See my work</div>
            </div>
        </div> );
}

export default Homepage;