import { useEffect, useState } from "react";
import { useRef } from "react";
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import FileUpload from '../components/FileUpload'
import styles from '../css/Admin.module.css';

function AddPicture() {

    const idRef = useRef();
    const nameRef = useRef();
    const thumbnailRef = useRef();
    const bigPictureRef = useRef();
    const categoryRef = useRef();
    const keywordRef = useRef();
    const dateRef = useRef();

    const [pictures, setPictures] = useState([]);
    const [defaultId, setDefaultId] = useState('');
    const [idUnique, setIdUnique] = useState(true);
    const [message, setMessage] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [bigPicture, setBigPicture] = useState('');
    const [showImage, setShowImage] = useState('upload');
    const [dbKeywords, setDbKeywords] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [keywordActive, setKeywordActive] = useState(false);
    const [categoryActive, setCategoryActive] = useState(false);
    const categories = [...new Set(pictures.map(e => e.category))].sort();

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
                setDefaultId(data.length + 1);
            });
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/keywords.json')
            .then(res => res.json())
            .then(data => {
                setKeywords(data || []);
                setDbKeywords(data || []);
            });
    }, []);

    function checkIfFilled(ref, errorMessage) {
        if (ref.current.value === '') {
            setMessage(errorMessage);
            return true;
        }
    }

    function addNewPicture() {
        const idNotFilled = checkIfFilled(idRef, 'ID on täitmata');
        const nameNotFilled = checkIfFilled(nameRef, 'Nimi on täitmata');
        const categoryNotFilled = checkIfFilled(categoryRef, 'Kategooria on täitmata');
        const dateNotFilled = checkIfFilled(dateRef, 'Kuupäev on täitmata');
        
        if (idNotFilled || nameNotFilled || categoryNotFilled || dateNotFilled) {
            return;
        } else if(selectedKeywords.lenght === 0) { 
            setMessage('Märksõnad on täitmata');
            return;
        }

        const newPicture = {
            id: Number(idRef.current.value),
            name: nameRef.current.value,
            thumbnail: showImage === 'url' ? thumbnailRef.current.value : thumbnail,
            bigpicture: showImage === 'url' ? bigPictureRef.current.value : bigPicture,
            date: dateRef.current.value,
            category: categoryRef.current.value,
            keywords: selectedKeywords,
        }

        pictures.push(newPicture);
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json', {
            method: 'PUT',
            body: JSON.stringify(pictures),
        });
        idRef.current.value = '';
        nameRef.current.value = '';
        categoryRef.current.value = '';
        dateRef.current.value = '';
        thumbnailRef.current.value = '';
        bigPictureRef.current.value = '';
        setSelectedKeywords([]);
        setMessage('');
        // add toast
    }

    function checkIdUniqueness() {
        const index = pictures.findIndex(element => element.id === Number(idRef.current.value));
        if (index >= 0) {
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
            <br /><br /><br />
            <h2>Lisa uus pilt</h2>
            <div>{message}</div> <br />
            <label>ID </label> <br />
            <input onChange={checkIdUniqueness} defaultValue={defaultId} ref={idRef} type="number" /> <br />
            <label>Nimi </label> <br />
            <input ref={nameRef} type="text" /> <br />
            <label>Pilt </label> <br />
            <ButtonGroup className="mb-2">
                <ToggleButton 
                    id="url" 
                    type="radio" 
                    variant="outline-primary" 
                    name="radio" value="url" 
                    checked={showImage === "url"} 
                    onChange={() => setShowImage('url')}
                >
                    URL
                </ToggleButton>
                <ToggleButton 
                    id="upload" 
                    type="radio" 
                    variant="outline-primary" 
                    name="radio" value="upload" 
                    checked={showImage === "upload"} 
                    onChange={() => setShowImage('upload')}
                >
                    Upload
                </ToggleButton>
            </ButtonGroup>
            {showImage === 'url' && <div>Thumbnail <input ref={thumbnailRef} type="text" /></div> } <br />
            {showImage === 'url' && <div>Suur pilt <input ref={bigPictureRef} type="text" /></div> }
            {showImage === 'upload' && <div>Thumbnail</div> }
            {showImage === 'upload' && <FileUpload onSendPictureUrl={setThumbnail}/>}
            {showImage === 'upload' && <div>Suur pilt</div> }
            {showImage === 'upload' && <FileUpload onSendPictureUrl={setBigPicture}/>}
            <label>Kuupäev </label> <br />
            <input ref={dateRef} type="text" placeholder="YYYY-MM-DD" /> <br />
            <label>Kategooria </label> <br />
            <div>
                <input ref={categoryRef} type="text" onClick={() => dropdown(2)}/> 
                {categoryActive && <nav className={styles.categorySearchNav}>
                    <ul>
                        {categories.map(element =>
                            <div key={element} className={styles.searchElement} onClick={() => selectCategory(element)}>{element}</div> )}
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
            <Button variant='outline-primary' size='lg' disabled={!idUnique} onClick={addNewPicture}>Add picture</Button>
            <br /> <br />
        </div> );
}

export default AddPicture;