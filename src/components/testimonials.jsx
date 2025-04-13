import { FaStar } from "react-icons/fa";
import img from "../assets/hire.png";

export default function Testimonials() {
  return (
    <div className="container max-w-screen-2xl xl:px-24 mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:1/2 flex ">
          <div className="bg-red-800 rounded-[100%]  h-[300px]">
            <img src={img} alt="" />
          </div>
          <div className="chat chat-start md:w-2/5 -ml-20 mt-60">
            <div className="chat-bubble bg-green-600">
              Put me on the Council and not make me a Master!??
            </div>
          </div>
        </div>

        <div className="md:w-1/2 ">
          <div className="text-left  md:w-4/5">
            <h1 className="text-red-200 font-semibold uppercase tracking-wide text-lg">
              Testimonials
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold  md:leading-snug leading-snug">
              What Our Customers Say About Us
            </h2>
          </div>
          <blockquote className="my-5 leading-[30px]">
            " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
            aperiam, labore nemo hic id eos minima cumque. Non quis quasi
            doloribus sapiente tempore nobis, explicabo incidunt fugiat,
            temporibus magni dolore! "
          </blockquote>

          {/* avatar */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium">Customer Feedback</h4>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span>
                  4.9 <span className="text-zinc-300">(26.5k review)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
