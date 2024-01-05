import { useRef } from "react";

const BookingModal = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);

  const handleDialogClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} open={isOpen} className="modal">
      <div className="w-[30vw] h-[40vh] absolute z-30 bg-slate-400">
        <button className="close" onClick={handleDialogClose}>
          &times;
        </button>
        <div>
          <label
            htmlFor="Number of Adults"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Your email
          </label>
          <input
            type="text"
            name=""
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
            Your check in data
          </label>
          <input
            type="date"
            name=""
            id=""
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>
    </dialog>
  );
};
export default BookingModal;
