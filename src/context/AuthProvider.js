// https://www.youtube.com/watch?v=X3qyxo_UTR4
import { createContext, useContext, useEffect, useState} from 'react';
import React from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        console.log("in auth provider: ", auth);
    }, [auth])
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth =() => {
    return useContext(AuthContext);
}
export default AuthContext;
export {useAuth};

// https://www.robinwieruch.de/react-router-authentication/
// import { createContext, useContext, useState} from 'react';
// import React from 'react';

// const AuthContext = createContext();

// function AuthProvider(props) {
//     const [auth, setAuth] = useState();
 
//     return (
//         <AuthContext.Provider value={{auth, setAuth}}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }

// const useAuth =() => {
//     return useContext(AuthContext);
// }
// export default AuthContext;
// export {AuthProvider, useAuth};