import axios from "axios";

export const cancelBooking = async (title: string, ACCESS_TOKEN: string) => {
  await axios.delete("http://localhost:8000/bookings/cancelBooking/", {
    data: { event_title: title },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};
