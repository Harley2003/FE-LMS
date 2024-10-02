"use client";

import React, {FC, useState} from "react";
import Heading from "./../../utils/Heading";
import AdminProtected from "./../../hooks/adminProtected";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../../components/Admin/DashboardHeader";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Admin - ELearning"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHeader open={open} setOpen={setOpen} />
            <CreateCourse />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
