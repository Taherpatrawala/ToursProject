import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
const ReviewInput = (props) => {
  const [review, setReview] = useState<string>();
  const [image, setImage] = useState<File>();
  const ACCESS_TOKEN = Cookies.get("ACCESS_TOKEN");

  const handleReview = async () => {
    axios.post(
      `${import.meta.env.VITE_SERVER_LINK}/api/accounts/addReview/`,
      {
        review: review,
        event_title: props.title,
        review_image: image,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <textarea
        className=" resize max-w-[90vw] border border-black outline-none"
        name=""
        id=""
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <div className="flex">
        <input
          type="file"
          name=""
          id=""
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button onClick={handleReview}>ADD REVIEW</button>
      </div>
    </div>
  );
};
export default ReviewInput;
