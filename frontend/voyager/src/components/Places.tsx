import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Cookies from "js-cookie";

const Places = () => {
  const [scrapedData, setScrapedData] = useState<any>();
  const [placeName, setPlaceName] = useState<string>("");
  // const accessToken: string = useSelector(
  //   (state: RootState) => state.tokens.access
  // );
  //const atoken: any = localStorage.getItem("access_token");
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");
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
          const card = section.cards?.map((card: any) => {
            return (
              <div
                className="md:w-[20vw] md:h-[65vh] m-4 rounded-md overflow-clip cursor-pointer shadow-sm shadow-[#4f4e4e]"
                onClick={() =>
                  window.open(`${window.location.origin}${card.redirectUrl}`)
                }
              >
                <img src={card.image} alt="" className="w-[30vw]" />
                <p className="w-[20vw]">{card.title}</p>
                <p>{card.price}</p>
              </div>
            );
          });
          return (
            <div className="">
              <h1 className="text-4xl font-bold">{section.heading}</h1>
              <div className="flex overflow-scroll">{card}</div>
            </div>
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
