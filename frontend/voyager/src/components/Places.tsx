import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";
import Cookies from "js-cookie";

import Card from "./Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const Places = () => {
  const [scrapedData, setScrapedData] = useState<any>();
  const [placeName, setPlaceName] = useState<string>("");
  const [autoName, setAutoName] = useState();
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");
  const navigate = useNavigate();

  useEffect(() => {
    ACCESS_TOKEN ? null : navigate("/login");
  }, []);
  const handleScrape = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/api/scrape/",
        { placeLink: autoName[0]?.canonical },
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
          onKeyDown={(e) => (e.key === "Enter" ? handleScrape() : null)}
          className="border-2 border-[#d04e4e]  w-[40vw] lg:w-[30vw] h-10 rounded-l-full"
        />
        <select
          value={placeName}
          className=" h-10 border-[#d04e4e]"
          onChange={(e) => {
            setPlaceName(e.target.value);
            getAutoCompleteList(e.target.value);
          }}
        >
          <option value="">Select place from here</option>
          {autoName &&
            autoName.map((autoName) => (
              <option value={autoName.name}>{autoName.name}</option>
            ))}
        </select>

        <button
          onClick={handleScrape}
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
          {scrapedData?.data &&
            scrapedData.data.images.map((image: string) => {
              return (
                <SwiperSlide className="">
                  <img
                    src={image}
                    alt=""
                    className=" object-contain swiperImg opacity-100 bg-[rgb(245,245,220)] rounded-md h-[50vh] max-h-[50vh] min-h-[50vh] md:h-[70vh] md:max-h-[70vh] md:min-h-[70vh]"
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>

        <p className="absolute w-full md:w-min md:bottom-0 left-1/2 bottom-1/4 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-[#e1dede] z-20">
          {autoName && autoName[0] && autoName[0].name}
        </p>
      </div>
      <div className="flex flex-col items-center">
        {scrapedData?.data?.cards.map((card: any) => {
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
              wishlistComponent={false}
            />
          );
        })}
      </div>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: scrapedData?.data.description }}
      ></div>
    </div>
  );
};
export default Places;
