"use client";

import React, { FC } from "react";
import AdminProtected from "./../../../hooks/adminProtected";
import Heading from "./../../../utils/Heading";
import AdminSidebar from "../../../components/Admin/Sidebar/AdminSidebar";
import DashboardHeader from "../../../components/Admin/DashboardHeader";
import EditCourse from "../../../components/Admin/Course/EditCourse";

type Props = {};

const page: FC<Props> = ({ params }: any) => {
  const id = params?.id;
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
            <DashboardHeader />
            <EditCourse id={id} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
