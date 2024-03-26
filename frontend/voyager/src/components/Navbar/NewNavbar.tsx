import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import logo from "../assets/logo.svg";
import MNavbar from "./MNavbar";

const NewNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const [width, setWidth] = useState(false);

  return (
    <div
      className={`${
        path === "/" ? "absolute top-0 text-white" : "relative text-gray-900"
      } w-[100vw] z-50`}
    >
      {width ? <MNavbar width={width} setWidth={setWidth} /> : null}
      <header className="bg-transparent">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Voyager</span>
              <img src={logo} className="" alt="" />
            </NavLink>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => {
                setWidth((prev) => !prev);
              }}
              className="z-50 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 text-red-600 z-50  touch-none ${
                  width ? "rotate-90" : null
                } transition-all`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <NavLink to="/" className="text-sm font-semibold leading-6 ">
              Home
            </NavLink>
            <NavLink to="places" className="text-sm font-semibold leading-6 ">
              Places
            </NavLink>

            <NavLink to="wishlist" className="text-sm font-semibold leading-6 ">
              Wishlist
            </NavLink>
            <NavLink to="bookings" className="text-sm font-semibold leading-6 ">
              Bookings
            </NavLink>
          </div>
          {!Cookies.get("ACCESS_TOKEN") ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <NavLink to="/login" className="text-sm font-semibold leading-6 ">
                Log in <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </div>
          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <NavLink to="/" className="text-sm font-semibold leading-6 ">
                Log out <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};
export default NewNavbar;
