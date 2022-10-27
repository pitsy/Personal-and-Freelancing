import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function EditPicture() {

    const idRef = useRef();
    const nameRef = useRef();
    const categoryRef = useRef();

    const navigate = useNavigate();
    const {id} = useParams(); // useParams always comes as a string
    const [pictures, setPictures] = useState([]);
    const [idUnique, setIdUnique] = useState(true);
    const [message, setMessage] = useState('');

    const pictureFound = pictures.find(element => element.id === Number(id));

    const index = pictures.indexOf(pictureFound);

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json')
            .then(res => res.json())
            .then(data => {
                setPictures(data || []);
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
        }

        const newPicture = {
            id: Number(idRef.current.value),
            name: nameRef.current.value,
            thumbnail: pictureFound.thumbnail,
            bigpicture: pictureFound.bigpicture,
            category: categoryRef.current.value,
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

    return ( 
        <div className="page">
            <br /> <br />
            <div>{message}</div>
            { pictureFound !== undefined && 
                <div>
                    <label className="white-text">ID </label> <br />
                    <input onChange={checkIdUniqueness} ref={idRef} defaultValue={pictureFound.id} type="number" /> <br />
                    <label className="white-text">Name </label> <br />
                    <input ref={nameRef} defaultValue={pictureFound.name} type="text" /> <br /> 
                    <label className="white-text">Image </label> <br />
                    <div>
                        <img src={pictureFound.thumbnail} alt="" />
                    </div>
                    <br />
                    <label className="white-text">Category </label> <br />
                    <input ref={categoryRef} defaultValue={pictureFound.category} type="text" /> <br /> <br />
                    <Button disabled={!idUnique} onClick={updatePicture} variant='outline-primary'>Muuda pilti</Button>
                </div>}
                { pictureFound === undefined && <div>Pilti ei leitud</div> }
        </div> );
}

export default EditPicture;
