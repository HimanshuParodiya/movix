import React, { useState } from "react";

import "./OfficialVideos.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoadingImages/img";
import { PlayButton } from "../PlayButton";
const OfficialVideos = ({ data, loading }) => {
  // console.log(loading);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  const handleWordLength = (word) => {
    if (word?.length > 20) {
      return word.slice(0, 25).concat("...");
    }
    return word;
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        {!loading ? (
          <div className="videos">
            {data?.results?.map((video) => {
              return (
                <div
                  key={video.id}
                  onClick={() => {
                    setVideoId(video.key), setShow(true);
                  }}
                  className="videoItem"
                >
                  <div className="videoThumbnail">
                    <Img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    />
                    <PlayButton />
                  </div>
                  <div className="videoTitle">
                    {handleWordLength(video.name)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default OfficialVideos;
