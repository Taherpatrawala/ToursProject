import Card from "../Card";
import { useEffect, useState } from "react";
import getWishlistData from "../../utils/getWishlistData";

import Cookies from "js-cookie";
const Wishlist = () => {
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");
  const [cards, setCards] = useState();
  useEffect(() => {
    const wishlist = getWishlistData(ACCESS_TOKEN);
    wishlist.then((res) => setCards(res.data));
  }, []);

  return (
    <div>
      <button
        onClick={() => getWishlistData(ACCESS_TOKEN)}
        className="text-2xl border rounded"
      >
        Get Wishlist
      </button>
      {cards
        ? cards.map((card) => {
            return (
              <div className="">
                <Card
                  event_id={card.id}
                  image={card.event_image}
                  title={card.event_title}
                  price={card.event_price}
                  redirectUrl={card.event_redirecturl}
                  wishlistComponent={true}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};
export default Wishlist;
