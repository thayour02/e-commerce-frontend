import { category } from "../data/data"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useEffect, useRef, useState } from "react";
import Card from "./cards";
import { FaAngleLeft,FaAngleRight } from "react-icons/fa";



const SimpleNextArrow = (props) => {
    const {className, style, onClick} = props;
    return (
        <div className={className} style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}>
            Next
        </div>
    )
}
const SimplePrevArrow = (props) => {
    const  {className, style, onClick} = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        >
            Prev
        </div>
    )
}

export default function Special() {
    const [recipe, setRecipe] = useState([])

    const slider = React.useRef(null)

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const resp = await fetch('/tayo.json')
                const data = await resp.json()

                const specials = data.filter((item) => item.category === "popular")
                setRecipe(specials)
            } catch (error) {
                return error
            }
        }
        fetchRecipe()
    }, [])

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        nextArrow: <SimpleNextArrow />,
        prevArrow: <SimplePrevArrow />
    };
    return (
        <div className="max-w-screen-2xl my-20 mx-auto xl:px-20 px-2 relative">
            <div className="text-left">
                <h1 className="text-red-200 font-semibold uppercase tracking-wide text-lg">Customer Favorites</h1>
                <h2 className="text-4xl md:text-5xl font-bold my-2 md:leading-snug leading-snug">Stand Out dishes from our Menu</h2>
            </div>

            {/* arraow slick btn */}
            <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
                <button onClick={() => slider?.current?.slickPrev()} className="btn p-2 rounded-full ml-5">
                    <FaAngleLeft className="w-8 h-8 p-1"/>
                </button>

                <button onClick={() => slider?.current?.slickNext()} className="btn p-2 rounded-full ml-5">
                    <FaAngleRight className="w-8 h-8 p-1" />
                </button>

            </div>

            <Slider ref={slider} {...settings} 
            className="overflow-hidden mt-10  ">
                {
                    recipe.map((item, i) => (
                        <Card key={i} item={item} />
                    ))
                }
            </Slider>
        </div>
    )
}