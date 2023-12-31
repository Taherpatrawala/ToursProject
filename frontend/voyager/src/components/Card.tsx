import toast, { Toaster } from "react-hot-toast";
import addToWishlist from "../utils/addToWishlist";
import deleteWishlist from "../utils/deleteWishlist";
import { useDispatch } from "react-redux";
import { setWishlistData } from "../Slices/wishlistSlice";
import getWishlistData from "../utils/getWishlistData";
interface Card {
  event_id: number;
  image: string;
  title: string;
  duration: string;
  inclusions: string;
  price: string;
  priceDesc: string;
  redirectUrl: string;
  ACCESS_TOKEN: string;
  wishlistComponent: boolean;
}

const Card = (card: Card) => {
  const dispatch = useDispatch();

  const handleWishlistDelete = (eventId: number) => {
    deleteWishlist(eventId).then(() => {
      getWishlistData(card.ACCESS_TOKEN).then((res) => {
        dispatch(setWishlistData(res.data));
      });
    });
  };

  return (
    <div className="flex flex-col md:flex-row w-[60vw] md:w-[70vw] md:h-[40vh]  lg:w-[75vw] m-4 rounded-md overflow-clip shadow-sm shadow-[#4f4e4e]">
      <div className="relative">
        <img src={card.image} alt="" className="w-full md:w-[30vw] md:h-full" />
        <div className="absolute top-1 right-1 hover:bg-[#f37979] bg-opacity-40 rounded-full transition-all z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-6 h-6 hover:text-red-600 m-1  cursor-pointer `}
            onClick={() =>
              toast.promise(addToWishlist(card), {
                loading: "Adding to Wishlist...",
                success: (message) => `${message}`,
                error: (err) => ` ${err}`,
              })
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center md:w-[40vw] lg:w-[45vw]">
        <p
          className="cursor-pointer hover:text-red-600 md:text-xl text-lg"
          onClick={() =>
            window.open(`${window.location.origin}${card.redirectUrl}`)
          }
        >
          {card.title}
        </p>
        {!card.wishlistComponent && <p>{card.duration}</p>}
        {!card.wishlistComponent && (
          <div className="grid md:grid-cols-4 grid-cols-2">
            {card.inclusions.map((inclusion: string) => {
              return (
                <div className="bg-[#d73636] m-1 rounded-md">
                  <p className="text-white text-center">{inclusion}</p>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-xl md:text-2xl lg:text-3xl font-bold">
          {card.price}
        </p>
        {!card.wishlistComponent && (
          <p className="text-[#333232]">{card.priceDesc}</p>
        )}
        {card.wishlistComponent ? (
          <button
            className="border rounded-md font-bold bg-[#c93e3e] text-white "
            onClick={() => handleWishlistDelete(card.event_id)}
          >
            Delete Wishlist
          </button>
        ) : null}
      </div>
      <Toaster />
    </div>
  );
};
export default Card;
