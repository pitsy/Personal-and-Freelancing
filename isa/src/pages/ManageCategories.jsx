import { useRef, useEffect, useState } from "react";
import styles from '../css/Admin.module.css';

function ManageCategories() {

    const [pictures, setPictures] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const usedCategories = [...new Set(pictures.map(e => e.category))].sort();

    const newCategoryRef = useRef();
    // set the Private (false) / Public (true) status of categories
    const [status, setStatus] = useState(false)

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
            });
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/categories.json')
        .then(res => res.json())
        .then(data => {
            setAllCategories(data || []);
        });
    }, []);

    function saveChanges() {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/categories.json', {
            method: 'PUT',
            body: JSON.stringify(allCategories),
        });
    }

    function deleteCategory(index) {
        allCategories.splice(index,1);
        setAllCategories(allCategories.slice());
        saveChanges();
    }

    function addCategory() {
        const newCategory = {
            category: newCategoryRef.current.value,
            public: status
        }
        allCategories.push(newCategory);
        setAllCategories(allCategories.slice());
        saveChanges();
    }

    // change Public / Private status of category
    function changeStatus(index) {
        allCategories[index].public = !allCategories[index].public;
        setAllCategories(allCategories.slice());
        saveChanges();
    }

    return ( 
        <div className="page">
            <br />
            <div><h3>Halda kategooriaid</h3></div>
            <br />
            <div><b>Kasutuses kategooriad:</b></div> 
            <br />
            { usedCategories.sort().map(element => 
            <div key={element}>
                <span key={element}>
                    {element} 
                </span> 
            </div> )}
            <br /> 
            <div><b>Kõik kategooriad:</b></div> 
            <br />
            { allCategories.sort().map((element, index) => 
            <div key={index}>
                <span>{element.category}</span>
                <button className={styles.categoryRemoveBtn} onClick={() => changeStatus(index)}>{element.public ? 'Avalik' : 'Privaatne'}</button>
                <button className={styles.categoryRemoveBtn} onClick={() => deleteCategory(index)}>X</button>
            </div> )}
            <br /> 
            <div><b>Lisa kategooria:</b></div> 
            <br />
            <input type="text" ref={newCategoryRef} placeholder='Uus kategooria'/>
            <button className={styles.categoryRemoveBtn} onClick={() => setStatus(!status)}>{status ? 'Avalik' : 'Privaatne'}</button>
            <button className={styles.categoryRemoveBtn} onClick={addCategory}>Lisa</button>
        </div> );
}

export default ManageCategories;