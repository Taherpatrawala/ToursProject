import toast, { Toaster } from "react-hot-toast";
import addToWishlist from "../utils/addToWishlist";
import deleteWishlist from "../utils/deleteWishlist";

interface Card {
  event_id: number;
  image: string;
  title: string;
  price: string;
  redirectUrl: string;
  wishlistComponent: boolean;
}

const Card = (card: Card) => {
  return (
    <div className="w-[25vw] md:w-[20vw] md:h-[65vh] m-4 rounded-md overflow-clip shadow-sm shadow-[#4f4e4e]">
      <div className="relative">
        <img src={card.image} alt="" className="w-[30vw]" />
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

      <p
        className="w-[20vw] cursor-pointer hover:text-red-600"
        onClick={() =>
          window.open(`${window.location.origin}${card.redirectUrl}`)
        }
      >
        {card.title}
      </p>
      <p>{card.price}</p>
      {card.wishlistComponent ? (
        <button
          className="border rounded-md font-bold bg-[#c93e3e] text-white "
          onClick={() => deleteWishlist(card.event_id)}
        >
          Delete Wishlist
        </button>
      ) : null}
      <Toaster />
    </div>
  );
};
export default Card;
