"use client";

import Image from "next/image";
import React, { FC } from "react";
import Ratings from "../../utils/Ratings";

type Props = {
  item: any;
};

const ReviewCard: FC<Props> = ({ item }) => {
  return (
    <div className="w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-20 border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] p-3 rounded min-h-[250px] flex flex-col">
      <div className="w-full flex">
        <Image
          src={item.avatar}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover"
          width={50}
          height={50}
        />
        <div className="800px:flex justify-between w-full hidden">
          <div className="pl-4">
            <h5 className="text-[20px] dark:text-white text-black">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-[#000] dark:text-[#ffffffab]">
              {item.profession}
            </h6>
          </div>
          <Ratings rating={item.ratings} />
        </div>
        {/* mobile */}
        <div className="800px:hidden w-full flex justify-between flex-col">
          <div className="pl-4">
            <h5 className="text-[20px] dark:text-white text-black">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-[#000] dark:text-[#ffffffab]">
              {item.profession}
            </h6>
          </div>
          <Ratings rating={item.ratings} />
        </div>
      </div>
      <p className="pt-2 px-2 font-Poppins dark:text-white text-black flex-grow">
        {item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
