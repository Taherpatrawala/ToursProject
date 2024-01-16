import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
const Bookings = () => {
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");
  useEffect(() => {
    const func = async () => {
      await axios
        .get("http://localhost:8000/bookings/getBookingData/", {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })

        .then((res) => console.log(res.data));
    };
    func();
  }, []);

  return <div></div>;
};
export default Bookings;
