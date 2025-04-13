import img from "../assets/hire.png";
import { service } from "../data/data";
import { motion } from "framer-motion";

export default function Service() {
  return (
    <div className="max-w-screen-2xl mx-auto xl:px-24 px-10 my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div className="md:w-1/2 mb-20 ">
          <div className="text-left  md:w-4/5 ">
            <h1 className="text-red-200 font-semibold uppercase tracking-wide text-2xl mb-2">
              Services
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold leading-[30px]">
              These are the services we render
            </h2>
          </div>
          <blockquote className="my-5 leading-[30px]">
            " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
            aperiam, labore nemo hic id eos minima cumque. Non quis quasi
            doloribus sapiente tempore nobis, explicabo incidunt fugiat,
            temporibus magni dolore! "
          </blockquote>
          <button className="bg-green-600 px-8 py-3  font-semibold rounded-full text-white">
            Explore More
          </button>
        </motion.div>

        <div className="md:1/2 flex mt-10 ">
          <div className="grid sm:grid-cols-2 grid-cols1 gap-8 items-center">
            {service.map((item, i) => (
              <div
                key={i}
                className="shadow-md rounded-xl py-5 px-4 text-center space-y-2 text-green-600 cursor-pointer h
                                hover:border-gray-600 transition-all duration-300 hover:border  bg-zinc-200"
              >
                <img
                  src={item.image}
                  alt={item.image}
                  className="mx-auto h-20 w-20"
                />
                <h5 className="pt-3 font-bold">{item.title}</h5>
                <p className="text-green-600">{item.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
