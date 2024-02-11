import axios from "axios";
import { setPlaceName } from "../Slices/scrapedDataSlice";
export const handleScrape = async (
  autoName,
  placeLink,
  ACCESS_TOKEN: string,
  dispatch,
  setScrapedSliceData,
  placeName
) => {
  await axios
    .post(
      "http://127.0.0.1:8000/api/scrape/",
      { placeLink: autoName ? autoName[0]?.canonical : placeLink },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )
    .then((res) => {
      dispatch(setScrapedSliceData(res.data));
      placeName && dispatch(setPlaceName(placeName));
    })

    .catch((err) => console.log(err.message));
};
