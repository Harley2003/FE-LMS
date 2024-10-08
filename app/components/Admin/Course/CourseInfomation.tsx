"use client";

import {styles} from "@/app/styles/style";
import Image from "next/image";
import React, {FC, useEffect, useState} from "react";
import {useGetHeroDataQuery} from "@/redux/features/layout/layoutApi";

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseInfomation: FC<Props> = ({
                                         courseInfo,
                                         setCourseInfo,
                                         active,
                                         setActive
                                     }) => {
    const [dragging, setDragging] = useState(false);
    const {data} = useGetHeroDataQuery("Categories", {});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories);
        }
    }, [data]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1);
    };

    const handleChangeFile = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({...courseInfo, thumbnail: reader.result});
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: any) => {
        e.prenventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e: any) => {
        e.prenventDefault();
        setDragging(false);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                setCourseInfo({...courseInfo, thumbnail: reader.result});
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-[80%] m-auto mt-24">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="" className={`${styles.label}`}>
                        Course Name
                    </label>
                    <input
                        type="text"
                        name=""
                        required
                        value={courseInfo.name}
                        onChange={(e: any) =>
                            setCourseInfo({...courseInfo, name: e.target.value})
                        }
                        id="name"
                        placeholder="MERN stack LMS platform with next 14"
                        className={`${styles.input}`}
                    />
                </div>
                <br/>
                <div className="mb-5">
                    <label htmlFor="" className={`${styles.label}`}>
                        Course Description
                    </label>
                    <textarea
                        name=""
                        id=""
                        cols={30}
                        rows={8}
                        placeholder="Write something amazing..."
                        className={`${styles.input} !h-min !py-2 resize-none`}
                        value={courseInfo.description}
                        onChange={(e: any) =>
                            setCourseInfo({...courseInfo, description: e.target.value})
                        }
                    ></textarea>
                </div>
                <br/>
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label htmlFor="" className={`${styles.label}`}>
                            Course Price
                        </label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo.price}
                            onChange={(e: any) =>
                                setCourseInfo({...courseInfo, price: e.target.value})
                            }
                            id="price"
                            placeholder="29"
                            className={`${styles.input}`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="" className={`${styles.label}`}>
                            Estimated Price (optional)
                        </label>
                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) =>
                                setCourseInfo({...courseInfo, estimatedPrice: e.target.value})
                            }
                            id="estimatedPrice"
                            placeholder="79"
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br/>
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label htmlFor="" className={`${styles.label}`}>
                            Course Tags
                        </label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.tags}
                            onChange={(e: any) =>
                                setCourseInfo({...courseInfo, tags: e.target.value})
                            }
                            id="tags"
                            placeholder="MERN, Next 13, Socket io, tailwind css, LMS"
                            className={`${styles.input}`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="" className={`${styles.label}`}>
                            Course Category
                        </label>
                        <select
                            name=""
                            id=""
                            className="w-full text-black dark:text-white border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
                            value={courseInfo.categories}
                            onChange={(e: any) =>
                                setCourseInfo({...courseInfo, categories: e.target.value})
                            }
                        >
                            <option value="" className="dark:text-white text-black">Select Category</option>
                            {categories &&
                                categories.map((item: any) => (
                                    <option value={item.title} key={item._id}>
                                        {item.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
                <br/>
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label htmlFor="" className={`${styles.label}`}>
                            Course level
                        </label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.level}
                            onChange={(e: any) =>
                                setCourseInfo({...courseInfo, level: e.target.value})
                            }
                            id="level"
                            placeholder="Beginner/Intermediate/Expert"
                            className={`${styles.input}`}
                        />
                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="" className={`${styles.label}`}>
                            Demo URL
                        </label>
                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.demoUrl}
                            onChange={(e: any) =>
                                setCourseInfo({...courseInfo, demoUrl: e.target.value})
                            }
                            id="demoUrl"
                            placeholder="eer74fd"
                            className={`${styles.input}`}
                        />
                    </div>
                </div>
                <br/>
                <div className="w-full">
                    <input
                        type="file"
                        accept="image/*"
                        id="file"
                        className="hidden"
                        onChange={handleChangeFile}
                    />
                    <label
                        htmlFor="file"
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                            dragging ? "bg-blue-500" : "bg-transparent"
                        } cursor-pointer`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {courseInfo.thumbnail ? (
                            <Image
                                src={courseInfo.thumbnail}
                                alt=""
                                width={100}
                                height={100}
                                className="w-full max-h-full object-cover"
                            />
                        ) : (
                            <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
                        )}
                    </label>
                </div>
                <br/>
                <div className="w-full flex items-center justify-end">
                    <input
                        type="submit"
                        value="Next"
                        className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    />
                </div>
                <br/>
                <br/>
            </form>
        </div>
    );
};

export default CourseInfomation;
