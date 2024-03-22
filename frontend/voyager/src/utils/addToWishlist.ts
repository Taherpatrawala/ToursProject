import axios from "axios";
import Cookies from "js-cookie";

interface cardDataInterface {
  image: string;
  title: string;
  price: string;
  redirectUrl: string;
}

export default async function addToWishlist(cardData: cardDataInterface) {
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");
  let message = "";
  await axios
    .post(
      `${import.meta.env.VITE_SERVER_LINK}auth/addToWishlist/`,
      {
        event_title: cardData.title.trim(),
        event_image: cardData.image,
        event_price: cardData.price,
        event_redirecturl: cardData.redirectUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      message = res.data;
    })
    .catch((err) => {
      console.log(err.response.data);
      throw new Error(err.response.data);
    });
  return message;
}
