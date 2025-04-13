import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { RiGoogleLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiRequest";
import axios from "axios";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // redirect to page after signUp
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/menu";

  const { createUser, updateUserProfile, createWithGmail } =
    useContext(AuthContext);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // const name = data.name;

    createUser(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };
          apiRequest({
            url: "/create-user",
            method: "POST",
            data: userInfo,
          }).then((response) => {
            alert("Account created successful");
            document.getElementById("my_modal_4").close();
            navigate(from, { replace: true });
          });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(error.message);
      });
  };

  // register with email
  const handleRegisterWithGmail = () => {
    createWithGmail()
      .then((result) => {
        const user = result.user;
        console.log(user);
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        apiRequest({
          url: "/create-user",
          method: "POST",
          data: userInfo,
        }).then((response) => {
          alert("Account created successful");
          document.getElementById("my_modal_4").close();
          navigate(from, { replace: true });
        });
      })
      .catch((error) => error);
  };

  return (
    <div className="max-w-screen-xl mx-auto xl:px-24 min-h-screen pt-20">
      <div className="hero   min-h-40">
        <div className="hero-content px-2 flex-col lg:flex-row-reverse  items-center justify-center gap-8">
          <div className="text-center w-1/2 lg:text-left hidden lg:flex flex-col">
            <h1 className="text-5xl font-bold -mt-20  ml-4">Register now!</h1>
            <p className="py-6 ml-4 w-4/5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 md:w-full max-w-sm shrink-0 shadow-2xl">
            <Link
              to="/ "
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 "
            >
              ✕
            </Link>
            <form
              method="dialog"
              className="card-body"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="font-bold  text-green-700">Create Your Account</h1>
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  className="input input-bordered"
                  {...register("name")}
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
              </div>
              {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="confirm password"
                                    placeholder="Confirm Password"
                                    className="input input-bordered"
                                    {...register("confirm password")
                                    } />
                            </div> */}
              <p className="text-red-500 text-xs italic">{errorMessage}</p>
              <div className="form-control py-2">
                <input
                  type="submit"
                  value="Create Account"
                  className="btn btn-primary bg-green-600 border-none hover:bg-gray-100 hover:text-green-600 text-semibold text-xl"
                />
              </div>
            </form>
            <label className="label -mt-10 py-2 px-8">
              <span>
                already have an account?
                <button
                  className="underline text-green-600"
                  onClick={() =>
                    document.getElementById("my_modal_4").showModal()
                  }
                >
                  Login
                </button>
              </span>
            </label>
            {/* socials */}
            <div className="flex items-center justify-center gap-2  py-2">
              <button className="btn btn-circle hover:bg-green-600 hover:text-white">
                <FaFacebookF size={20} />
              </button>
              <button className="btn btn-circle bg-gray-100 border-none btn-outline hover:bg-green-600 hover:text-white">
                <RiGoogleLine size={20} onClick={handleRegisterWithGmail} />
              </button>
              <button className="btn btn-circle border-none bg-gray-100 btn-outline hover:bg-green-600 hover:text-white">
                <FaXTwitter size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
