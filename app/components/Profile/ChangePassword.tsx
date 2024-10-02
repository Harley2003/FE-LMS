"use client";

import {styles} from "@/app/styles/style";
import {useUpdatePasswordMutation} from "@/redux/features/user/userApi";
import React, {FC, useEffect, useState} from "react";
import toast from "react-hot-toast";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

const PasswordToggleIcon = ({
                                show,
                                toggle
                            }: {
    show: boolean;
    toggle: () => void;
}) => (
    <div className="absolute bottom-[25px] right-3 cursor-pointer" onClick={toggle}>
        {show ? <AiOutlineEye size={20}/> : <AiOutlineEyeInvisible size={20}/>}
    </div>
);

const ChangePassword: FC = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [updatePassword, {isSuccess, error, isLoading}] =
        useUpdatePasswordMutation();

    const initialValues = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Old password is required"),
        newPassword: Yup.string()
            .required("Please enter your password!")
            .matches(/[A-Z]/, "Must contain at least one uppercase letter")
            .matches(/[a-z]/, "Must contain at least one lowercase letter")
            .matches(/[0-9]/, "Must contain at least one number")
            .matches(/[!@#$%^&*]/, "Must contain at least one special character")
            .min(8, "New password must be at least 8 characters")
            .trim(),
        confirmPassword: Yup.string()
            .required("Confirm password is required")
            .oneOf([Yup.ref("newPassword")], "Passwords must match")
    });

    const handlerChangePassword = async (values: any, {resetForm}: any) => {
        const {oldPassword, newPassword} = values;

        if (oldPassword === newPassword) {
            toast.error("New password must be different from the old password!");
            return;
        }

        try {
            await updatePassword({oldPassword, newPassword});
            resetForm();
        } catch (error) {
            console.log("An error occurred while changing the password.");
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password changed successfully!");
            return;
        }

        if (error && "data" in error) {
            const errorMessage = (error as any)?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    }, [isSuccess, error]);

    return (
        <div className="w-full p-4 md:p-6 lg:p-8">
            <h1 className="text-2xl font-Poppins text-center font-medium pb-2 text-black dark:text-white">
                Change Password
            </h1>
            <div className="w-full">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handlerChangePassword}
                >
                    {({handleSubmit}) => (
                        <Form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center"
                        >
                            <div className="w-full md:w-3/4 mt-5 relative">
                                <label
                                    htmlFor="oldPassword"
                                    className="block pb-2 text-black dark:text-white"
                                >
                                    Enter your old password
                                </label>
                                <Field
                                    type={!showOldPassword ? "password" : "text"}
                                    name="oldPassword"
                                    className={`${styles.input} w-full mb-4 text-black dark:text-white`}
                                />
                                <PasswordToggleIcon
                                    show={showOldPassword}
                                    toggle={() => setShowOldPassword(!showOldPassword)}
                                />
                            </div>
                            <ErrorMessage
                                name="oldPassword"
                                component="div"
                                className="text-red-500 text-sm mb-2"
                            />

                            <div className="w-full md:w-3/4 mt-2 relative">
                                <label
                                    htmlFor="newPassword"
                                    className="block pb-2 text-black dark:text-white"
                                >
                                    Enter your new password
                                </label>
                                <Field
                                    type={!showNewPassword ? "password" : "text"}
                                    name="newPassword"
                                    className={`${styles.input} w-full mb-4 text-black dark:text-white`}
                                />
                                <PasswordToggleIcon
                                    show={showNewPassword}
                                    toggle={() => setShowNewPassword(!showNewPassword)}
                                />
                            </div>
                            <ErrorMessage
                                name="newPassword"
                                component="div"
                                className="text-red-500 text-sm mb-2"
                            />

                            <div className="w-full md:w-3/4 mt-2 relative">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block pb-2 text-black dark:text-white"
                                >
                                    Confirm your new password
                                </label>
                                <Field
                                    type={!showConfirmPassword ? "password" : "text"}
                                    name="confirmPassword"
                                    className={`${styles.input} w-full mb-4 text-black dark:text-white`}
                                />
                                <PasswordToggleIcon
                                    show={showConfirmPassword}
                                    toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </div>
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-red-500 text-sm mb-2"
                            />

                            <div className="w-full md:w-3/4 mt-2">
                                <button
                                    type="submit"
                                    className={`w-full h-10 border border-[#37a39a] text-center dark:text-white text-black rounded mt-8 cursor-pointer`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ChangePassword;
