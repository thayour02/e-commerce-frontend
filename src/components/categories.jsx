import { category } from "../data/data";
import { motion } from "framer-motion";

export default function Categories() {
  return (
    <div className="max-w-screen-2xl mx-auto xl:px-24 py-16">
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -75 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1, type: "tween", stiffness: 100 }}
        className="text-center"
      >
        <h1 className="text-red-200 font-semibold uppercase tracking-wide text-lg">
          Customer Favorites
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug">
          Popular Categories
        </h2>
      </motion.div>

      {/* categoried */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2, type: "tween", stiffness: 100 }}
        className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12"
      >
        {category.map((item, i) => (
          <div
            key={i}
            className="shadow-lg rounded-md bg-white  py-6 px-5 w-64 mx-auto text-center cursor-pointer
                        hover:translate-y-4 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-full mx-auto">
              <img
                src={item.image}
                className="bg-[#C1F1C6] p-5 rounded-full px-4 w-28 h-28"
                alt={item.image}
              />
            </div>
            <div className="mt-5 space-y-2 ">
              <h5>{item.title}</h5>
              <h5>{item.des}</h5>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
