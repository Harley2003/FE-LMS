"use client";

import React, {FC, useState} from "react";
import Heading from './../../utils/Heading';
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar';
import DashboardHeader from '../../components/Admin/DashboardHeader';
import CourseAnalytic from '../../components/Admin/Analytics/CourseAnalytic';

type Props = {};

const Page: FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <Heading
                title="Elearning - Admin"
                description="ELearning is a platform for students to learn and get help from teachers"
                keywords="Prograaming,MERN,Redux,Machine Learning"
            />
            <div className="flex">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar/>
                </div>
                <div className="w-[85%]">
                    <DashboardHeader open={open} setOpen={setOpen}/>
                    <CourseAnalytic/>
                </div>
            </div>
        </div>
    );
};

export default Page;
