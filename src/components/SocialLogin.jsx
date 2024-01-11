import React from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';

const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = () => {
        googleSignIn()
          .then((result) => {
            const user = result.user;
            
            const userInfo = {
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
              };
              axiosPublic.post("/users", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  toast.success("Sign Up Successfully!");
                  navigate(from, { replace: true });
                }
                else{
                    toast.success("Sign Up Successfully!");
                    navigate(from, { replace: true });
                }
              });
           
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
    

    return (
        <div>
           
            <div  className="flex justify-center -mt-6 mb-2">
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-5/6"
              >
                <FaGoogle /> Login  With Google
              </button>
            </div>
            
        </div>
    );
};

export default SocialLogin;