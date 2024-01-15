
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const {user,loading}=useAuth();
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
   
    const{ data:isAdmin,isLoading:isAdminLoading} = useQuery({
        queryKey:['isAdmin', user?.email],
        enabled:!loading,
        queryFn:async()=>{
            const res =await axiosPublic.get(`/users/admin/${user?.email}`);
            console.log(res?.data?.admin);
           return res.data?.admin;
        }
    });
    return [isAdmin,isAdminLoading]
};

export default useAdmin;