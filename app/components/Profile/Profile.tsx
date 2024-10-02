"use client";

import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";
import Loader from "../Loader/Loader";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  
  useLogoutQuery(undefined, { skip: !logout });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) => data.courses.find((course: any) => course._id === userCourse._id))
        .filter(Boolean);
      setCourses(filteredCourses);
    }
  }, [data, user.courses]);

  const renderActiveComponent = () => {
    switch (active) {
      case 1:
        return <ProfileInfo user={user} avatar={avatar} />;
      case 2:
        return <ChangePassword />;
      case 3:
        return (
          user.role !== "admin" && (
            <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
                {courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} user={user} isProfile={true} />
                ))}
              </div>
              {courses.length === 0 && (
                <h1 className="text-center text-[30px] font-Poppins mt-[15rem]">
                  You don&apos;t have any purchased course!
                </h1>
              )}
            </div>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[85%] flex mx-auto mt-[11px]">
          <div
            className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] dark:shadow-sm shadow-xl mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}
          >
            <SideBarProfile
              user={user}
              active={active}
              avatar={avatar}
              setActive={setActive}
              logOutHandler={logOutHandler}
            />
          </div>
          <div className="w-full h-full bg-transparent mt-[80px]">
            {renderActiveComponent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
