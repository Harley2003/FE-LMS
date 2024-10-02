import React, { FC } from "react";
import "./Loader.css";

type Props = {};

const Loader: FC<Props> = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default Loader;
