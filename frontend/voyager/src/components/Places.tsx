import axios from "axios";
import { useState } from "react";

const Places = () => {
  const [scrapedData, setScrapedData] = useState<any>();
  const [placeName, setPlaceName] = useState<string>("");

  const handleScrape = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/api/scrape/2/",
        { placeName: placeName },
        {
          headers: {
            "Content-Type": "application/json",
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
      <div className="flex overflow-scroll">
        {scrapedData?.data?.cards?.map((card: any) => {
          return (
            <div
              className="border-2"
              onClick={() =>
                window.open(`${window.location.origin}${card.redirectUrl}`)
              }
            >
              <img src={card.image} alt="" className="w-[30vw]" />
              <p className="w-[20vw]">{card.title}</p>
              <p>{card.price}</p>
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