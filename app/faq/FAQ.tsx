"use client";

import React, { FC, useEffect, useState } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { styles } from "@/app/styles/style";
import { HiMinus, HiPlus } from "react-icons/hi";

type Props = {};

const FAQ: FC<Props> = (props) => {
  const { data } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-[90%] 800px:w-[80%] m-auto">
      <h1 className={`${styles.title} text-center 800px:text-[40px]`}>
        Frequently Asked Questions
      </h1>
      <div className="mt-12">
        <dl className="space-y-8">
          {questions.map((question, index) => (
            <div
              key={question._id}
              className={`${
                index !== questions.length - 1 ? "border-b" : ""
              } border-gray-200 pb-6 pt-4 transition-all duration-300`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start justify-between w-full text-left transition-all duration-300 p-3 rounded-md"
                  onClick={() => toggleQuestion(question._id)}
                >
                  <span
                    className={`font-medium dark:text-white text-black ${
                      activeQuestion === question._id
                        ? "text-blue-500"
                        : "text-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {question.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {activeQuestion === question._id ? (
                      <HiMinus className="h-6 w-6 text-blue-500" />
                    ) : (
                      <HiPlus className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    )}
                  </span>
                </button>
              </dt>
              <dd
                className={`mt-2 pr-12 transition-all duration-500 ease-in-out ${
                  activeQuestion === question._id
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-base font-Poppins text-gray-700 dark:text-gray-300">
                  {question.answer}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQ;
