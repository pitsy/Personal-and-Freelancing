import { useRef } from "react";
import { useEffect, useState } from "react";
import styles from "../css/Admin.module.css";
import { Button } from 'react-bootstrap';

function ManageKeywords() {

    const [pictures, setPictures] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [dbKeywords, setDbKeywords] = useState([]);
    const [message, setMessage] = useState('');
    const [isUnique, setIsUnique] = useState(true);

    const keywordRef = useRef();
    const searchRef = useRef();

    useEffect(() => {
        fetch('https://photography-c4b7e-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
            });
        fetch('https://photography-c4b7e-default-rtdb.europe-west1.firebasedatabase.app/keywords.json')
            .then(res => res.json())
            .then(data => {
                setKeywords(data || []);
                setDbKeywords(data || []);
            });
    }, []);

    function deleteKeyword(selectedKeyword, keywordIndex) {;
        for (let i = 0; i < pictures.length; i++) {
            const index = pictures[i].keywords.findIndex(element => element === selectedKeyword);
            if (index >= 0) {
                pictures[i].keywords.splice(index,1);
                setPictures(pictures.slice());
            }            
        }
        fetch('https://photography-c4b7e-default-rtdb.europe-west1.firebasedatabase.app/pictures.json', {
            method: 'PUT',
            body: JSON.stringify(pictures),
        });
        keywords.splice(keywordIndex,1);
        setKeywords(keywords.slice());
        dbKeywords.splice(keywordIndex,1);
        fetch('https://photography-c4b7e-default-rtdb.europe-west1.firebasedatabase.app/keywords.json', {
            method: 'PUT',
            body: JSON.stringify(dbKeywords),
        });
    }

    function addNewKeyword() {
        dbKeywords.push(keywordRef.current.value);
        fetch('https://photography-c4b7e-default-rtdb.europe-west1.firebasedatabase.app/keywords.json', {
            method: 'PUT',
            body: JSON.stringify(dbKeywords),
        });
        keywordRef.current.value = '';
        searchKeywords();
    }

    function searchKeywords() {
        const result = dbKeywords.filter(element => element.toLowerCase().includes(searchRef.current.value.toLowerCase()));
        setKeywords(result);
    }

    function checkKeywordUniqueness() {
        const index = keywords.findIndex(element => element.toLowerCase() === keywordRef.current.value.toLowerCase());
        if (index >= 0) {
            setIsUnique(false);
            setMessage('Märksõna on juba olemas!');
        } else {
            setIsUnique(true);
            setMessage('');
        }
    }

    return ( <div className="page">
        <br />
        <div><h3>Halda märksõnu</h3></div>
        <br />
        <input type="text" ref={searchRef} onChange={searchKeywords} placeholder='Otsi märksõnu'/>
        <br /> <br />
        { keywords.sort().map((element, index) => 
            <span key={element}>
                <span className={styles.keyword} key={element}>
                    {element} 
                    <button className={styles.keywordRemoveBtn} onClick={() => deleteKeyword(element, index)}>X</button>
                </span> 
            </span> )}
        <br /> <br />
        <input type="text" ref={keywordRef} onChange={checkKeywordUniqueness} placeholder='Uus märksõna'/>
        <Button 
            className={styles.keywordBtn}
            variant="outline-light" 
            size="sm" 
            disabled={!isUnique} 
            onClick={addNewKeyword}>
                Lisa märksõna
        </Button>
        <br />
        <div>{message}</div>
    </div> );
}

export default ManageKeywords;