import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
       const unSubscribe= onAuthStateChanged(auth,currentUser => {
            setUser(currentUser);

            if(currentUser){
                const userInfo = { email : currentUser?.email };
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    const token = res.data.token;
                    if(token){
                        localStorage.setItem('access-token',token);
                        setLoading(false);
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }

            
        })
        return ()=> unSubscribe();
    },[])

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword (auth,email,password)
    }

    const signIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider)

    }

    const logOut=()=>{
        setLoading(true);
        return signOut(auth)
    }

    const userProfileUpdate = (name,photoURL)=>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL })
          
    }

    const authInfo={
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        userProfileUpdate,
        
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;