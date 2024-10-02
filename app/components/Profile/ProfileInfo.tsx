"use client";

import React, { FC, useEffect, useState } from "react";
import avatarDefault from "../../../public/assests/avatar.png";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import {
  useEditProfilfeMutation,
  useUpdateAvatarMutation
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: {
    name: string;
    email: string;
    avatar: { url: string } | null;
  };
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user?.name || '');
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const { refetch } = useLoadUserQuery(undefined, {});
  const [editProfile, { isSuccess: successEdit, error: errorEdit, isLoading }] = useEditProfilfeMutation();

  const handlerImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          const avatar = fileReader.result;
          updateAvatar(avatar);
        }
      };

      fileReader.onerror = () => {
        toast.error("Error reading file.");
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() !== "") {
      await editProfile({ name });
    }
  };

  useEffect(() => {
    if (isSuccess || successEdit) {
      refetch();
    }

    if (error || errorEdit) {
      console.log("ProfileInfo.tsx: ", error || errorEdit);
    }

    if (successEdit) {
      toast.success("Profile updated successfully");
    }
  }, [isSuccess, error, successEdit, errorEdit, refetch]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            priority={true}
            src={user.avatar?.url || avatar || avatarDefault}
            alt="User Avatar"
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
            width={120}
            height={120}
          />
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="hidden"
            onChange={handlerImage}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handlerSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2">Email Address</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.email}
                readOnly
              />
            </div>
            <div className="flex justify-center mt-8">
              <input
                type="submit"
                className="w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] cursor-pointer"
                value={`${isLoading ? "Updating..." : "Update"}`}
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
