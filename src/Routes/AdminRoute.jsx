import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [isAdmin,isAdminLoading] = useAdmin();
    if (loading || isAdminLoading) {
      return (
        <div className="flex justify-center">
          <span className="loading loading-bars  my-56 w-[100px]"></span>
        </div>
      );
    }
  
    if (user && isAdmin) {
      return children;
    }
  
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;