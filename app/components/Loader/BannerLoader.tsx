import React, { FC } from "react";
import "./BannerLoader.css";

type Props = {};

const BannerLoader: FC<Props> = () => {
  return (
    <div className="banner-loader flex justify-center items-center h-screen">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default BannerLoader;
