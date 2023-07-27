import React, { useEffect } from "react";
import "./FavMovie.scss";
import { useSelector } from "react-redux";
import MovieCard from "../../components/movieCard/MovieCard";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const FavMovie = () => {
  //   console.log(favMovies);

  const renderedMovieIds = new Set();

  let movies = JSON.parse(localStorage.getItem("LikedMovie")) || [];
  //   console.log(movies);

  const data = useSelector((state) => state.fav.item);

  // console.log(data);

  return (
    <div className="favMovie__container">
      <ContentWrapper>
        {/* {favMovies.map((movie) => {
        return <Carousel endPoint="day" data={movie} loading={false} />;
        // console.log(movie);
        // console.log(movie.title);
      })} */}
        <div className="favMovie__title">
          {movies?.length === 0
            ? "Like the movie to add it here"
            : "Your fav movies"}
        </div>
        {/* hello */}
        <div className="favMovie__Movies">
          {movies?.map((item, index) => {
            if (!renderedMovieIds.has(item.id)) {
              // Render the movie if its ID is not in the Set
              // console.log(item); // This is the movie you want to render
              renderedMovieIds.add(item.id); // Add the movie's ID to the Set to mark it as rendered
              // console.log(item);

              return <MovieCard key={index} data={item} />;
            }
            //   console.log(item);
          })}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default FavMovie;
