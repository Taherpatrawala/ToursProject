import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import toast, { Toaster } from "react-hot-toast";
import addToWishlist from "../utils/addToWishlist";
import BookingModal from "./Bookings/BookingModal";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../index.css";
import ReviewInput from "./ReviewSection/ReviewInput";

const PlaceOverview = () => {
  const { tour, event } = useParams();
  const [overview, setOverview] = useState<any>();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const card = {
    title: overview?.title,
    image: overview?.images[0],
    price: overview?.cost,
    redirectUrl: `/${tour}/${event}`,
  };
  console.log(tour, event);

  useEffect(() => {
    const handleEventOverview = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_LINK}/api/scrape/event/`,
          {
            redirectUrl: `/${tour}.html?placeCode=${event}`,
          }
        );
        setOverview(res.data);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    handleEventOverview();
  }, [tour, event]);

  if (!overview) {
    // You can add loading state or a message here
    return <div>Loading...</div>;
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex  flex-col">
      <div className=" h-full">
        <Swiper
          spaceBetween={10}
          navigation={true}
          autoplay={{
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          }}
          loop={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Autoplay, FreeMode, Navigation, Thumbs]}
          className="mySwiper2  md:h-[80vh]"
        >
          {overview?.images?.map((image: string) => {
            const newImage = image.replace("w=5&h=5", "w=auto&h=600");
            return (
              <SwiperSlide>
                <img
                  src={newImage ? newImage : image}
                  alt=""
                  className="object-contain"
                  style={{ objectFit: "contain" }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper md:h-[20vh]"
        >
          {overview?.images?.map((image: string) => {
            const newImage = image.replace("w=5&h=5", "w=auto&h=600");
            return (
              <SwiperSlide>
                <img src={newImage ? newImage : image} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="">
          <p className="text-4xl font-bold text-center">{overview.title}</p>
          <div className="flex justify-center">
            <p className="text-3xl font-semibold text-center">
              {overview.cost}
            </p>
            <div className="flex justify-center items-center hover:bg-[#f37979] bg-opacity-40 rounded-full transition-all z-20 mx-3 p-1">
              <p>Add to Wishlist </p>
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
            <div className="">
              <button
                className="p-2 m-2 border rounded-md bg-white border-green-300 hover:bg-green-300 hover:text-white transition-all duration-300 shadow-md"
                onClick={openModal}
              >
                Book!
              </button>
            </div>
            <BookingModal
              isOpen={isModalOpen}
              onClose={closeModal}
              event_title={card.title}
              redirectUrl={card.redirectUrl}
              event_price={card.price.split(" ")[1]}
              event_image={card.image}
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-[100vw]">
          <div
            dangerouslySetInnerHTML={{ __html: overview?.overview }}
            className="lg:w-[70vw] "
          ></div>
        </div>
        <Toaster />
      </div>
      <p className="text-center text-3xl">Add Review</p>
      <ReviewInput title={overview.title} />
    </div>
  );
};
export default PlaceOverview;
