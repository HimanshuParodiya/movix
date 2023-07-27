import React from "react";
import "./LikeButton.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addToFav, setMovieLength } from "../../store/LikeSlice";
import ContentWrapper from "../contentWrapper/ContentWrapper";

const LikeButton = ({ myItem }) => {
  const favMovies = useSelector((state) => state.fav.liked);
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.stopPropagation();
    const storedLikedMovies =
      JSON.parse(localStorage.getItem("LikedMovie")) || [];
    const isObjectExist = storedLikedMovies.some(
      (obj) => obj?.id === myItem?.id
    );
    let favMovieLength = JSON.parse(localStorage.getItem("LikedMovie"));
    //console.log(favMovieLength.length); // it returning actual length - 1 so i will add 1 by my side
    dispatch(setMovieLength(favMovieLength.length + 1));
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
    }
    // Toggle the "red" class on the target element after handling the localStorage
  };

  const LikedMovies = JSON.parse(localStorage.getItem("LikedMovie"));
  //   useEffect(() => {
  //   }, []);

  let likeMovie = LikedMovies?.some((item) => {
    return item?.id === myItem?.id;
  });
  //   console.log(likeMovie);

  return (
    <div className="likeButton" onClick={handleLike}>
      <FavoriteIcon className={`heart__icon ${likeMovie && "red"}`} />
    </div>
  );
};

export default LikeButton;
