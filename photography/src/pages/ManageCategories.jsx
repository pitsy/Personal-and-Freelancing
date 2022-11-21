import { useRef, useEffect, useState } from "react";
import styles from '../css/Admin.module.css';

function ManageCategories() {

    const [pictures, setPictures] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const usedCategories = [...new Set(pictures.map(e => e.category))].sort();

    const newCategoryRef = useRef();
    // set the Private (false) / Public (true) status of categories
    const [status, setStatus] = useState(false)
    // ref for changing category name 
    const nameRef = useRef();
    // save name of selected category
    const [categorySelected, setCategorySelected] = useState('none');

    useEffect(() => {
        fetch('https://photography-c4b7e-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
            });
        fetch('https://photography-c4b7e-default-rtdb.europe-west1.firebasedatabase.app/categories.json')
        .then(res => res.json())
        .then(data => {
            setAllCategories(data || []);
        });
    }, []);

    function saveChanges() {
        fetch('https://photography-c4b7e-default-rtdb.europe-west1.firebasedatabase.app/categories.json', {
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

    function changeName() {
        // find index in categories array and update
        const index = allCategories.findIndex(element => element.category === categorySelected);
        allCategories[index].category = nameRef.current.value;
        setAllCategories(allCategories.slice());
        saveChanges();
        // change category name in pictures array
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i].category === categorySelected) {
                pictures[i].category = nameRef.current.value;
            }
        }
        fetch('https://photography-c4b7e-default-rtdb.europe-west1.firebasedatabase.app/pictures.json', {
            method: 'PUT',
            body: JSON.stringify(pictures)
        });
        // reset after completing function
        nameRef.current.value = '';
        setCategorySelected('none');
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
                <button className={styles.categoryRemoveBtn} onClick={() => setCategorySelected(element.category)}>Muuda nime</button>
                <button className={styles.categoryRemoveBtn} onClick={() => changeStatus(index)}>{element.public ? 'Avalik' : 'Privaatne'}</button>
                <button className={styles.categoryRemoveBtn} onClick={() => deleteCategory(index)}>X</button>
            </div> )}
            {categorySelected !== 'none' && 
                <div>
                    <br />
                    <input type="text" ref={nameRef} placeholder={categorySelected}/> 
                    <button className={styles.categoryRemoveBtn} onClick={changeName}>Uuenda nime</button>
                </div>
            }
            <br /> 
            <div><b>Lisa kategooria:</b></div> 
            <br />
            <input type="text" ref={newCategoryRef} placeholder='Uus kategooria'/>
            <button className={styles.categoryRemoveBtn} onClick={() => setStatus(!status)}>{status ? 'Avalik' : 'Privaatne'}</button>
            <button className={styles.categoryRemoveBtn} onClick={addCategory}>Lisa</button>            
        </div> );
}

export default ManageCategories;