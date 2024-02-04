import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

  return (
    <div
      ref={ref}
      className="w-full h-screen overflow-hidden relative grid place-items-center"
    >
      <motion.h1
        style={{ y: textY }}
        className="font-bold text-white text-7xl md:text-9xl relative z-10 -translate-y-20"
      >
        Voyager
      </motion.h1>

      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(../src/assets/multimtbg.jpg)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />
      <motion.div
        className="absolute w-[30vw] inset-0 z-30 left-1/4 overflow-visible"
        style={{
          backgroundImage: `url(../src/assets/girl.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />

      <motion.div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(../src/assets/image.png)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          y: girlY,
        }}
      />
    </div>
  );
}
