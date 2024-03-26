import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import girl from ".././assets/girl.png";
import mountains from ".././assets/image.png";
import nightSky from ".././assets/nightSky5.jpg";
import cloud1 from ".././assets/cloud3.png";

export default function HeroParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["-50%", "50%", "100%", "200%"]
  );
  const girlY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const girlScale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  const controls = useAnimation();
  const animationVariants = {
    hidden: { x: "-100%" },
    visible: { x: "100%" },
  };

  // Start the animation when the component mounts
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <div
      ref={ref}
      className="w-full h-screen overflow-hidden relative grid place-items-center"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={animationVariants}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
        style={{
          width: "30vw", // Adjust the width of your cloud
          height: "20vh",

          position: "absolute",
          top: "10%", // Adjust the starting position vertically
          zIndex: 5, // Ensure it's on top of other elements
        }}
      >
        <img src={cloud1} alt="" />
      </motion.div>
      <motion.h1
        style={{ y: textY, scale: girlScale }}
        className="font-bold text-white text-7xl md:text-9xl relative z-10 -translate-y-20"
      >
        Voyager
      </motion.h1>

      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${nightSky})`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <motion.div
        className="absolute w-[30vw] inset-0 z-30 right-1/2 md:left-1/4  overflow-visible"
        style={{
          scale: girlScale,
          width: "100%",
        }}
      >
        {/* Replace background image with img tag */}
        <img
          src={girl}
          alt="Girl"
          className="w-max align-middle"
          style={{ height: "100%", objectFit: "cover" }}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(${mountains})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          y: girlY,
        }}
      />
    </div>
  );
}
