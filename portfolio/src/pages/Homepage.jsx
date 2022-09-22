import styles from '../css/Homepage.module.css';

function Homepage() {
    return ( 
        <div>
            <div className={styles.scrollContainer}>
                <div className={styles.scrollArea}>1</div>
                <div className={styles.scrollArea}>2</div>
                <div className={styles.scrollArea}>3</div>
                <div className={styles.scrollArea}>4</div>
            </div>
        </div> );
}

export default Homepage;