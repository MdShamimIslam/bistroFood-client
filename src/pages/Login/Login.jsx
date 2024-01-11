import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../../components/SocialLogin";

const Login = () => {
  const { signIn} = useAuth();
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
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        reset();
        toast.success("Login Successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };



  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident assumenda deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
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
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleCaptcha}
                  type="text"
                  placeholder="type your write captcha"
                  className="input input-bordered"
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button disabled={false} className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="divider">Or</div>
          </form>
          <SocialLogin></SocialLogin>
          <p className="text-center my-4">
            Create new Account ?{" "}
            <Link to={"/signUp"} className="text-orange-600 font-semibold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
