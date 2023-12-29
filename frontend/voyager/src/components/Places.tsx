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
      <input
        type="text"
        value={placeName}
        onChange={(e) => {
          setPlaceName(e.target.value);
          getAutoCompleteList(e.target.value);
        }}
        onKeyDown={(e) => (e.key === "Enter" ? handleScrape() : null)}
        className="border-2 border-red-300"
      />
      <select
        value={placeName}
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

      <button onClick={handleScrape} className="border">
        Get Data
      </button>
      <div className="relative">
        <img
          src={scrapedData?.data?.images[0]}
          alt=""
          className="w-[100vw] object-cover h-[58vh]"
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-white">
          Name
        </p>
      </div>
      <div className="">
        {scrapedData?.data?.cards.map((card: any) => {
          return (
            <Card
              event_id={0}
              image={card.image}
              title={card.title}
              price={card.price}
              redirectUrl={card.redirectUrl}
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
