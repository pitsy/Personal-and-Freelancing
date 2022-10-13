import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    updateLoggedIn: (newLogIn) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(sessionStorage.getItem('loggedIn')) || false); 
    // json.parse

    function updateLoggedIn(newValue) {
        setIsLoggedIn(newValue);
        sessionStorage.setItem('loggedIn', newValue);
        console.log(newValue);
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            updateLoggedIn: updateLoggedIn
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;