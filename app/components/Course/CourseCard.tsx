"use client";

import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";

type Props = {
  item: any;
  isProfile?: boolean;
  user?: any;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] rounded-lg p-3 shadow-lg">
  <Image
    src={item.thumbnail?.url}
    width={500}
    height={300}
    objectFit="cover"
    className="rounded-lg w-full h-100 object-cover"
    alt={item.name}
  />
  <h1 className="font-Poppins text-[18px] dark:text-[#fff] text-black font-semibold mt-2">{item.name}</h1>
  <div className="w-full flex items-center justify-between pt-2">
    <Ratings rating={item.ratings} />
    <h5 className={`dark:text-[#fff] text-black`}>
      {item.purchased} Students
    </h5>
  </div>
  <div className="w-full flex items-center justify-between pt-3">
    <div className="flex">
      <h3 className="dark:text-[#fff] text-black font-semibold">
        {item.price === 0 ? "Free" : item.price + "$"}
      </h3>
      <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]">
        {item.estimatedPrice + "$"}
      </h5>
    </div>
    <div className="flex items-center pb-3">
      <AiOutlineUnorderedList size={20} fill="#fff" />
      <h5 className="pl-2 dark:text-[#fff] text-black">
        {item.courseData?.length + " Lectures"}
      </h5>
    </div>
  </div>
</div>
    </Link>
  );
};

export default CourseCard;
