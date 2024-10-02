"use client";

import {useGetUsersAllCoursesQuery} from "@/redux/features/courses/courseApi";
import {useGetHeroDataQuery} from "@/redux/features/layout/layoutApi";
import {useSearchParams} from "next/navigation";
import React, {FC, useEffect, useState} from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import {styles} from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";

type Props = {};

const Page: FC<Props> = (props) => {
    const searchParams = useSearchParams();
    const search = searchParams?.get("title");
    const {data, isLoading} = useGetUsersAllCoursesQuery(undefined, {});
    const {data: dataCategory} = useGetHeroDataQuery("Categories", {});
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState("All");
    const [displayedCoursesCount, setDisplayedCoursesCount] = useState(4);

    useEffect(() => {
        if (category === "All") {
            setCourses(data?.courses);
        } else {
            setCourses(
                data?.courses.filter((item: any) => item.categories === category)
            );
        }

        if (search) {
            setCourses(
                data?.courses.filter((item: any) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        setDisplayedCoursesCount(4);
    }, [category, data, search]);

    const handleSeeMore = () => {
        setDisplayedCoursesCount((prevCount) => prevCount + 4);
    };

    const categories = dataCategory?.layout.categories;

    return (
        <div className="min-h-screen">
            {isLoading ? (
                <Loader/>
            ) : (
                <>
                    <Heading
                        title="All course - Elearning"
                        description="Elearning is a programming community"
                        keywords="Programming,MERN,Redux,Machine Learning"
                    />
                    <Header
                        route={route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />
                    <br/>
                    <h1 className={`${styles.title} 800px:!text-[45px]`}>
                        <span className="text-gradient">List Course</span>
                    </h1>
                    <br/>
                    <br/>
                    <div className="w-full flex items-center justify-center flex-wrap">
                        <div
                            className={`${
                                category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                            } h-[35px] m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                            onClick={() => setCategory("All")}
                        >
                            All
                        </div>
                        {categories &&
                            categories.map((item: any, index: number) => (
                                <div key={index}>
                                    <div
                                        className={`${
                                            category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"
                                        } h-[35px] m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                                        onClick={() => setCategory(item.title)}
                                    >
                                        {item.title}
                                    </div>
                                </div>
                            ))}
                    </div>
                    {courses && courses.length === 0 && (
                        <p
                            className={`${styles.label} flex items-center justify-center min-h-[50vh]`}
                        >
                            {search
                                ? "No courses found!"
                                : "No courses found in this category. Please try another one!"}
                        </p>
                    )}
                    <br/>
                    <br/>
                    <div
                        className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0 mx-auto px-4">
                        {courses && courses.slice(0, displayedCoursesCount).map((item: any, index: number) => (
                            <CourseCard item={item} key={index}/>
                        ))}
                    </div>
                    {courses && displayedCoursesCount < courses.length && (
                        <div className="flex justify-center">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={handleSeeMore}
                            >
                                See More
                            </button>
                        </div>
                    )}
                    <br/>
                    <br/>
                    <Footer/>
                </>
            )}
        </div>
    );
};

export default Page;
