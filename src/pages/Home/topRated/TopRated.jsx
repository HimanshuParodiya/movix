import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../Hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const TopRated = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const { data, loading } = useFetch(`/${endPoint}/top_rated`); // we can find endpoints from tdbm
  // console.log(data);
  //   console.log(data);
  const onTabChange = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carousel__container">
      <ContentWrapper>
        <span className="carousel__title">Top Rated</span>
        <SwitchTabs data={["Movies", "TV shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel endPoint={endPoint} data={data?.results} loading={loading} />
    </div>
  );
};

export default TopRated;
