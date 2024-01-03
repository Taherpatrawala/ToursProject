import Card from "../Card";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import getWishlistData from "../../utils/getWishlistData";
import { useDispatch } from "react-redux";
import { setWishlistData } from "../../Slices/wishlistSlice";

import Cookies from "js-cookie";
const Wishlist = () => {
  const ACCESS_TOKEN: string = Cookies.get("ACCESS_TOKEN");
  const wishlists = useSelector((state: RootState) => state.wishlistData);
  const dispatch = useDispatch();

  useEffect(() => {
    const wishlist = getWishlistData(ACCESS_TOKEN);
    wishlist.then((res) => dispatch(setWishlistData(res.data)));
  }, []);

  return (
    <div>
      <button
        onClick={() => console.log(wishlists)}
        className="text-2xl border rounded"
      >
        Get Wishlist
      </button>
      {wishlists
        ? wishlists.map((card) => {
            return (
              <div className="flex justify-center">
                <Card
                  event_id={card.id}
                  image={card.event_image}
                  title={card.event_title}
                  inclusions=""
                  duration=""
                  priceDesc=""
                  price={card.event_price}
                  redirectUrl={card.event_redirecturl}
                  ACCESS_TOKEN={ACCESS_TOKEN}
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
