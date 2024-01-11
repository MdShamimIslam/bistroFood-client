import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const {user,loading}=useAuth();
    const axiosSecure = useAxiosSecure();
   
    const{ data:cart=[], refetch } = useQuery({
        // enabled:!loading && !!user?.email,
        queryKey:['carts', user?.email],
        queryFn:async()=>{
            const res =await axiosSecure.get(`/carts/?email=${user?.email}`);
           return res.data;
        }
    });
    return [cart,refetch]
};

export default useCart;