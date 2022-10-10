import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../components/AuthContext";
import { Button } from 'react-bootstrap';

function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const firebaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzEW2rbQMaBUXRvtQsUt2hl_PhFZVkTMs';
    const [message, setMessage] = useState('');

    function login() {
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            returnSecureToken: true
        }

        fetch(firebaseUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }
        }).then(res => res.json()) // body+headers+http status code+time
            .then(body => {
                // display message to the user through useState
                if (body.error) {
                    setMessage('something went wrong'); // body.error.message
                } else {
                    setMessage('');
                    authCtx.updateLoggedIn(true);
                    navigate('/admin');
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                }
            });
    }

    return ( 
        <div className="page">
            <br /> <br /> <br />
            <div>{message}</div>
            <label>E-mail</label> <br />
            <input ref={emailRef} type="text" /> <br />
            <label>Password</label> <br />
            <input ref={passwordRef} type="password" /> <br /> <br />
            <Button variant="outline-primary" onClick={login}>Log in</Button>
        </div> );
}

export default Login;