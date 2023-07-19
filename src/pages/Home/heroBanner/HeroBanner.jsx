import React, { useEffect, useState } from "react";
import "./HeroBanner.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadingImages/img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useSelector((state) => state.home); // destructuring url from homeSlice
  const navigate = useNavigate();
  const { data, loading } = useFetch("/movie/upcoming"); // initially data will be empty

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    // console.log(bg);
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`); // navigating to search Result section
    }
  };
  return (
    <>
      <div className="heroBanner__container">
        {!loading && (
          <div className="backdrop__img">
            <Img src={background} />
          </div>
        )}

        <div className="homeBanner__opacityLayer"></div>

        <ContentWrapper>
          <div className="heroBanner__content">
            <span className="heroBanner__title">Welcome</span>
            <span className="heroBanner__subTitle">
              Discover Movies and Tv Show in Detail
            </span>
            <div className="heroBanner__searchInput">
              <input
                value={query}
                type="text"
                placeholder="Search for a movie or tv show...."
                onKeyUp={searchQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="heroBanner__searchIcon">Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
};

export default HeroBanner;
