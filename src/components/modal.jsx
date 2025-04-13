import React, { useContext, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { RiGoogleLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/authProvider";
import { apiRequest } from "../api/apiRequest";
import Login from "../pages/login";

export default function Modal() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const { createWithGmail, logInWithEmailAndPassword } =
    useContext(AuthContext);

  // redirect to page after signUp
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    logInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("login successful");
        document.getElementById("my_modal_4").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error?.message;
        setErrorMessage("username/password incorrect");
      });
  };

  // signIn with google
  const handleLogin = () => {
    createWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        apiRequest({
          url: "/create-user",
          method: "POST",
          data: userInfo,
        }).then((response) => {
          alert("Login Successful");
          document.getElementById("my_modal_4").close();
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  return (
    <div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/22 bg-base-200  max-w-3xl">
          {/* if there is a button, it will close the modal */}
          <button
            htmlFor="my_modal_4"
            onClick={() => document.getElementById("my_modal_4").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 md:mt-0 "
          >
            ✕
          </button>
          <div className="modal-action">
            <div className="hero   min-h-40 md:-mt-20 -mt-10">
              <div className="hero-content px-2 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left hidden lg:flex flex-col">
                  <h1 className="text-5xl font-bold -mt-20  ml-4">
                    Login now!
                  </h1>
                  <p className="py-6 ml-4">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut
                    assumenda excepturi exercitationem quasi. In deleniti eaque
                    aut repudiandae et a id nisi.
                  </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mt-10">
                  <form
                    method="dialog"
                    className="card-body"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="flex justify-between items-center">
                      <h1 className="font-bold text-3xl   text-green-600 ">
                        Please Login
                      </h1>
                    </div>

                    {/* email */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email"
                        className="input input-bordered"
                        {...register("email")}
                      />
                    </div>

                    {/* password */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered"
                        {...register("password")}
                      />
                      <p className="text-red-400 text-xs italic">
                        {errorMessage}
                      </p>

                      <label className="label py-4">
                        <span>
                          Forgot Password?
                          <Link
                            to={"forget-password"}
                            htmlFor="my_modal_4"
                            onClick={() =>
                              document.getElementById("my_modal_4").close()
                            }
                            className="underline text-green-600"
                          >
                            Click here
                          </Link>
                        </span>
                      </label>
                    </div>
                    <div className="form-control py-2">
                      <input
                        type="submit"
                        value="Login"
                        className="btn btn-primary bg-green-600 border-none hover:bg-gray-100 hover:text-green-600 text-semibold text-xl"
                      />
                    </div>
                    <label className="label ">
                      <span>
                        Don't have an account?
                        <Link
                          htmlFor="my_modal_4"
                          onClick={() =>
                            document.getElementById("my_modal_4").close()
                          }
                          to={"/register"}
                          className="underline text-green-600"
                        >
                          Sign Up
                        </Link>
                      </span>
                    </label>
                  </form>

                  {/* //socials */}
                  <div className="flex items-center justify-center gap-2 -mt-10 py-2">
                    <button className="btn btn-circle hover:bg-green-600 hover:text-white">
                      <FaFacebookF size={20} />
                    </button>
                    <button className="btn btn-circle bg-gray-100 border-none btn-outline hover:bg-green-600 hover:text-white">
                      <RiGoogleLine size={20} onClick={handleLogin} />
                    </button>
                    <button className="btn btn-circle border-none bg-gray-100 btn-outline hover:bg-green-600 hover:text-white">
                      <FaXTwitter size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
