"use client";

import React, { FC } from "react";
import Heading from "./../../utils/Heading";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import OrdersAnalytic from '../../components/Admin/Analytics/OrdersAnalytic';

type Props = {};

const page: FC<Props> = (props) => {
  return (
    <div>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <OrdersAnalytic />
        </div>
      </div>
    </div>
  );
};

export default page;
