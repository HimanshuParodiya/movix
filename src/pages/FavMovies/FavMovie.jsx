import React from "react";
import "./FavMovie.scss";
import { useSelector } from "react-redux";
import MovieCard from "../../components/movieCard/MovieCard";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

const FavMovie = () => {
  //   console.log(favMovies);

  const renderedMovieIds = new Set();

  let movies = JSON.parse(localStorage.getItem("LikedMovie")) || [];
  //   console.log(movies);

  return (
    <div className="favMovie__container">
      <ContentWrapper>
        {/* {favMovies.map((movie) => {
        return <Carousel endPoint="day" data={movie} loading={false} />;
        // console.log(movie);
        // console.log(movie.title);
      })} */}
        <div className="favMovie__title">
          {movies.length === 0
            ? "You have not select anty movie yet"
            : "Your fav movies"}
        </div>
        {/* hello */}
        <div className="favMovie__Movies">
          {movies.map((item, index) => {
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
