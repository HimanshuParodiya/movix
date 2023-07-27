import React, { useEffect } from "react";
import dayjs from "dayjs";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./MovieCard.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import Img from "../lazyLoadingImages/img";
import LikeButton from "../LikeButton/LikeButton";
import { Close } from "@mui/icons-material";
import { addItem, setMovieLength } from "../../store/LikeSlice";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = data.poster_path
    ? url.poster + data.poster_path
    : PosterFallback;

  let item = JSON.parse(localStorage.getItem("LikedMovie"));
  // console.log(item?.length);
  let mov = item?.some((i) => {
    return i.id === data.id;
  });

  const dispatch = useDispatch();

  const handleCloseMovie = (e, data) => {
    e.stopPropagation();
    // console.log(data);

    const isMovieAlreadyLiked = item?.some((movie) => movie?.id === data.id);

    if (isMovieAlreadyLiked) {
      item = item?.filter((movie) => movie?.id !== data.id);
      // console.log(item);
    } else {
      item.push(data);
    }
    localStorage.setItem("LikedMovie", JSON.stringify(item));

    dispatch(addItem(data));
    let favMovieLength = JSON.parse(localStorage.getItem("LikedMovie"));
    dispatch(setMovieLength(favMovieLength?.length));
  };

  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
    >
      <div className="posterBlock">
        {mov && (
          <div className="closeBtn" onClick={(e) => handleCloseMovie(e, data)}>
            <Close className="closeIcon" />
          </div>
        )}
        {!mov && <LikeButton myItem={data} />}
        <Img className="posterImg" src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data?.vote_average?.toFixed(1)} />
            <Genres data={data?.genre_ids?.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="textBlock">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MMM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
