import React from "react";
import "./Genres.scss";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  // console.log(genres);
  return (
    <div className="genres__container">
      {data?.map((genre) => {
        if (!genres[genre]?.name) {
          return;
        }
        return (
          <div key={genre} className="genre">
            {genres[genre]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
