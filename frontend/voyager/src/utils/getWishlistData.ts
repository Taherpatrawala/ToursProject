import axios from "axios";

export default async (ACCESS_TOKEN: string) => {
  return await axios.get("http://localhost:8000/api/accounts/getWishlist/", {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
};
