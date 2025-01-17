import { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../context/authProvider";
import { replace, useLocation, useNavigate } from "react-router-dom";
// import { data } from "../data/data"

export default function UpdateProfile() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm({
        mode: "onChange",

    })

    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathName || '/'
    
    const { updateUserProfile } = useContext(AuthContext)


    const onSubmit = (data) => {
        const name = data.name;
        // const email = data.email
        const photoURL = data.photoURL

        updateUserProfile(name,photoURL).then(() => {
            alert('profile updated')
            navigate(from, {replace:true})
        }).catch((error) => {
            console.log(error.message)
        });

    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-2xl font-bold  w-full text-green-700">Update Profile!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"
                                placeholder="eg.Comfort"
                                className="input input-bordered" required
                                {...register("name")} />
                        </div>
                        {/* <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                placeholder="eg. comfort@gmail.com"
                                className="input input-bordered" required
                                {...register("email")} />
                        </div> */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Upload Photo</span>
                            </label>
                            <input type="text"
                                placeholder="photoURL"
                                className="input input-bordered" required
                                {...register("photoURL")} />
                            {/* <input
                                type="file"
                                className="file-input file-input-bordered file-input-success w-full max-w-xs"
                                {...register("file")}
                            /> */}
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit"
                            value="Update"
                             className="btn btn-green-600 bg-green-500 hover:bg-base-100 hover:text-green-600"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}