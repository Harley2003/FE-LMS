"use client";

import React, { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "../../utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/courseApi";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery
} from "@/redux/features/orders/orderApi";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [createPaymentIntent, { data: paymentIntentData }                                                                 ] =
    useCreatePaymentIntentMutation();

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data, userData, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title={data.course.name + " - ELearning"}
            description="ELearning is a programming community which is developed by yang yang for helping programmers"
            keywords={data?.course?.tags}
          />
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            route={route}
            setRoute={setRoute}
          />
          {stripePromise && (
            <CourseDetails
              data={data.course}
              setOpen={setOpen}
              setRoute={setRoute}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
          <Footer />
        </>
      )}
    </div>
  );
};

export default CourseDetailsPage;
