"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { FC, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import CourseContent from "@/app/components/Course/CourseContent";

type Props = {
  params: any;
};

const Page: FC<Props> = ({ params }) => {
  const id = params.id;
  const { data, isLoading, error } = useLoadUserQuery(undefined, {});
  useEffect(() => {
    if (error) {
      redirect("/");
      return;
    }

    // if (data) {
    //   if (data.user.role === "admin") {
    //     redirect(`/course-access/${id}`);
    //     return;
    //   }
    //
    //   const isPurchased = data.user.courses.some((item: any) => item._id === id);
    //   if (!isPurchased) {
    //     redirect("/");
    //     return;
    //   }
    // }
  }, [data, error, id]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CourseContent id={id} user={data.user} />
        </>
      )}
    </>
  );
};

export default Page;
