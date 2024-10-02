"use client";

import Image from "next/image";
import Link from "next/link";
import React, {FC, useState} from "react";
import {BiSearch} from "react-icons/bi";
import {useGetHeroDataQuery} from "@/redux/features/layout/layoutApi";
import BannerLoader from "../Loader/BannerLoader";
import {useRouter} from "next/navigation";

type Props = {};

const Hero: FC<Props> = (props) => {
    const {data, isLoading} = useGetHeroDataQuery("Banner", {});
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (search === "") {
            return;
        } else {
            router.push(`/courses?title=${search}`);
        }
    };

    return (
        <div>
            {isLoading ? (
                <BannerLoader/>
            ) : (
                <>
                    <div className="w-full 1000px:flex items-center">
                        <div
                            className="absolute
                top-[8rem]
                500px:top-[6rem]
                800px:top-[5rem]
                1000px:top-[unset]
                1100px:left-[1rem]
                1500px:left-[3rem]
                1500px:h-[700px]
                1500px:w-[700px]
                1100px:h-[500px]
                1100px:w-[500px]
                h-[35vh]
                w-[35vh]
                hero_animation
                rounded-[50%]
                z-0"
                        ></div>
                        <div
                            className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10 relative">
                            <Image
                                src={data?.layout?.banner?.image?.url || "/assests/default-banner.jpg"}
                                width={400}
                                height={400}
                                alt="Banner Image"
                                className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[10]"
                            />
                        </div>
                        <div
                            className="1000px:w-[60%] flex flex-col items-center 1000px:mt-0 text-center 1000px:text-left mt-[150px] z-10">
                            <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1500px:px-0 1500px:text-[70px]">
                                {data?.layout?.banner.title}
                            </h2>
                            <br/>
                            <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[75%]">
                                {data?.layout?.banner.subTitle}
                            </p>
                            <br/>
                            <br/>
                            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
                                <input
                                    type="search"
                                    placeholder="Search Courses..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
                                />
                                <div
                                    className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                                    onClick={handleSearch}
                                >
                                    <BiSearch size={30} className="text-white"/>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
                                <Image
                                    src="/assests/client-1.jpg"
                                    alt="Client 1"
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                                <Image
                                    src="/assests/client-2.jpg"
                                    alt="Client 2"
                                    width={50}
                                    height={50}
                                    className="rounded-full ml-[-20px]"
                                />
                                <Image
                                    src="/assests/client-3.jpg"
                                    alt="Client 3"
                                    width={50}
                                    height={50}
                                    className="rounded-full ml-[-20px]"
                                />
                                <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
                                    500K+ People already trusted us.
                                    <Link
                                        href="/courses"
                                        className="dark:text-[#46e256] text-[crimson]"
                                    >
                                        View Courses
                                    </Link>
                                </p>
                            </div>
                            <br/>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Hero;
