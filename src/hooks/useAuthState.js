import React, {useState, useEffect} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const useAuthState = () => {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user){
                setLoggedIn(true);
            }
        })
    })
  return {loggedIn};
}

export default useAuthState;