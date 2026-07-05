// Provide accessToken with react context 

import { createContext, useContext, useState } from "react";


// the context object
const AuthContext = createContext();

// the component providing the context downward to the components wrapped by thi
function AuthProvider({ children }) {

    // JSON.parse(null) returns null if it doesn't exist
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
    
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    // to be called from Login.jsx
    function login(userData, tokenValue) {
        setUser(userData);
        setToken(tokenValue);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );
        localStorage.setItem(
            "token",
            tokenValue
        );
    }

    // to be called from logout button
    function logout() {
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext value={{user, token, login, logout}}>
            {children}
        </AuthContext>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };