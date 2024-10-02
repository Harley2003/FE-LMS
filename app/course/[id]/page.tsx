"use client";

import React, { FC } from "react";
import CourseDetailsPage from '../../components/Course/CourseDetailsPage';

type Props = {
  params: any;
};

const page: FC<Props> = ({ params }) => {
  return (
    <>
      <CourseDetailsPage id={params.id} />
    </>
  );
};

export default page;
