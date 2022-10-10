import { useEffect, useState } from "react";
import { useRef } from "react";
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import FileUpload from '../components/FileUpload'

function AddPicture() {

    const idRef = useRef();
    const nameRef = useRef();
    const thumbnailRef = useRef();
    const bigPictureRef = useRef();
    const categoryRef = useRef();

    const [pictures, setPictures] = useState([]);
    const [idUnique, setIdUnique] = useState(true);
    const [message, setMessage] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [bigPicture, setBigPicture] = useState('');
    const [showImage, setShowImage] = useState('upload');

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

    function addNewPicture() {
        const idNotFilled = checkIfFilled(idRef, 'ID on täitmata');
        const nameNotFilled = checkIfFilled(nameRef, 'Nimi on täitmata');
        const categoryNotFilled = checkIfFilled(categoryRef, 'Kategooria on täitmata');
        
        if (idNotFilled || nameNotFilled || categoryNotFilled) {
            return;
        }

        const newPicture = {
            id: Number(idRef.current.value),
            name: nameRef.current.value,
            thumbnail: showImage === 'url' ? thumbnailRef.current.value : thumbnail,
            bigpicture: showImage === 'url' ? bigPictureRef.current.value : bigPicture,
            category: categoryRef.current.value,
        }

        pictures.push(newPicture);
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/pictures.json', {
            method: 'PUT',
            body: JSON.stringify(pictures),
        });
        idRef.current.value = '';
        nameRef.current.value = '';
        categoryRef.current.value = '';
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

    return ( 
        <div className="page">
            <br /><br /><br />
            <h2>Add new picture</h2>
            <div>{message}</div> <br />
            <label>ID </label> <br />
            <input onChange={checkIdUniqueness} ref={idRef} type="number" /> <br />
            <label>Name </label> <br />
            <input ref={nameRef} type="text" /> <br />
            <label>Image </label> <br />
            <ButtonGroup className="mb-2">
                <ToggleButton id="url" type="radio" variant="outline-primary" name="radio" value="url" checked={showImage === "url"} onChange={() => setShowImage('url')}
                >
                    URL
                </ToggleButton>
                <ToggleButton id="upload" type="radio" variant="outline-primary" name="radio" value="upload" checked={showImage === "upload"} onChange={() => setShowImage('upload')}
                >
                    Upload
                </ToggleButton>
            </ButtonGroup>
            {showImage === 'url' && <div>Thumbnail <input ref={thumbnailRef} type="text" /></div> } <br />
            {showImage === 'url' && <div>Big picture <input ref={bigPictureRef} type="text" /></div> }
            {showImage === 'upload' && <div>Thumbnail</div> }
            {showImage === 'upload' && <FileUpload onSendPictureUrl={setThumbnail}/>}
            {showImage === 'upload' && <div>Big picture</div> }
            {showImage === 'upload' && <FileUpload onSendPictureUrl={setBigPicture}/>} 
            <br />
            <label>Category </label> <br />
            <input ref={categoryRef} type="text" /> <br /> <br />
            <Button variant='outline-primary' size='lg' disabled={!idUnique} onClick={addNewPicture}>Add picture</Button>
        </div> );
}

export default AddPicture;