import axios from "axios";
import { useState } from "react";
const Scraper = () => {
  const [scrapedData, setScrapedData] = useState<any>();
  const [placeName, setPlaceName] = useState<string>("");

  const handleScrape = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/api/scrape/",
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
        {scrapedData?.data?.images?.map((image: string) => {
          return <img src={image} alt="" className="w-[45vw]" />;
        })}
      </div>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: scrapedData?.data.description }}
      ></div>
    </div>
  );
};
export default Scraper;
