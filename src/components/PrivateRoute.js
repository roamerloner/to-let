import {Navigate, Outlet} from 'react-router-dom';
import React from 'react';
import useAuthState from '../hooks/useAuthState';

const PrivateRoute = () => {
    const loggedIn = useAuthState();
    console.log(loggedIn);

    return loggedIn ? <Outlet/> : <Navigate to='/signin'/>
}

export default PrivateRoute;