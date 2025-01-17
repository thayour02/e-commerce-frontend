import img from '../assets/hire.png'
import { fadeIn } from '../variants.js'
import  {motion} from "framer-motion"
export default function Banner() {
    return (
        <div className="max-w-screen-2xl container mx-auto md:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] to-100%">
            <div className="py-24 flex flex-col md:flex-row-reverse  justify-between items-center gap-8">
                {/* image */}
                <motion.div
                    
                    className="md:w-1/2 md:ml-40">
                        <div
                            className=' bg-green-600 rounded-[100%]  h-[400px]'>
                            <img src={img} alt="" className=' pt-20 px-10' />
                        </div>
                    {/* rating */}
                    <div className='md:flex hidden md:block  md:flex-row justify-around gap-8 items-center -mt-4 '>
                        <div className='flex items-center space-y-2 bg-white rounded-2xl py-2 px-3 shadow-xl w-64'>
                            <img src={img} alt="" className='rounded-2xl w-24' />
                            <div className=''>
                                <p className='font-medium mb-1'>Spicy Food</p>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        readOnly
                                        defaultChecked />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                </div>
                                <p className='text-green-700'>$18.00</p>
                            </div>
                        </div>
                        <div className='flex items-center space-y-2 bg-white rounded-2xl py-2 px-3 shadow-xl w-64'>
                            <img src={img} alt="" className='rounded-2xl w-24' />
                            <div className=''>
                                <p className='font-medium mb-1'>Spicy Food</p>
                                <div className="rating rating-sm">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        readOnly
                                        defaultChecked />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                </div>
                                <p className='text-green-700'>$18.00</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
                {/* text */}
                <motion.div
                    //   variants={{
                    //     hidden:{opacity:0, y:75},
                    //     visible:{opacity:1,y:0}
                    // }}
                    // initial="hidden"
                    // animate="visible"
                    // transition={{duration:0.5, delay:0.25, type:'tween', stiffness:100}}
                    className="md:w-1/2">
                    <h1 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">Dive into delights of
                        <span className="text-green-600"> Delectable food</span></h1>
                    <p className="text-xl text-[#A4A4A4]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae aliquid sint sapiente
                        exercitationem! Enim obcaecati laboriosam, pariatur veritatis fuga et possimus dolore,
                        ducimus magnam natus eum illo, ab odio recusandae.</p>
                    <button className="bg-green-600 px-8 py-3 mt-2 font-semibold rounded-full text-white">Order Now</button>
                </motion.div>
            </div>
        </div>
    )
}