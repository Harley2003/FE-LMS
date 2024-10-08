"use client";

import React, {FC, useEffect, useState} from "react";
import CourseInfomation from "./CourseInfomation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import toast from "react-hot-toast";
import {redirect} from "next/navigation";
import {useGetAllCoursesQuery, useEditCourseMutation} from "@/redux/features/courses/courseApi";

type Props = {
    id: string;
};

const EditCourse: FC<Props> = ({id}) => {
    const {isLoading, data, refetch} = useGetAllCoursesQuery(
        {},
        {refetchOnMountOrArgChange: true}
    );
    const editCourseData =
        data && data.courses.find((item: any) => item._id === id);
    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                categories: editCourseData.categories,
                price: editCourseData.price,
                estimatedPrice: editCourseData?.estimatedPrice,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData?.thumbnail?.url
            });
            setBenefits(editCourseData.benefits);
            setPrerequisites(editCourseData.prerequisites);
            setCourseContentData(editCourseData.courseData);
        }
    }, [editCourseData]);
    const [editCourse, {isSuccess, error}] = useEditCourseMutation();
    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        categories: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: ""
    });
    const [benefits, setBenefits] = useState([{title: ""}]);
    const [prerequisites, setPrerequisites] = useState([{title: ""}]);
    const [courseContentData, setCourseContentData] = useState([
        {
            title: "",
            videoUrl: "",
            description: "",
            videoSection: "Untitled Section",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: ""
                }
            ],
            suggestion: ""
        }
    ]);
    const [courseData, setCourseData] = useState({});
    const handleCourseContentSubmit = async () => {
        // format benefits array
        const formattedBenefits = benefits.map((benefit) => ({
            title: benefit.title
        }));

        // format prerequisites array
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({
            title: prerequisite.title
        }));

        // format course content array
        const formattedCourseContentData = courseContentData.map(
            (courseContent) => ({
                videoUrl: courseContent.videoUrl,
                title: courseContent.title,
                description: courseContent.description,
                videoSection: courseContent.videoSection,
                videoLength: courseContent.videoLength,
                links: courseContent.links.map((link) => ({
                    title: link.title,
                    url: link.url
                })),
                suggestion: courseContent.suggestion
            })
        );

        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData
        };

        setCourseData(data);
    };

    const handleCoursePreviewSubmit = async () => {
        const data = courseData;
        if (!isLoading) {
            await editCourse({id: editCourseData?._id, data});
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Edit course successfully!");
            redirect("/admin/display-courses");
        }

        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error, isLoading]);

    return (
        <div className="w-full flex min-h-screen">
            <div className="w-[80%]">
                {active === 0 && (
                    <CourseInfomation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                )}
                {active === 1 && (
                    <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        active={active}
                        setActive={setActive}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                    />
                )}
                {active === 2 && (
                    <CourseContent
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        active={active}
                        setActive={setActive}
                        handleCourseContentSubmit={handleCourseContentSubmit}
                    />
                )}
                {active === 3 && (
                    <CoursePreview
                        courseData={courseData}
                        active={active}
                        setActive={setActive}
                        isTrue={true}
                        handleCoursePreviewSubmit={handleCoursePreviewSubmit}
                    />
                )}
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
                <CourseOptions active={active} setActive={setActive}/>
            </div>
        </div>
    );
};

export default EditCourse;
