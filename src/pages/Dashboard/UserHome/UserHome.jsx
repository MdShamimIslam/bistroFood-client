import React from 'react';
import useAuth from '../../../hooks/useAuth';

const UserHome = () => {
    const {user} = useAuth();
    return (
        <div>
            <h3 className="text-2xl">Hey, Welcome <span className="font-semibold text-purple-600">{user?.displayName}</span></h3>
        </div>
    );
};

export default UserHome;