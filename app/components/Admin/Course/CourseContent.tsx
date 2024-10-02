"use client";

import {styles} from "@/app/styles/style";
import React, {FC, useState} from "react";
import toast from "react-hot-toast";
import {AiOutlineDelete, AiOutlinePlusCircle} from "react-icons/ai";
import {BsLink45Deg, BsPencil} from "react-icons/bs";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any[];
    setCourseContentData: (courseContentData: any[]) => void;
    handleCourseContentSubmit: any;
};

const CourseContent: FC<Props> = ({
                                      active,
                                      setActive,
                                      courseContentData,
                                      setCourseContentData,
                                      handleCourseContentSubmit
                                  }) => {
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );

    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    const handleCollapseToggle = (index: number) => {
        const updatedCollapseToggle = [...isCollapsed];
        updatedCollapseToggle[index] = !updatedCollapseToggle[index];
        setIsCollapsed(updatedCollapseToggle);
    };

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index] = {
            ...updatedData[index],
            links: updatedData[index].links.filter((_: any, i: number) => i !== linkIndex)
        };
        setCourseContentData(updatedData);
    };

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index] = {
            ...updatedData[index],
            links: [...updatedData[index].links, {title: "", url: ""}]
        };
        setCourseContentData(updatedData);
    };

    const handleNewContent = (item: any) => {
        if (
            item.title === "" ||
            item.description === "" ||
            item.videoUrl === "" ||
            item.links[0].title === "" ||
            item.links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            let newVideoSection = "";
            if (courseContentData.length > 0) {
                const lastVideoSection =
                    courseContentData[courseContentData.length - 1].videoSection;

                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }

            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [
                    {
                        title: "",
                        url: ""
                    }
                ]
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const handleAddNewSection = () => {
        const lastContent = courseContentData[courseContentData.length - 1];
        if (
            lastContent.title === "" ||
            lastContent.description === "" ||
            lastContent.videoUrl === "" ||
            lastContent.links[0].title === "" ||
            lastContent.links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            setActiveSection(activeSection + 1);
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoLength: "",
                videoSection: `Untitled Section ${activeSection}`,
                links: [{title: "", url: ""}]
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const buttonPrev = () => {
        setActive(active - 1);
    };

    const buttonNext = () => {
        const lastContent = courseContentData[courseContentData.length - 1];
        if (
            lastContent.title === "" ||
            lastContent.description === "" ||
            lastContent.videoUrl === "" ||
            lastContent.links[0].title === "" ||
            lastContent.links[0].url === ""
        ) {
            toast.error("Please fill all the fields first!");
        } else {
            setActive(active + 1);
            handleCourseContentSubmit();
        }
    };

    return (
        <div className="w-[80%] m-auto mt-24 p-3">
            <form onSubmit={handleSubmit}>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput =
                        index === 0 ||
                        item.videoSection !== courseContentData[index - 1].videoSection;

                    return (
                        <div key={index}
                             className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}
                        >
                            {showSectionInput && (
                                <>
                                    <div className="flex w-full items-center">
                                        <input
                                            type="text"
                                            className={`text-[20px] ${
                                                item.videoSection === "Untitled Section"
                                                    ? "w-[170px]"
                                                    : "w-min"
                                            } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                            value={item.videoSection}
                                            onChange={(e) => {
                                                const updateData = [...courseContentData];
                                                updateData[index] = {
                                                    ...updateData[index],
                                                    videoSection: e.target.value
                                                };
                                                setCourseContentData(updateData);
                                            }}
                                        />
                                        <BsPencil className="cursor-pointer dark:text-white text-black"/>
                                    </div>
                                    <br/>
                                </>
                            )}
                            <div className="flex w-full items-center justify-end my-0">
                                {isCollapsed[index] && (
                                    item.title && (
                                        <p className="font-Poppins dark:text-white text-black">
                                            {index + 1}. {item.title}
                                        </p>
                                    )
                                )}
                                <div className="flex items-center">
                                    <AiOutlineDelete
                                        className={`dark:text-white text-black text-[20px] mr-2 ${
                                            index > 0 ? "cursor-pointer" : "cursor-no-drop"
                                        }`}
                                        onClick={() => {
                                            if (index > 0) {
                                                const updateData = courseContentData.filter((_, i) => i !== index);
                                                setCourseContentData(updateData);
                                            }
                                        }}
                                    />
                                    <MdOutlineKeyboardArrowDown
                                        fontSize="large"
                                        className="dark:text-white text-black"
                                        style={{
                                            transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)"
                                        }}
                                        onClick={() => handleCollapseToggle(index)}
                                    />
                                </div>
                            </div>
                            {!isCollapsed[index] && (
                                <>
                                    <div className="my-3">
                                        <label htmlFor="" className={`${styles.label}`}>
                                            Video Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Project plan..."
                                            className={`${styles.input}`}
                                            value={item.title}
                                            onChange={(e) => {
                                                const updateData = [...courseContentData];
                                                updateData[index] = {
                                                    ...updateData[index],
                                                    title: e.target.value
                                                };
                                                setCourseContentData(updateData);
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className={`${styles.label}`}>
                                            Video URL
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="sdder"
                                            className={`${styles.input}`}
                                            value={item.videoUrl}
                                            onChange={(e) => {
                                                const updateData = [...courseContentData];
                                                updateData[index] = {
                                                    ...updateData[index],
                                                    videoUrl: e.target.value
                                                };
                                                setCourseContentData(updateData);
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className={styles.label}>
                                            Video Length (in minutes)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="20"
                                            className={`${styles.input}`}
                                            value={item.videoLength}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index] = {
                                                    ...updatedData[index],
                                                    videoLength: e.target.value
                                                };
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className={`${styles.label}`}>
                                            Video Description
                                        </label>
                                        <textarea
                                            rows={8}
                                            cols={30}
                                            placeholder="Project plan..."
                                            className={`${styles.input} !h-min py-2`}
                                            value={item.description}
                                            onChange={(e) => {
                                                const updateData = [...courseContentData];
                                                updateData[index] = {
                                                    ...updateData[index],
                                                    description: e.target.value
                                                };
                                                setCourseContentData(updateData);
                                            }}
                                        ></textarea>
                                        <br/>
                                    </div>
                                    {item?.links.map((link: any, linkIndex: number) => (
                                        <div className="mb-3 block" key={linkIndex}>
                                            <div className="w-full flex items-center justify-between">
                                                <label htmlFor="" className={`${styles.label}`}>
                                                    Link {linkIndex + 1}
                                                </label>
                                                <AiOutlineDelete
                                                    className={`dark:text-white text-black text-[20px] cursor-pointer`}
                                                    onClick={() => handleRemoveLink(index, linkIndex)}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Resource Title"
                                                className={`${styles.input}`}
                                                value={link.title}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].links[linkIndex] = {
                                                        ...updatedData[index].links[linkIndex],
                                                        title: e.target.value
                                                    };
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Resource URL"
                                                className={`${styles.input}`}
                                                value={link.url}
                                                onChange={(e) => {
                                                    const updatedData = [...courseContentData];
                                                    updatedData[index].links[linkIndex] = {
                                                        ...updatedData[index].links[linkIndex],
                                                        url: e.target.value
                                                    };
                                                    setCourseContentData(updatedData);
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <div
                                        className="w-full flex items-center my-3 cursor-pointer"
                                        onClick={() => handleAddLink(index)}
                                    >
                                        <BsLink45Deg className="text-[20px] dark:text-white text-black"/>
                                        <p className="pl-2 dark:text-white text-black">Add more resource links</p>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </form>
            <div
                onClick={handleAddNewSection}
                className="flex items-center w-full py-3 cursor-pointer"
            >
                <AiOutlinePlusCircle size={20} className="dark:text-white text-black"/>
                <p className="pl-2 text-[18px] dark:text-white text-black">Add more section</p>
            </div>
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a49a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => buttonPrev()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a49a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => buttonNext()}
                >
                    Next
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
};

export default CourseContent;
