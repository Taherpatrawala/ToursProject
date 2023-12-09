import axios from "axios";
import Cookies from "js-cookie";

interface cardDataInterface {
  image: string;
  title: string;
  price: string;
  redirectUrl: string;
}

const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");

export default async function addToWishlist(cardData: cardDataInterface) {
  await axios
    .post(
      "http://127.0.0.1:8000/auth/addToWishlist/",
      {
        event_title: cardData.title,
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
      console.log(res);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
