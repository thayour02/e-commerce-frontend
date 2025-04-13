import { useForm } from "react-hook-form";
import { apiRequest } from "../../api/apiRequest";
import { handleFileUpload } from "../../api/apiRequest";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function UpdateMenu() {
  const [profileImg, setProfileImg] = useState("");

  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { id } = useParams();
  const fetchItemById = async () => {
    const menu = await apiRequest({
      url: `/menu-item/${id}`,
      method: "GET",
    });
    setItem(menu?.menu);
  };

  useEffect(() => {
    fetchItemById();
  }, [setItem]);

  const onSubmit = async (data) => {
    try {
      const img = profileImg && (await handleFileUpload(profileImg));
      const newData = img ? { ...data, image: img } : data;
      const add = await apiRequest({
        url: `/update-item/${id}`,
        method: "PUT",
        data: newData,
      });
      if (add?.success === true) {
        Swal.fire({
          title: "Added",
          position: "top-end",
          timer: 1500,
          text: "Menu updated successfully",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "error",
          text: "unable to uplaod menu",
          icon: "danger",
        });
        setTimeout(() => {
          navigate("/menu");
        }, 1000);
      }
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="w-full md:w-[880px] mx-auto px-4">
      <h2 className="text-2xl font-semibold text-green-400 my-4">
        Update Menu Item
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              defaultValue={item.name}
              value={item.name}
              {...register("name")}
            />
          </div>

          <div className="flex gap-6 mt-6 w-full justify-between">
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered max-w-xs "
                defaultValue={item.price}
                value={item.price}
                {...register("price")}
              />
            </div>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select
                {...register("category")}
                defaultValue={item.category}
                className="select select-bordered"
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
                defaultValue={item.recipe}
                value={item.recipe}
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
                defaultValue={item.image}
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
