import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { RiGoogleLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authProvider";
import { apiRequest } from "../api/apiRequest";

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/menu";

  const { createWithGmail, logInWithEmailAndPassword } =
    useContext(AuthContext);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    logInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error?.message;
        setErrorMessage("username/password incorrect");
      });
  };

  const handleLogin = () => {
    createWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: result?.user?.name,
          email: result?.user?.email,
        };
        const res = apiRequest({
          url: "/create-user",
          method: "POST",
          data: userInfo,
        }).then((response) => {
          alert("Account created successful");
          // document.getElementById('my_modal_4').close()
          navigate(from, { replace: true });
        });
      })
      .catch((error) => error);
  };
  return (
    <div>
      <div className="max-w-screen-xl mx-auto xl:px-24 min-h-screen pt-20">
        <div className="hero   min-h-40">
          <div className="hero-content px-2 flex-col lg:flex-row-reverse  items-center justify-center">
            <div className="text-center w-1/2 lg:text-left hidden lg:flex flex-col">
              <h1 className="text-5xl font-bold -mt-20  ml-4">Login now!</h1>
              <p className="py-6 ml-4 w-4/5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="card bg-base-100 md:w-1/2 max-w-sm shrink-0 shadow-2xl">
              <form
                method="dialog"
                className="card-body"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex justify-between items-center">
                  {/* <h1 className='font-bold text-3xl   text-green-600 '>Please Login</h1> */}
                  {/* if there is a button, it will close the modal */}
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
                  <p className="text-red-500 text-xs italic py-2">
                    {errorMessage}
                  </p>
                  <label className="label py-4">
                    <span>
                      Forgot Password?
                      <Link
                        to={"forget-password"}
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
                    don't have an account?
                    <Link to={"/register"} className="underline text-green-600">
                      sign Up
                    </Link>
                  </span>
                </label>
              </form>
              {/* socials */}
              <div className="flex items-center justify-center gap-2 py-2">
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
  );
}
