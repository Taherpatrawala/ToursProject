import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
const PlaceOverview = () => {
  const { tour, event } = useParams();
  const [overview, setOverview] = useState<any>();
  console.log(tour, event);

  useEffect(() => {
    const handleEventOverview = async () => {
      await axios
        .post("http://127.0.0.1:8000/api/scrape/event/", {
          redirectUrl: `/${tour}/${event}`,
        })
        .then((res) => setOverview(res.data))
        .catch((err) => console.log(err.message));
    };
    handleEventOverview();
  }, []);

  return (
    <div>
      {overview?.images.map((image: string) => (
        <img src={image} alt="" />
      ))}
      <div dangerouslySetInnerHTML={{ __html: overview?.overview }}></div>
    </div>
  );
};
export default PlaceOverview;
