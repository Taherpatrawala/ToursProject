import axios from "axios";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import { useNavigate } from "react-router";
import Card from "./Card";
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
  const getAutoCompleteList = async () => {
    await axios
      .post(
        "http://localhost:8000/api/scrape/getAutocompleteData/",
        {
          placeName: placeName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res: any) => {
        const listItem = res.data.autocompleteList.filter((listItem) => {
          return listItem.canonical.startsWith(
            "https://www.holidify.com/places"
          )
            ? listItem
            : null;
        });
        console.log("LOG", listItem[0]);

        setAutoName(listItem[0]);
      })
      .then(() => console.log(autoName))
      .catch((error) => {
        console.error("Autocomplete error:", error.message);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={placeName}
        onChange={(e) => {
          setPlaceName(e.target.value);
          setTimeout(getAutoCompleteList, 0);
        }}
        onKeyDown={(e) => (e.key === "Enter" ? handleScrape() : null)}
        className="border-2 border-red-300"
      />
      <select
        value={autoName?.name}
        onChange={(e) => {
          setAutoName({ ...autoName, name: e.target.value });
          setPlaceName(e.target.value);
        }}
      >
        {autoName && <option value={autoName.name}>{autoName.name}</option>}
      </select>
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
              <Card
                event_id={0}
                image={card.event_image}
                title={card.event_title}
                price={card.event_price}
                redirectUrl={card.event_redirecturl}
                wishlistComponent={false}
              />
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
    </div>
  );
};
export default Places;
