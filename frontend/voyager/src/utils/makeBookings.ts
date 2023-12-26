import axios from "axios";
import Cookies from "js-cookie";

interface paramsInterface {
  event_title: string;
  event_redirecturl: string;
  event_image: string;
  event_price: string;
  number_of_adults: number;
  check_in_date: Date;
}

export default async function makeBookings(params: paramsInterface) {
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");
  await axios.post(
    "http://localhost:8000/bookings/",
    {
      event_title: params.event_title,
      event_redirecturl: params.event_redirecturl,
      event_price: params.event_price,
      event_image: params.event_image,
      number_of_adults: params.number_of_adults,
      check_in_date: params.check_in_date,
    },
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
}
