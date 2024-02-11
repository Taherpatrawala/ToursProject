import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { handleScrape } from "../../utils/handleScrape";
import { setScrapedSliceData } from "../../Slices/scrapedDataSlice";

import Dubai from "../../assets/dubaiMuseum.jpg";
import Mumbai from "../../assets/cities/mumbai.jpg";
import Paris from "../../assets/cities/paris.jpg";
import Venice from "../../assets/cities/venice.jpg";
import Singapore from "../../assets/cities/singapore.jpg";
function PopularCities() {
  //const isInView=useInView({ref:ref,threshold:0.5})
  const dispatch = useDispatch();
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");

  return (
    <div className="min-h-screen">
      <div className="min-h-screen w-full bg-black grid esm:grid-cols-2 esm:gap-2 md:grid-cols-3 md:gap-4 esm:p-5 md:p-6">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ scale: 0.3, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className=" overflow-hidden relative rounded-lg col-span-2"
        >
          <p className="text-3xl text-white absolute bottom-4 left-2">Dubai</p>
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
                onClick={() => {
                  setTimeout(() => {
                    handleScrape(
                      null,
                      `${import.meta.env.VITE_SCRAPING_SITE_LINK}places/dubai/`,
                      ACCESS_TOKEN,
                      dispatch,
                      setScrapedSliceData,
                      "Dubai"
                    );
                  }, 10);
                }}
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
          <p className="text-3xl text-white absolute bottom-4 left-2">Mumbai</p>
          <div className="h-full w-full group">
            <div
              className="h-full w-full  hover:scale-125   group-hover:scale-125 group-hover:opacity-40 transition-all"
              style={{
                backgroundImage: `url(${Mumbai})`,
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
                onClick={() => {
                  setTimeout(() => {
                    handleScrape(
                      null,
                      `${
                        import.meta.env.VITE_SCRAPING_SITE_LINK
                      }places/mumbai/`,
                      ACCESS_TOKEN,
                      dispatch,
                      setScrapedSliceData,
                      "Mumbai"
                    );
                  }, 10);
                }}
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
          <p className="text-3xl text-white absolute bottom-4 left-2">Venice</p>
          <div className="h-full w-full group">
            <div
              className="h-full w-full  hover:scale-125   group-hover:scale-125 group-hover:opacity-40 transition-all"
              style={{
                backgroundImage: `url(${Venice})`,
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
                onClick={() => {
                  setTimeout(() => {
                    handleScrape(
                      null,
                      `${
                        import.meta.env.VITE_SCRAPING_SITE_LINK
                      }places/venice/`,
                      ACCESS_TOKEN,
                      dispatch,
                      setScrapedSliceData,
                      "Venice, Italy"
                    );
                  }, 10);
                }}
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
          <p className="text-3xl text-white absolute bottom-4 left-2">
            Singapore
          </p>
          <div className="h-full w-full group">
            <div
              className="h-full w-full  hover:scale-125   group-hover:scale-125 group-hover:opacity-40 transition-all"
              style={{
                backgroundImage: `url(${Singapore})`,
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
                onClick={() => {
                  setTimeout(() => {
                    handleScrape(
                      null,
                      `${
                        import.meta.env.VITE_SCRAPING_SITE_LINK
                      }places/singapore/`,
                      ACCESS_TOKEN,
                      dispatch,
                      setScrapedSliceData,
                      "Singapore"
                    );
                  }, 10);
                }}
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
          <p className="text-3xl text-white absolute bottom-4 left-2">Paris</p>
          <div className="h-full w-full group">
            <div
              className="h-full w-full  hover:scale-125   group-hover:scale-125 group-hover:opacity-40 transition-all"
              style={{
                backgroundImage: `url(${Paris})`,
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
                onClick={() => {
                  setTimeout(() => {
                    handleScrape(
                      null,
                      `${import.meta.env.VITE_SCRAPING_SITE_LINK}places/paris/`,
                      ACCESS_TOKEN,
                      dispatch,
                      setScrapedSliceData,
                      "Paris, France"
                    );
                  }, 10);
                }}
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
