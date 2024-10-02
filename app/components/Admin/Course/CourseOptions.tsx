"use client";

import React, {FC} from "react";
import {IoMdCheckmark} from "react-icons/io";

type Props = {
    active: number;
    setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({active, setActive}) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ];

    return (
        <div className="ml-[15px]">
            {options.map((option: any, index: number) => (
                <div className="w-full flex py-5" key={index}>
                    <div
                        className={`w-[35px] h-[35px] sm:w-[30px] sm:h-[30px] rounded-full flex items-center justify-center ${
                            active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                        } relative`}
                    >
                        <IoMdCheckmark className="text-[25px] sm:text-[20px]"/>
                        {index !== options.length - 1 && (
                            <div
                                className={`absolute w-1 ${
                                    active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                                } top-full left-1/2 transform -translate-x-1/2`}
                                style={{height: "calc(100% + 35px)"}}
                            ></div>
                        )}
                    </div>
                    <h5
                        className={`pl-3 ${
                            active === index
                                ? "dark:text-white text-black"
                                : "dark:text-white text-black"
                        } text-[20px] sm:text-[18px]`}
                    >
                        {option}
                    </h5>
                </div>
            ))}
        </div>
    );
};

export default CourseOptions;
