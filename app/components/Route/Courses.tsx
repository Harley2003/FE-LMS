"use client";

import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";
import React, { FC, useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

type Props = {};

const Courses: FC<Props> = (props) => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [course, setCourse] = useState<any[]>([]);

  useEffect(() => {
    setCourse(data?.courses);
  }, [data]);

  // Cấu hình cho slider
  const settingsTop = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const settingsBottom = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="py-10">
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className="text-center font-Poppins text-4xl font-bold mb-10 text-[#000] dark:text-white">
          Expand Your Career <span className="text-gradient">Opportunity</span>
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {course &&
            course.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>

        {/* <Slider {...settingsTop} className="mb-10">
          {course &&
            course.slice(0, 4).map((item: any, index: number) => (
              <div key={index} className="px-2">
                {" "}
                <CourseCard item={item} />
              </div>
            ))}
        </Slider>

        <Slider {...settingsBottom}>
          {course &&
            course.slice(4, 8).map((item: any, index: number) => (
              <div key={index} className="px-2">
                {" "} 
                <CourseCard item={item} />
              </div>
            ))}
        </Slider> */}
      </div>
    </div>
  );
};

export default Courses;
