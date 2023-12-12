import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Cookies from "js-cookie";
import addToWishlist from "../utils/addToWishlist";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
const Places = () => {
  const [scrapedData, setScrapedData] = useState<any>();
  const [placeName, setPlaceName] = useState<string>("");
  // const accessToken: string = useSelector(
  //   (state: RootState) => state.tokens.access
  // );
  //const atoken: any = localStorage.getItem("access_token");
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");
  const navigate = useNavigate();

  useEffect(() => {
    ACCESS_TOKEN ? null : navigate("/login");
  }, []);
  const handleScrape = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/api/scrape/2/",
        { placeName: placeName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => setScrapedData(res))
      .then(() => console.log())
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <input
        type="text"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handleScrape() : null)}
        className="border-2 border-red-300"
      />
      <button onClick={handleScrape} className="border">
        Get Data
      </button>
      <div className="relative">
        <img
          src={scrapedData?.data?.backgroundImage}
          alt=""
          className="w-[100vw] object-cover h-[58vh]"
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white">
          {scrapedData?.data.locationName}
        </p>
      </div>
      <div className="">
        {scrapedData?.data?.sections.map((section: any) => {
          const cards = section.cards?.map((card: any) => {
            return (
              <div className="md:w-[20vw] md:h-[65vh] m-4 rounded-md overflow-clip shadow-sm shadow-[#4f4e4e]">
                <div className="relative">
                  <img src={card.image} alt="" className="w-[30vw]" />
                  <div className="absolute top-1 right-1 hover:bg-[#f37979] bg-opacity-40 rounded-full transition-all z-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-6 h-6 hover:text-red-600 m-1  cursor-pointer `}
                      onClick={() =>
                        toast.promise(addToWishlist(card), {
                          loading: "Adding to Wishlist...",
                          success: (message) => `${message}`,
                          error: (err) => ` ${err}`,
                        })
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </div>
                </div>

                <p
                  className="w-[20vw] cursor-pointer hover:text-red-600"
                  onClick={() =>
                    window.open(`${window.location.origin}${card.redirectUrl}`)
                  }
                >
                  {card.title}
                </p>
                <p>{card.price}</p>
              </div>
            );
          });
          return (
            <div className="">
              <h1 className="text-4xl font-bold">{section.heading}</h1>
              <div className="flex overflow-scroll">{cards}</div>
            </div>
          );
        })}
      </div>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: scrapedData?.data.description }}
      ></div>
      <Toaster />
    </div>
  );
};
export default Places;
