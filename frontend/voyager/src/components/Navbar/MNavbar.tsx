import { NavLink } from "react-router-dom";

interface propInterface {
  width: boolean;
  setWidth: React.Dispatch<React.SetStateAction<boolean>>;
}

function MNavbar(props: propInterface) {
  return (
    <div
      className={`${
        props.width ? "w-[80vw]" : "w-0"
      } bg-black h-screen absolute overflow-hidden transition-all z-10 Mdirection touch-none md:hidden`}
    >
      <nav className=" flex flex-col justify-evenly items-center mx-3 cursor-pointer h-[80%] pt-5">
        <NavLink to="/" className="text-sm text-white font-semibold leading-6 ">
          Home
        </NavLink>
        <NavLink
          to="places"
          className="text-sm text-white font-semibold leading-6 "
        >
          Places
        </NavLink>

        <NavLink
          to="wishlist"
          className="text-sm text-white font-semibold leading-6 "
        >
          Wishlist
        </NavLink>
        <NavLink
          to="bookings"
          className="text-sm text-white font-semibold leading-6 "
        >
          Bookings
        </NavLink>
      </nav>
    </div>
  );
}
export default MNavbar;
