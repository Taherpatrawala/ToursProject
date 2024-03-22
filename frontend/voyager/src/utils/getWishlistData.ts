import axios from "axios";

export default async (ACCESS_TOKEN: string) => {
  return await axios
    .get(`${import.meta.env.VITE_SERVER_LINK}/api/accounts/getWishlist/`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })

    .catch((err) => console.error(err.message));
};
