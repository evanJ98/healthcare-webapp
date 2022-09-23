import React from "react";
import { Navigate } from 'react-router-dom';
import { getToken } from '../service/AuthService';

const PublicRoute = ({ children }) => {
    if (getToken()) {
        return <Navigate to="/patient" />
    }
    return children;

}

export default PublicRoute