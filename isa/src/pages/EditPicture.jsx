import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styles from '../css/Admin.module.css';

function EditPicture() {

    const idRef = useRef();
    const nameRef = useRef();
    const categoryRef = useRef();
    const keywordRef = useRef();
    const dateRef = useRef();

    const navigate = useNavigate();
    const {id} = useParams(); // useParams always comes as a string
    const [pictures, setPictures] = useState([]);
    const [idUnique, setIdUnique] = useState(true);
    const [message, setMessage] = useState('');
    const [dbKeywords, setDbKeywords] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [keywordActive, setKeywordActive] = useState(false);
    const [categoryActive, setCategoryActive] = useState(false);
    const [categories, setCategories] = useState([]);

    const pictureFound = pictures.find(element => element.id === Number(id));
    const index = pictures.indexOf(pictureFound);
    const [selectedKeywords, setSelectedKeywords] = useState(JSON.parse(sessionStorage.getItem('keywords')) || []);

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
            });
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/keywords.json')
            .then(res => res.json())
            .then(data => {
                setKeywords(data || []);
                setDbKeywords(data || []);
            });
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/categories.json')
            .then(res => res.json())
            .then(data => {
                setCategories(data || []);
            });
    }, []);

    function checkIfFilled(ref, errorMessage) {
        if (ref.current.value === '') {
            setMessage(errorMessage);
            return true;
        }
    }

    function updatePicture() {
        const idNotFilled = checkIfFilled(idRef, 'ID on täitmata');
        const nameNotFilled = checkIfFilled(nameRef, 'Nimi on täitmata');
        const categoryNotFilled = checkIfFilled(categoryRef, 'Kategooria on täitmata');

        if (idNotFilled || nameNotFilled || categoryNotFilled) {
            return;
        } else if(selectedKeywords.lenght === 0) { 
            setMessage('Märksõnad on täitmata');
            return;
        }

        const newPicture = {
            id: Number(idRef.current.value),
            name: nameRef.current.value,
            thumbnail: pictureFound.thumbnail,
            bigpicture: pictureFound.bigpicture,
            category: categoryRef.current.value,
            keywords: selectedKeywords,
            date: dateRef.current.value
        }

        pictures[index] = newPicture;
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json', {
            method: 'PUT',
            body: JSON.stringify(pictures),
        }).then(() => navigate('/admin')) // navigate back only after fetching
    }

    function checkIdUniqueness() {
        const index = pictures.findIndex(element => element.id === Number(idRef.current.value));
        if (index >= 0 && pictureFound.id !== Number(idRef.current.value)) {
            setIdUnique(false);
            setMessage('Sisestasid mitteunikaalse ID!');
        } else {
            setIdUnique(true);
            setMessage('');
        }
    }

    function addNewKeyword() {
        selectedKeywords.push(keywordRef.current.value);
        setSelectedKeywords(selectedKeywords.slice());
        dbKeywords.push(keywordRef.current.value);
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/keywords.json', {
            method: 'PUT',
            body: JSON.stringify(dbKeywords),
        });
        keywordRef.current.value = '';
        searchKeywords();
    }

    function searchKeywords() {
        const result = dbKeywords.filter(element => element.toLowerCase().includes(keywordRef.current.value.toLowerCase()));
        setKeywords(result);
    }

    function selectKeyword(element) {
        selectedKeywords.push(element);
        setSelectedKeywords(selectedKeywords.slice());
    }

    function removeSelectedKeyword(index) {
        selectedKeywords.splice(index,1);
        setSelectedKeywords(selectedKeywords.slice());
    }

    function selectCategory(element) {
        categoryRef.current.value = element;
    }

    function dropdown(value) {
        if (value === 1) {
            setKeywordActive(true);
        } else if (value === 2) {
            setCategoryActive(true);
        }       
    }

    return ( 
        <div className="page">
            <br /> <br />
            <div>{message}</div>
            { pictureFound !== undefined && 
                <div>
                    <label className="white-text">ID </label> <br />
                    <input onChange={checkIdUniqueness} ref={idRef} defaultValue={pictureFound.id} type="number" /> <br />
                    <label className="white-text">Nimi </label> <br />
                    <input ref={nameRef} defaultValue={pictureFound.name} type="text" /> <br /> 
                    <label className="white-text">Pilt </label> <br />
                    <div>
                        <img src={pictureFound.thumbnail} alt="" />
                    </div>
                    <br />
                    <label>Kuupäev </label> <br />
                    <input ref={dateRef} type="text" defaultValue={pictureFound.date} /> <br />
                    <label>Kategooria </label> <br />
                    <div>
                        <input ref={categoryRef} type="text" onClick={() => dropdown(2)} defaultValue={pictureFound.category}/> 
                        {categoryActive && <nav className={styles.categorySearchNav}>
                            <ul>
                                {categories.map(element =>
                                    <div key={element.category} 
                                        className={styles.searchElement} 
                                        onClick={() => selectCategory(element.category)}>
                                            {element.category}
                                    </div> )}
                            </ul>
                        </nav>}
                    </div>
                    <label>Märksõnad </label> <br />
                    <div>
                        <input ref={keywordRef} type="text" onChange={searchKeywords} onClick={() => dropdown(1)}/> 
                        <Button className={styles.keywordBtn} variant='outline-light' size='sm' onClick={addNewKeyword}>Lisa märksõna</Button>
                        {keywordActive && <nav className={styles.searchNav}>
                            <ul>
                                {keywords.map(element =>
                                    <div key={element} className={styles.searchElement} onClick={() => selectKeyword(element)}>{element}</div> )}
                            </ul>
                        </nav>}
                    </div>
                    {selectedKeywords.map((element, index) => 
                        <span className={styles.keyword} key={element}>
                            {element} 
                            <button className={styles.keywordRemoveBtn} onClick={() => removeSelectedKeyword(index)}>X</button>
                        </span> 
                    )}
                    <br /> <br />
                    <Button disabled={!idUnique} onClick={updatePicture} variant='outline-primary'>Muuda pilti</Button>
                </div>}
                { pictureFound === undefined && <div>Pilti ei leitud</div> }
                <br /><br />
        </div> );
}

export default EditPicture;
