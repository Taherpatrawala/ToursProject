import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Dubai from "../../assets/dubaiMuseum.jpg";

function PopularCities() {
  //const isInView=useInView({ref:ref,threshold:0.5})

  return (
    <div className="min-h-screen">
      <div className="min-h-screen w-full bg-black grid esm:grid-cols-2 esm:gap-2 md:grid-cols-3 md:gap-4 esm:p-5 md:p-6">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className=" overflow-hidden relative rounded-lg col-span-2"
        >
          <p className="text-3xl text-white absolute bottom-4 left-2">
            Margarita
          </p>
          <div className="h-full w-full group">
            <div
              className="h-full w-full  group-hover:scale-125 group-hover:opacity-40 transition-all"
              style={{
                backgroundImage: `url(${Dubai})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              className="opacity-0 group-hover:opacity-100 absolute h-full w-full
                          top-0 right-0 bottom-0 left-0 overflow-hidden
                          flex justify-center items-center
                         transition-all ease-in-out"
            >
              <NavLink
                to="/places"
                onClick={() => {}}
                className="border border-white rounded-lg text-white p-2 hover:bg-white hover:bg-opacity-30"
              >
                Know more
              </NavLink>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className=" overflow-hidden relative rounded-lg"
        >
          <p className="text-3xl text-white absolute bottom-4 left-2">
            Martini
          </p>
          <div className="h-full w-full group">
            <div
              className="h-full w-full  hover:scale-125   group-hover:scale-125 group-hover:opacity-40 transition-all"
              style={{
                backgroundImage: `url(${Dubai})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              className="opacity-0 group-hover:opacity-100 absolute h-full w-full
                          top-0 right-0 bottom-0 left-0 overflow-hidden
                          flex justify-center items-center
                         transition-all ease-in-out"
            >
              <NavLink
                to="/places"
                onClick={() => {}}
                className="border border-white rounded-lg text-white p-2 hover:bg-white hover:bg-opacity-30"
              >
                Know more
              </NavLink>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className=" overflow-hidden relative rounded-lg"
        >
          <p className="text-3xl text-white absolute bottom-4 left-2">Vodka</p>
          <div className="h-full w-full group">
            <div
              className="h-full w-full  hover:scale-125   group-hover:scale-125 group-hover:opacity-40 transition-all"
              style={{
                backgroundImage: `url(${Dubai})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              className="opacity-0 group-hover:opacity-100 absolute h-full w-full
                          top-0 right-0 bottom-0 left-0 overflow-hidden
                          flex justify-center items-center
                         transition-all ease-in-out"
            >
              <NavLink
                to="/places"
                className="border border-white rounded-lg text-white p-2 hover:bg-white hover:bg-opacity-30"
              >
                Know more
              </NavLink>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.7 }}
          className=" overflow-hidden relative rounded-lg"
        >
          <p className="text-3xl text-white absolute bottom-4 left-2">Gin</p>
          <div className="h-full w-full group">
            <div
              className="h-full w-full  hover:scale-125   group-hover:scale-125 group-hover:opacity-40 transition-all"
              style={{
                backgroundImage: `url(${Dubai})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              className="opacity-0 group-hover:opacity-100 absolute h-full w-full
                          top-0 right-0 bottom-0 left-0 overflow-hidden
                          flex justify-center items-center
                         transition-all ease-in-out"
            >
              <NavLink
                to="/places"
                className="border border-white rounded-lg text-white p-2 hover:bg-white hover:bg-opacity-30"
              >
                Know more
              </NavLink>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className=" overflow-hidden relative rounded-lg"
        >
          <p className="text-3xl text-white absolute bottom-4 left-2">Rum</p>
          <div className="h-full w-full group">
            <div
              className="h-full w-full  hover:scale-125   group-hover:scale-125 group-hover:opacity-40 transition-all"
              style={{
                backgroundImage: `url(${Dubai})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div
              className="opacity-0 group-hover:opacity-100 absolute h-full w-full
                          top-0 right-0 bottom-0 left-0 overflow-hidden
                          flex justify-center items-center
                         transition-all ease-in-out"
            >
              <NavLink
                to="/places"
                className="border border-white rounded-lg text-white p-2 hover:bg-white hover:bg-opacity-30"
              >
                Know more
              </NavLink>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default PopularCities;
