import { useForm } from "react-hook-form";
import { apiRequest } from "../../api/apiRequest";
import { handleFileUpload } from "../../api/apiRequest";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Addmenu() {
  const [profileImg, setProfileImg] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const img = profileImg && (await handleFileUpload(profileImg));
      const newData = img ? { ...data, image: img } : data;
      const add = await apiRequest({
        url: "/addMenu",
        method: "POST",
        data: newData,
      });
      if (add?.success === true) {
        Swal.fire({
          title: "Added",
          text: "Menu uploaded successfully",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "error",
          text: "unable to uplaod menu",
          icon: "danger",
        });
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <div className=" md:w-[750px] mx-4">
      <h2 className="text-2xl px-6 font-semibold text-green-400 my-4">
        Upload New Menu
      </h2>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mx-">
            <div className="label">
              <span className="label-text ">Recipe Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-4/4 md:w-full lg:w-full "
              {...register("name")}
            />
          </div>

          <div className="flex gap-10 mt-6 ">
            <div className="form-control w-1/2">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered max-w-xs "
                {...register("price")}
              />
            </div>

            <label className="form-control w-1/2 -mx-8">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                {...register("category")}
                className="select select-bordered "
                defaultValue="default"
              >
                <option disabled value="default">
                  Select Category
                </option>
                <option>popular</option>
                <option>salad</option>
                <option>desserts</option>
                <option>drinks</option>
                <option>pizza</option>
                <option>soups</option>
              </select>
            </label>
          </div>

          <div className="mt-8">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Recipe Details</span>
              </div>
              <textarea
                {...register("recipe")}
                className="textarea textarea-bordered h-24"
                placeholder="Tell about your recipe"
              ></textarea>
            </label>
          </div>

          <div className="mt-8">
            <label className="form-control w-full max-w-xs">
              <input
                type="file"
                // {...register("image")}
                onChange={(e) => setProfileImg(e.target.files[0])}
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </label>
          </div>

          <button type="submit" className="btn  bg-green-400 my-6 text-white">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
