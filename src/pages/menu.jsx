import { useContext, useEffect, useState } from "react"
// import { category } from "../data/data"
// import ListBox from "../components/listBox";
import Card from "../components/cards";
import { category } from "../data/data";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/loading";
import { AuthContext } from "../context/authProvider";

const options = ["default", "low-high", "high-low", "A-Z", "Z-A"];


export default function Menu() {
    const [menu, setMenu] = useState([])
    const [filteredItem, setFilteredItem] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortOption, setSortOption] = useState('default');
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(8)

    const { loading } = useContext(AuthContext)

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const menu = await fetch('http://localhost:3000/api/menus')
                const data = await menu.json()
                setMenu(data?.menus)
                setFilteredItem(data?.menus);
            } catch (error) {
                console.log("error occured", error)
            }
        }
        fetchMenu()
    }, [])


    // filter data base on category
    const filterData = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category)
        setFilteredItem(filtered)
        setSelectedCategory(category)
        setCurrentPage(1)
    };

    // show all data

    const showAll = () => {
        setFilteredItem(menu)
        setSelectedCategory("all")
        setCurrentPage(1)
    }


    // sort
    const handleSortChange = (option) => {
        setSortOption(option)
        let sortedItem = [...filteredItem]

        switch (option) {
            case 'A-Z':
                sortedItem.sort((a, b) => a.name.localeCompare(b.name))
                break;
            case 'Z-A':
                sortedItem.sort((a, b) => b.name.localeCompare(a.name))
                break;
            case 'low-high':
                sortedItem.sort((a, b) => a.price - b.price)
                break;
            case 'high-low':
                sortedItem.sort((a, b) => b.price - a.price)
                break;
            default:
                //break
                break;
        }
        setFilteredItem(sortedItem)
        setCurrentPage(1)

    }

    // pagination logic
    const indexOfLastName = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastName - itemsPerPage
    const currentItems = filteredItem.slice(indexOfFirstItem, indexOfLastName)
    const pagination = (pageNumber) => setCurrentPage(pageNumber)



    return (
        <div className="min-h-screen pt-20">
            <div className="max-w-screen-2xl container mx-auto md:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] to-100%">
                <motion.div
                    variants={{
                        hidden: { opacity: 0, x: 75 },
                        visible: { opacity: 1, x: 0 }
                    }}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.25, type: 'tween', stiffness: 100 }}
                    className="py-40 flex flex-col justify-center items-center gap-8">
                    {/* text */}
                    <div className="text-center">
                        <motion.h1
                            variants={{
                                hidden: { opacity: 0, y: -75 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.25, type: 'tween', stiffness: 100 }}
                            className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">Dive into delights of
                            <span className="text-green-600"> Delectable food</span>
                        </motion.h1>
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, x: 75 },
                                visible: { opacity: 1, x: 0 }
                            }}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: 0.25, type: 'tween', stiffness: 100 }}
                            className="text-xl text-[#A4A4A4]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae aliquid sint sapiente
                            exercitationem! Enim obcaecati laboriosam, pariatur veritatis fuga et possimus dolore,
                            ducimus magnam natus eum illo, ab odio recusandae.</motion.p>
                        <button className="bg-green-600 px-8 py-3 mt-2 font-semibold rounded-full text-white">Order Now</button>
                    </div>
                </motion.div>
            </div>

            <div className="max-w-screen-2xl container mx-auto md:px-24 px-4">
                <div>
                    {/* btn */}
                    <div className="flex md:justify-between items-center flex-col flex-wrap md:flex-row space-y-3 mb-6" >
                        <div className="gap-4 md:gap-8  flex md:items-center flex-row justify-start flex-wrap ">
                            <button onClick={showAll}
                                className={selectedCategory === "all" ? "active" : ""}>All</button>
                            <button onClick={() => filterData('salad')}
                                className={selectedCategory === 'salad' ? "active" : ""}>Salad</button>
                            <button onClick={() => filterData('pizza')}
                                className={selectedCategory === "pizza" ? "active" : ""}>Pizza</button>
                            <button onClick={() => filterData('soups')}
                                className={selectedCategory === "soups" ? "active" : ""}>Soups</button>
                            <button onClick={() => filterData('drinks')}
                                className={selectedCategory === "drinks" ? "active" : ""} >Drinks</button>
                            <button onClick={() => filterData('desserts')}
                                className={selectedCategory === "desserts" ? "active" : ""}>Dessert</button>
                        </div>

                        <div>
                            <div className='w-[10rem] md:w-[10rem]' >
                                <select value={sortOption} onChange={(e) => handleSortChange(e.target.value)}
                                    className="form-control  relative w-full cursor-default rounded-lg 
                                    bg-white py-4 uppercase font-semibold text-center  shadow-md focus:outline-none
                                     focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white 
                                     focus-visible:ring-opacity-75 focus-visible:ring-offset-2 
                                    focus-visible:ring-offset-orange-300 sm:text-sm" name="sort" id="sort">
                                    {options.map(option => (
                                        <option key={option} >
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    loading ? <LoadingSpinner />
                        : <div className="grid grid-cols-1  md:grid-cols-3 sm:grid-cols-2 gap-8 mt-10">
                            {
                                currentItems.map((item, i) => (
                                    <motion.div
                                        variants={{
                                            hidden: { opacity: 0, y: 75 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ duration: 0.5, delay: 0.25, type: 'tween', stiffness: 100 }}
                                        key={i}
                                        className="">
                                        <Card key={item._id} item={item} />
                                    </motion.div>
                                ))
                            }
                        </div>
                }
            </div>

            {/* pagination */}
            <div className="flex justify-center my-8">
                {
                    Array.from({ length: Math.ceil(filteredItem.length / itemsPerPage) }).map((_, index) => (
                        <button key={index + 1}
                            onClick={() => pagination(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green-600 text-white" : "bg-gray-400"}`}>
                            {index + 1}
                        </button>
                    ))
                }
            </div>


        </div>
    )
}