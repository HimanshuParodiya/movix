import React from "react";
import "./LikeButton.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addToFav } from "../../store/LikeSlice";
import ContentWrapper from "../contentWrapper/ContentWrapper";

const LikeButton = ({ myItem }) => {
  const favMovies = useSelector((state) => state.fav.liked);
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.stopPropagation();
    const isObjectExist = favMovies?.some((obj) => obj?.id === myItem?.id);
    if (!isObjectExist) {
      // If the new object doesn't exist, add it to the array
      dispatch(addToFav(myItem));
      //   localStorage.setItem("LikedMovies", JSON.stringify([myItem]));

      const storedLikedMovies =
        JSON.parse(localStorage.getItem("LikedMovie")) || [];

      // Add the new item to the existing liked movies array
      storedLikedMovies.push(myItem);

      // Store the updated array back in localStorage
      localStorage.setItem("LikedMovie", JSON.stringify(storedLikedMovies));
    } else {
      console.log("remove item from localstorage");

      // If the object exists, remove it from the array
      const updatedLikedMovies = favMovies.filter(
        (obj) => obj?.id !== myItem?.id
      );

      // Update the favMovies state with the filtered array (remove the item)
      dispatch(addToFav(updatedLikedMovies));

      // Update the localStorage with the filtered array (remove the item)
      localStorage.setItem("LikedMovie", JSON.stringify(updatedLikedMovies));

      // like se dislike krne pe jo pehle dilke kiye the wo like ho rhe h fir current item dislike ho raha h
      // that was my observation
    }

    // Toggle the "red" class on the target element after handling the localStorage
    e.target.classList.toggle("red");
  };

  // const LikedMovies = JSON.parse(localStorage.getItem("LikedMovie"));
  //   useEffect(() => {
  //   }, []);

  // let likeMovie = LikedMovies.some((item) => {
  //   return item?.id === myItem?.id;
  // });
  //   console.log(likeMovie);

  return (
    <div className="likeButton" onClick={handleLike}>
      <FavoriteIcon className={`heart__icon ${false && "red"}`} />
    </div>
  );
};

export default LikeButton;
