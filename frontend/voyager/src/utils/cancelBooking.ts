import axios from "axios";

export const cancelBooking = async (title: string, ACCESS_TOKEN: string) => {
  await axios.delete(
    `${import.meta.env.VITE_SERVER_LINK}/bookings/cancelBooking/`,
    {
      data: { event_title: title },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
};
