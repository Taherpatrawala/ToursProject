import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Card from "../Card";
const Bookings = () => {
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");
  const [bookingsData, setBookingsData] = useState();
  useEffect(() => {
    const func = async () => {
      await axios
        .get("http://localhost:8000/bookings/getBookingData/", {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })

        .then((res) => setBookingsData(res.data));
    };
    func();
  }, []);

  return (
    <div>
      <div className="">
        {bookingsData?.map((booking) => {
          return (
            <Card
              event_id={booking.id}
              image={booking.event_image}
              title={booking.event_title}
              inclusions=""
              duration=""
              priceDesc=""
              price={booking.event_price}
              redirectUrl={booking.event_redirecturl}
              ACCESS_TOKEN={ACCESS_TOKEN}
              Component="bookings"
            />
          );
        })}
      </div>
    </div>
  );
};
export default Bookings;
