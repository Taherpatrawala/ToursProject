import axios from "axios";
import Cookies from "js-cookie";
const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");

export default async (event_id: number) => {
  return axios.delete(
    `${import.meta.env.VITE_SERVER_LINK}/api/accounts/deleteWishlist/`,

    {
      data: { id: event_id },

      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
};
