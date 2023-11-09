import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "../index.css";
const PlaceOverview = () => {
  const { tour, event } = useParams();
  const [overview, setOverview] = useState<any>();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  console.log(tour, event);

  useEffect(() => {
    const handleEventOverview = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/scrape/event/",
          {
            redirectUrl: `/${tour}/${event}`,
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

  return (
    <div>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2  md:h-[80vh]"
      >
        {overview?.images?.map((image: string) => {
          return (
            <SwiperSlide>
              <img src={image} alt="" />
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
          return (
            <SwiperSlide>
              <img src={image} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div dangerouslySetInnerHTML={{ __html: overview?.overview }}></div>
    </div>
  );
};
export default PlaceOverview;
