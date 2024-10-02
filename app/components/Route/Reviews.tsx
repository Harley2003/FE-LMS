"use client";

import { styles } from "@/app/styles/style";
import Image from "next/image";
import React, { FC } from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
    name: "Ayat AlBqoor",
    avatar:
      "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1683766549/1667644613514_qd12it.jpg",
    profession: "Web developer | Nafith Logistics International, Jordan",
    ratings: 4.5,
    comment:
      "Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights!"
  },
  {
    name: "Achmad Syihabul Millah",
    avatar:
      "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1686633060/Syihabul_qpfd4n.jpg",
    profession: "Junior Web Developer | Indonesia",
    ratings: 5,
    comment:
      "Join E-Learning! E-Learning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend E-Learning to anyone looking to improve their programming skills and build practical projects. E-Learning is a great resource that will help you take your skills to the next level."
  },
  {
    name: "Rüveyda Dal",
    avatar:
      "https://res.cloudinary.com/dwp4syk3r/image/upload/v1714324590/mehru_hiag6l.jpg",
    profession: "Full stack web developer | Turkey",
    ratings: 4.5,
    comment:
      "I value your dedication, expertise, and excitement for teaching programming. E-Learning offers instruction in more than simply programming language and framework theory. The website offers a plethora of additional tech-related courses, but the one I chose really pleased me with its cost and caliber. E-Learning extensive course selection and excellent faculty make it the perfect place to expand your knowledge and skills in the technology industry."
  },
  {
    name: "Imen Lakrib",
    avatar:
      "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1684043509/lakrib_ppe8rb.jpg",
    profession: "Full stack web developer | Algeria",
    ratings: 4,
    comment:
      "Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in details. for that any person had beginner-level can complete an integrated project when he watches the videos. Thank you very much. Im very excited for the next videos Keep doing this amazing work."
  },
  {
    name: "Eshan Ahmed Ahad",
    avatar:
      "https://res.cloudinary.com/dwp4syk3r/image/upload/v1714324656/eshan_kcrcrl.jpg",
    profession: "Founder & CEO | Hablu Programmer, Bangladesh",
    ratings: 5,
    comment:
      "Shahriar is truly an exceptional programmer. He has an amazing knack for solving website bugs, and his problem-solving skills are outstanding. Moreover, his YouTube content is always top-notch. I highly recommend supporting the Becodemy community!"
  },
  {
    name: "Saidi Daudi",
    avatar:
      "https://res.cloudinary.com/dkg6jv4l0/image/upload/v1684043108/343413152_1280475219231832_196781321050527913_n_q0bge7.jpg",
    profession: "Computer systems engineering student | Zimbabwe",
    ratings: 4,
    comment:
      "E-Learning does a good job of explaining the concepts in a clear and concise way, and the examples are well-chosen. Overall, this is a valuable resource for anyone who is new to programming."
  }
];

const Reviews: FC<Props> = (props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assests/business-img.png")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Necessitatibus delectus sunt vel porro! Eius esse exercitationem
            ipsam rerum sunt suscipit voluptas distinctio reprehenderit
            recusandae? Cum deleniti iusto nemo at voluptate.
          </p>
        </div>
        <br />
        <br />
      </div>
      <br />
      <br />
      <br />
      <h1 className="text-center font-Poppins text-4xl font-bold mb-10 text-[#000] dark:text-white">
      Student&apos;s <span className="text-gradient">Feedback</span>
      </h1>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12">
        {reviews.map((item: any, index: number) => (
          <ReviewCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
