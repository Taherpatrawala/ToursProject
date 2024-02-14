import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import Cookies from "js-cookie";

import Card from "./Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setScrapedSliceData } from "../Slices/scrapedDataSlice";

import { handleScrape } from "../utils/handleScrape";
const Places = () => {
  const [placeName, setPlaceName] = useState<string>("");
  const [autoName, setAutoName] = useState();
  const [readMore, setReadMore] = useState<boolean>(false);

  const dispatch = useDispatch();
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");
  const navigate = useNavigate();
  const scrapedSliceData = useSelector(
    (state: RootState) => state.scrapedData.data
  );
  const placeNameSlice = useSelector(
    (state: RootState) => state.scrapedData.placeName
  );

  useEffect(() => {
    ACCESS_TOKEN ? null : navigate("/login");
  }, []);
  const handleScraping = () => {
    handleScrape(
      autoName,
      null,
      ACCESS_TOKEN,
      dispatch,
      setScrapedSliceData,
      null
    );
  };
  const getAutoCompleteList = async (inputValue: string) => {
    await axios
      .post(
        "http://localhost:8000/api/scrape/getAutocompleteData/",
        {
          placeName: inputValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res: any) => {
        const linkPattern: RegExp =
          /^https:\/\/www\.holidify\.com\/places\/[^\/]+\/$/;

        const listItem = res.data.autocompleteList.filter((listItem: any) => {
          return linkPattern.test(listItem.canonical) ? listItem : null;
        });
        console.log("LOG", listItem[0]);

        setAutoName(listItem);
      })
      .then(() => console.log(autoName))
      .catch((error) => {
        console.error("Autocomplete error:", error.message);
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          value={placeName}
          onChange={(e) => {
            setPlaceName(e.target.value);
            getAutoCompleteList(e.target.value);
          }}
          onKeyDown={(e) => (e.key === "Enter" ? handleScraping() : null)}
          className="border-2 border-[#d04e4e]  w-[40vw] lg:w-[30vw] h-10 rounded-l-full"
        />
        <select
          value={placeName}
          className=" h-10 border-2 border-l-0  border-[#d04e4e] "
          onChange={(e) => {
            setPlaceName(e.target.value);
            getAutoCompleteList(e.target.value);
          }}
        >
          {autoName &&
            autoName.map((autoName) => (
              <option value={autoName.name}>{autoName.name}</option>
            ))}
        </select>

        <button
          onClick={handleScraping}
          className="border  rounded-r-full bg-[#d14747] p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
      <div className="relative">
        <Swiper
          autoplay={{
            delay: 4500,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          }}
          effect={"fade"}
          loop={true}
          modules={[Autoplay, FreeMode, EffectFade]}
          className="mySwiper "
        >
          {scrapedSliceData &&
            scrapedSliceData?.images?.map((image: string) => {
              return (
                <SwiperSlide className="">
                  <img
                    src={image}
                    alt=""
                    className=" object-contain swiperImg opacity-100 bg-[#2e2c2c] rounded-md h-[50vh] max-h-[50vh] min-h-[50vh] md:h-[70vh] md:max-h-[70vh] md:min-h-[70vh]"
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>

        <p className="absolute w-full md:w-min md:bottom-0 left-1/2 bottom-1/4 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-[#e1dede] z-20">
          {autoName && autoName[0] && autoName[0].name
            ? autoName[0].name
            : placeNameSlice}
        </p>
      </div>
      {scrapedSliceData?.description && (
        <div className="relative">
          <div
            className={`transition-height duration-500 ${
              readMore ? "h-auto" : "h-8"
            } overflow-hidden p-4 pt-0 border border-[#827c7c] rounded-2xl`}
            dangerouslySetInnerHTML={{ __html: scrapedSliceData?.description }}
          ></div>
          {scrapedSliceData && (
            <button
              className="border-2 rounded-lg absolute right-0 -translate-x-1/2 -translate-y-1/3"
              onClick={() => setReadMore((prev) => !prev)}
            >
              {readMore ? "Read Less" : "Read More"}
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col items-center">
        {scrapedSliceData?.cards?.map((card: any) => {
          return (
            <Card
              event_id={0}
              image={card.image}
              title={card.title}
              duration={card.tripDuration}
              inclusions={card.inclusions}
              price={card.price}
              priceDesc={card.priceDesc}
              redirectUrl={card.redirectUrl}
              ACCESS_TOKEN=""
              Component="places"
            />
          );
        })}
      </div>
    </div>
  );
};
export default Places;
