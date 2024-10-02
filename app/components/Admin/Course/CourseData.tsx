"use client";

import {styles} from "@/app/styles/style";
import React, {FC} from "react";
import toast from "react-hot-toast";
import {MdAddCircle, MdRemoveCircle} from "react-icons/md";

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
                                   benefits,
                                   setBenefits,
                                   prerequisites,
                                   setPrerequisites,
                                   active,
                                   setActive
                               }) => {
    const handleChangeBenefit = (index: number, value: string) => {
        const updatedBenefits = benefits.map((benefit, idx) =>
            idx === index ? {...benefit, title: value} : benefit
        );
        setBenefits(updatedBenefits);
    };

    const handleAddBenefit = (e: React.MouseEvent) => {
        e.preventDefault();
        setBenefits([...benefits, {title: ""}]);
    };

    const handleRemoveBenefit = (index: number) => {
        const updatedBenefits = benefits.filter((_, idx) => idx !== index);
        setBenefits(updatedBenefits);
    };

    const handleChangePrerequisite = (index: number, value: string) => {
        const updatedPrerequisites = prerequisites.map((prerequisite, idx) =>
            idx === index ? {...prerequisite, title: value} : prerequisite
        );
        setPrerequisites(updatedPrerequisites);
    };

    const buttonPrev = () => {
        setActive(active - 1);
    };

    const buttonNext = () => {
        if (
            benefits[benefits.length - 1]?.title !== "" &&
            prerequisites[prerequisites.length - 1]?.title !== ""
        ) {
            setActive(active + 1);
        } else {
            toast.error("Please fill the fields to go to the next!");
        }
    };

    const handleAddPrerequisites = (e: React.MouseEvent) => {
        e.preventDefault();
        setPrerequisites([...prerequisites, {title: ""}]);
    };

    const handleRemovePrerequisites = (index: number) => {
        const updatedPrerequisites = prerequisites.filter((_, idx) => idx !== index);
        setPrerequisites(updatedPrerequisites);
    };

    return (
        <div className="w-[80%] m-auto mt-24 block">
            <div>
                <label htmlFor="benefits" className={`${styles.label} text-[20px]`}>
                    What are the benefits for students in this course?
                </label>
                <br/>
                {benefits.map((benefit, index) => (
                    <input
                        type="text"
                        key={index}
                        name="benefits"
                        required
                        className={`${styles.input} my-2`}
                        value={benefit.title}
                        placeholder="You will be able to build a full stack MERN platform..."
                        onChange={(e) => handleChangeBenefit(index, e.target.value)}
                    />
                ))}
                <div className="flex justify-between items-center">
                    <MdAddCircle
                        style={{margin: "1rem 0", cursor: "pointer"}}
                        size={30}
                        onClick={handleAddBenefit}
                    />
                    <MdRemoveCircle
                        style={{margin: "1rem 0", cursor: "pointer"}}
                        size={30}
                        onClick={() => handleRemoveBenefit(benefits.length - 1)}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="prerequisites" className={`${styles.label} text-[20px]`}>
                    What are the prerequisites for this course?
                </label>
                <br/>
                {prerequisites.map((prerequisite, index) => (
                    <input
                        type="text"
                        key={index}
                        name="prerequisites"
                        required
                        className={`${styles.input} my-2`}
                        value={prerequisite.title}
                        placeholder="Basic knowledge of React is required..."
                        onChange={(e) => handleChangePrerequisite(index, e.target.value)}
                    />
                ))}
                <div className="flex justify-between items-center">
                    <MdAddCircle
                        style={{margin: "1rem 0", cursor: "pointer"}}
                        size={30}
                        onClick={handleAddPrerequisites}
                    />
                    <MdRemoveCircle
                        style={{margin: "1rem 0", cursor: "pointer"}}
                        size={30}
                        onClick={() => handleRemovePrerequisites(prerequisites.length - 1)}
                    />
                </div>
            </div>
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => buttonPrev()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => buttonNext()}
                >
                    Next
                </div>
            </div>
        </div>
    );
};

export default CourseData;
