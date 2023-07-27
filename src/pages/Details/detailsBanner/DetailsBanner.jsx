import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import PosterFallback from "../../../assets/no-poster.png";
import useFetch from "../../../Hooks/useFetch";
import Img from "../../../components/lazyLoadingImages/img";
import { PlayButton } from "../PlayButton";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false); //initialized with null, indicating that there is no video ID set initially.
  const [videpId, setVidepId] = useState(null); //initialized with null, indicating that there is no video ID set initially.
  const { mediaType, id } = useParams(); // why we use only these two variable mediaType and id because inside app.jsx we define it path="/:mediaType/:id"
  // const {data,loading} = useFetch(`/movie/{movieId}`)
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const detailGenres = data?.genres?.map((detailGenre) => detailGenre.id);

  // creating arroy for role of director and writer
  const director = crew?.filter((member) => member.job === "Director");
  const writer = crew?.filter(
    (member) =>
      member.job === "Screenplay" ||
      member.job === "Writer" ||
      member.job === "Story"
  );
  // console.log(director);
  // console.log(writer);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  // console.log(data);
  // console.log(video);
  // console.log(crew);

  return (
    <div className="detailsBanner__container">
      {!loading ? (
        <>
          {data && (
            <>
              <div className="backdrop__image">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity__layer"></div>
              <ContentWrapper>
                <div className="detail__content">
                  <div className="content__left">
                    {data.poster_path ? (
                      <Img
                        className="detail__posterImage"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img
                        className="detail__posterImage"
                        src={PosterFallback}
                      />
                    )}
                  </div>
                  <div className="content__right">
                    <div className="content__rightTitle">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="content__rightSubTitle">{data.tagline}</div>
                    <Genres data={detailGenres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average?.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true), setVidepId(video.key);
                        }}
                      >
                        <PlayButton />
                        <span className="playBtn__text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="overview__heading">Overview</div>
                      <div className="overview__description">
                        {data.overview}
                      </div>
                    </div>
                    <div className="detail__info">
                      {data.status && (
                        <div className="detail__infoItem">
                          <span className="detail__infoText bold">Status:</span>
                          <span className="detail__infoText">
                            {data.status}
                          </span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="detail__infoItem">
                          <span className="detail__infoText bold">
                            Release Date:
                          </span>
                          <span className="detail__infoText">
                            {dayjs(data.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="detail__infoItem">
                          <span className="detail__infoText bold">
                            Runtime:
                          </span>
                          <span className="detail__infoText">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="detail__info">
                        <span className="detail__infoText bold">Director:</span>
                        <span className="detail__infoText">
                          {director?.map((directorName, index) => (
                            <span key={index}>
                              {" "}
                              {directorName.name}{" "}
                              {director.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="detail__info">
                        <span className="detail__infoText bold">Writer:</span>
                        <span className="detail__infoText">
                          {writer?.map((writerName, index) => (
                            <span key={index}>
                              {" "}
                              {writerName.name}{" "}
                              {writer.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="detail__info">
                        <span className="detail__infoText bold">Creator:</span>
                        <span className="detail__infoText">
                          {data.created_by?.map((creatorName, index) => (
                            <span key={index}>
                              {" "}
                              {creatorName.name}{" "}
                              {data.created_by?.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videpId}
                  setVideoId={setVidepId}
                />
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
