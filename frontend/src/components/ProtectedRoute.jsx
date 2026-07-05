// Protect routes and handle edge cases

import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';


function ProtectedRoute({ children, requiredRole }) {
    const { user } = useAuth();

    // if no user redirect to login page
    if(!user) {
        return (<Navigate to="/login"/>);
    } 

    // if a requiredRole is there and user role doesn't match
    // * This logic of requiredRole if needed any is left to App.jsx where props are passed
    if (requiredRole && user.role !== requiredRole) {
        return (<Navigate to="/unauthorized"/>);
    }
    
    return children;
}

export default ProtectedRoute;