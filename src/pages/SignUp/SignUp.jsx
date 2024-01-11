import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, userProfileUpdate } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        userProfileUpdate(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              image: data.photoURL,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                reset();
                toast.success("Sign Up Successfully!");
                navigate(from, { replace: true });
              }
            });
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident assumenda deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name")}
                  type="name"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  {...register("photoURL")}
                  type="text"
                  placeholder="photoURL"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", {
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    minLength: 6,
                    maxLength: 15,
                  })}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">At least 6 characters</span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600">Minimum 15 characters</span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    At least one uppercase,lowercase,special character,number
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
              <div className="divider">Or</div>
            </form>
            <div>
              <SocialLogin></SocialLogin>
            </div>
            <p className="text-center mb-4">
              Already have an Account ?
              <Link to={"/login"} className="text-orange-600 font-semibold"> Login
               
                
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
