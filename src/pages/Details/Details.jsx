import React from "react";
import "./Details.scss";
import useFetch from "../../Hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";

const Details = () => {
  const { mediaType, id } = useParams(); // why we use only these two variable mediaType and id because inside app.jsx we define it path="/:mediaType/:id"
  // console.log(mediaType, id);
  // const {data,loading} = useFetch(`/movie/{movieId}`)
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  // console.log(credits);
  // console.log(data);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
    </div>
  );
};

export default Details;
