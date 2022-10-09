import { useEffect, useState } from "react";
import { useRef } from "react";

function AddPicture() {

    const idRef = useRef();
    const nameRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();

    const [thumbnails, setThumbnails] = useState([]);
    const [idUnique, setIdUnique] = useState(true);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        fetch('https://isaleht-7a2e8-default-rtdb.europe-west1.firebasedatabase.app/thumbnails.json')
            .then(res => res.json())
            .then(data => {
                setThumbnails(data || []);
            });
    }, []);

    return ( 
        <div className="page">
            <h1>Add picture</h1>
            <div>{message}</div>
            <label>ID </label> <br />
            <input ref={idRef} type="number" /> <br />

        </div> );
}

export default AddPicture;