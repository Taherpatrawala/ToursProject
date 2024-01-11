import { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const BookingModal = ({
  isOpen,
  onClose,
  event_title,
  redirectUrl,
  event_price,
  event_image,
}) => {
  const dialogRef = useRef(null);
  interface bookingDetailsInterface {
    number_of_adults: number | null;
    check_in_date: string | number | readonly string[] | undefined;
  }
  const [bookingDetails, setBookingDetails] = useState<bookingDetailsInterface>(
    {
      number_of_adults: 0,
      check_in_date: new Date().toISOString().slice(0, 10),
    }
  );
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");

  const handleDialogClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      onClose();
    }
  };

  const handleBooking = async () => {
    const todayDate = new Date().toISOString().slice(0, 10);
    console.log(todayDate);

    return await axios.post(
      "http://localhost:8000/bookings/",
      {
        event_title: event_title,
        event_price: event_price,
        event_redirecturl: redirectUrl,
        event_image: event_image,
        number_of_adults: bookingDetails.number_of_adults,
        check_in_date: bookingDetails.check_in_date,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
  };

  return (
    <dialog ref={dialogRef} open={isOpen} className="modal">
      <div className="w-[100vw] h-screen bg-black bg-opacity-40 flex justify-center items-center fixed top-0 left-0 z-50 transition-all ">
        <div className=" w-[70vw]  md:w-[50vw] lg:w-[35vw] h-[40vh]  bg-slate-400 relative p-2 rounded-lg">
          <button
            className="close text-4xl text-white text-right absolute top-0 right-0"
            onClick={handleDialogClose}
          >
            &times;
          </button>
          <p className="text-center">{event_title}</p>
          <div className="mt-5">
            <label
              htmlFor="Number of Adults"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Number of Adults
            </label>
            <input
              type="text"
              name=""
              value={bookingDetails.number_of_adults}
              onChange={(e) =>
                setBookingDetails({
                  ...bookingDetails,
                  number_of_adults: parseInt(e.target.value) || 0,
                })
              }
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter number of people"
            />
          </div>
          <div>
            <label
              htmlFor="Number of Adults"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your check in date
            </label>
            <input
              type="date"
              name=""
              value={bookingDetails.check_in_date}
              onChange={(e) =>
                setBookingDetails({
                  ...bookingDetails,
                  check_in_date: e.target.value,
                })
              }
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={handleBooking}
              name=""
              id=""
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              Book!
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};
export default BookingModal;
