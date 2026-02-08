import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Hooks/Loading';
import { Navigate, useLocation } from 'react-router';
import useRole from '../Hooks/useRole';
import Forbidden from './../Error/Forbidden/Forbidden';

const BorrowerRoute = ({ children }) => {
    const {user, loading} = useAuth()
    const location = useLocation()
    const {role, roleLoading} = useRole()
    console.log(location)

    if(loading || roleLoading) {
        return <Loading></Loading>
    }
    if(role.role !== 'borrower'){
        return <Forbidden></Forbidden>
    }
    if(!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }

    return children
};

export default BorrowerRoute;