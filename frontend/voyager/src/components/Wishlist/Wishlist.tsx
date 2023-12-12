import getWishlistData from "../../utils/getWishlistData";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const Wishlist = () => {
  const ACCESS_TOKEN = useSelector((state: RootState) => state.tokens.access);
  return (
    <div>
      <button
        onClick={() => getWishlistData(ACCESS_TOKEN)}
        className="text-2xl border rounded"
      >
        Get Wishlist
      </button>
    </div>
  );
};
export default Wishlist;
