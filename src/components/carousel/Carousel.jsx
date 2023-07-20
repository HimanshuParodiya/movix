import React, { useRef } from "react";
import "./Carousel.scss";
import "/src/index.scss";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import PosterFallback from "../../assets/no-poster.png";
import Img from "../lazyLoadingImages/img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading }) => {
  //   console.log(data);
  const carouselContainer = useRef(); // selecting an element in react
  const { url } = useSelector((state) => state.home);
  //   console.log(url);
  const navigate = useNavigate();

  const navigation = (direction) => {
    const container = carouselContainer.current; // selecting container
    console.log(container);

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeleton__item">
        <div className="skeleton__posterBlock skeleton"></div>
        <div className="skeleton__textBlock">
          <div className="skeleton__posterTitle skeleton"></div>
          <div className="skeleton__posterDate skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel__container">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="carousel__leftArrow arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carousel__rightArrow arrow"
          onClick={() => navigation("right")}
        />

        {!loading ? (
          <div ref={carouselContainer} className="carousel__items">
            {data?.map((item) => {
              //   console.log(item);
              const posterUrl = item?.poster_path
                ? url?.poster + item?.poster_path
                : PosterFallback;

              //   console.log(posterUrl);
              // console.log(item);
              return (
                <div
                  key={item.id}
                  className="carousel__item "
                  onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                >
                  {/* {item} */}
                  <div className="carousel__posterBlock">
                    <Img src={posterUrl} />

                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    {/* we want to send only 2 genres so we are using slice */}
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="poster__textBlock">
                    <span className="poster__title">
                      {item?.title || item.name}
                    </span>
                    <span className="poster__date">
                      {dayjs(item.release_date).format("MMM D YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="skeleton__container">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;