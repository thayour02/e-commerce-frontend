import { useEffect, useRef } from "react";
import Banner from "./banner";
import Categories from "./categories";
import Service from "./services";
import Special from "./specialMenu";
import Testimonials from "./testimonials";
import { motion, useAnimation, useInView } from "framer-motion";

export default function Home() {
  const bannerRef = useRef(null);
  const categoriesRef = useRef(null);
  const serviceRef = useRef(null);
  const specialRef = useRef(null);
  const testimonialsRef = useRef(null);

  const bannerInView = useInView(bannerRef, { once: true });
  const categoriesInView = useInView(categoriesRef, { once: true });
  const serviceInView = useInView(serviceRef, { once: true });
  const specialInView = useInView(specialRef, { once: true });
  const testimonialsInView = useInView(testimonialsRef, { once: true });

  const bannerControl = useAnimation();
  const categoriesControl = useAnimation();
  const serviceControl = useAnimation();
  const specialControl = useAnimation();
  const testimonialsControl = useAnimation();

  useEffect(() => {
    if (bannerInView) bannerControl.start("visible");
  }, [bannerInView]);

  useEffect(() => {
    if (categoriesInView) categoriesControl.start("visible");
  }, [categoriesInView]);

  useEffect(() => {
    if (serviceInView) serviceControl.start("visible");
  }, [serviceInView]);

  useEffect(() => {
    if (specialInView) specialControl.start("visible");
  }, [specialInView]);

  useEffect(() => {
    if (testimonialsInView) testimonialsControl.start("visible");
  }, [testimonialsInView]);

  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };
  const svariants = {
    hidden: { opacity: 0, x: -75 },
    visible: { opacity: 1, x: 0 },
  };
  const tvariants = {
    hidden: { opacity: 0, x: 75 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <motion.div
        ref={bannerRef}
        variants={variants}
        initial="hidden"
        animate={bannerControl}
        transition={{
          duration: 0.8,
          delay: 0.35,
          type: "tween",
          stiffness: 100,
        }}
      >
        <Banner />
      </motion.div>
      <motion.div
        ref={categoriesRef}
        variants={variants}
        initial="hidden"
        animate={categoriesControl}
        transition={{
          duration: 0.5,
          delay: 0.25,
          type: "tween",
          stiffness: 100,
        }}
      >
        <Categories />
      </motion.div>
      <motion.div
        ref={specialRef}
        variants={svariants}
        initial="hidden"
        animate={specialControl}
        transition={{
          duration: 0.5,
          delay: 0.25,
          type: "tween",
          stiffness: 100,
        }}
      >
        <Special />
      </motion.div>
      <motion.div
        ref={testimonialsRef}
        variants={tvariants}
        initial="hidden"
        animate={testimonialsControl}
        transition={{
          duration: 0.5,
          delay: 0.25,
          type: "tween",
          stiffness: 100,
        }}
      >
        <Testimonials />
      </motion.div>
      <motion.div
        ref={serviceRef}
        variants={variants}
        initial="hidden"
        animate={serviceControl}
        transition={{
          duration: 0.5,
          delay: 0.25,
          type: "tween",
          stiffness: 100,
        }}
      >
        <Service />
      </motion.div>
    </div>
  );
}
