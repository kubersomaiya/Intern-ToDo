import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import {  Navigate } from "react-router-dom";

export default function AdminRoute({children}) {
    const { currentUser } = useAuth();  
    if (currentUser) {
        if(currentUser.uid === "6t5HSIiuvvP5D7xhb7nWrhRa8PB3") {
            return children
        }
    }
    
    return (
        <Navigate to="/admin-panel" />
    )
}
