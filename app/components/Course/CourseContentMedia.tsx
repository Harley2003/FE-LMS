"use client";

import React, { FC, useEffect, useState } from "react";
import CoursePlayer from "../../utils/CoursePlayer";
import { styles } from "../../styles/style";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar
} from "react-icons/ai";
import avatarDefault from "../../../public/assests/avatar.png";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyReviewInCourseMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery
} from "@/redux/features/courses/courseApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "../../utils/Ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketIo = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  id: string;
  data: any;
  activeVideo: number;
  user: any;
  refetch: any;
  setActiveVideo: (activeVideo: number) => void;
};

const CourseContentMedia: FC<Props> = ({
  id,
  data,
  activeVideo,
  user,
  refetch,
  setActiveVideo
}) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [addNewQuestion, { isSuccess, isLoading: questionLoading, error }] =
    useAddNewQuestionMutation();
  const [
    addAnswerInQuestion,
    { isSuccess: hasSuccess, isLoading: answerLoading, error: isError }
  ] = useAddAnswerInQuestionMutation();
  const [
    addReviewInCourse,
    { isSuccess: wasSuccess, isLoading: reviewLoading, error: hasError }
  ] = useAddReviewInCourseMutation();
  const { data: courseData, refetch: isRefetch } = useGetCourseDetailsQuery(
    id,
    {
      refetchOnMountOrArgChange: true
    }
  );
  const [
    addReplyReviewInCourse,
    { isSuccess: canSuccess, isLoading: replyReviewLoading, error: canError }
  ] = useAddReplyReviewInCourseMutation();
  const course = courseData?.course;
  const [answer, setAnswer] = useState("");
  const [answerId, setAnswerId] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [replyReview, setReplyReview] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");
  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = async () => {
    if (question.length === 0) {
      toast.error("Question can't be empty!");
    } else {
      await addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id
      });
    }
  };

  const handleSubmitAnswer = async () => {
    await addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId
    });
  };

  const handleSubmitReview = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty!");
    } else {
      await addReviewInCourse({
        review,
        rating,
        courseId: id
      });
    }
  };

  const handleSubmitReplyReview = async () => {
    if (!replyReviewLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty!");
      } else {
        await addReplyReviewInCourse({
          comment: reply,
          courseId: id,
          reviewId: reviewId
        });
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
      socketIo.emit("notification", {
        title: "New Question Received",
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id
      });
    }

    if (hasSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
      if (user.role !== "admin") {
        socketIo.emit("notification", {
          title: `New Reply Received`,
          message: `You have a new question in ${data[activeVideo].title}`,
          userId: user._id
        });
      }
    }

    if (canSuccess) {
      setReply("");
      isRefetch();
      toast.success("Reply added successfully");
    }

    if (wasSuccess) {
      setReview("");
      setRating(0);
      isRefetch();
      toast.success("Review added successfully");
      socketIo.emit("notification", {
        title: `New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id
      });
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isError) {
      if ("data" in isError) {
        const errorMessage = isError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (hasError) {
      if ("data" in hasError) {
        const errorMessage = hasError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (canError) {
      if ("data" in canError) {
        const errorMessage = canError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    refetch,
    hasSuccess,
    isError,
    wasSuccess,
    hasError,
    isRefetch,
    canSuccess,
    canError,
    activeVideo,
    data,
    user._id,
    user.role
  ]);
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } !min-h-[40px] !py-[unset] !w-[unset] text-white  ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } !min-h-[40px] !py-[unset] !w-[unset] text-white  ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.lenght - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resource", "Q&A", "Reviews"].map(
          (text: any, index: number) => (
            <h5
              className={`${
                activeBar === index
                  ? "text-red-500"
                  : "dark:text-white text-black"
              } 800px:text-[20px] cursor-pointer`}
              key={index}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          )
        )}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                {item.title && item.title + " :"}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
              >
                {item.url}
              </a>
            </div>
          ))}
        </>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : avatarDefault}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question here..."
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionLoading && "cursor-not-allowed"
              }`}
              onClick={questionLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              user={user}
              setAnswerId={setAnswerId}
              questionId={questionId}
              setQuestionId={setQuestionId}
              answerLoading={answerLoading}
              handleSubmitAnswer={handleSubmitAnswer}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user.avatar ? user.avatar.url : avatarDefault}
                    alt=""
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((start) =>
                        rating >= start ? (
                          <AiFillStar
                            key={start}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(start)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={start}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(start)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      id=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      cols={40}
                      rows={5}
                      placeholder="Wreite your comment here..."
                      className="outline-none bg-transparent 800px:ml-3 border border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                      reviewLoading && "cursor-no-drop"
                    }`}
                    onClick={reviewLoading ? () => {} : handleSubmitReview}
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]" />
            <div className="w-full">
              {(course?.reviews && [...course.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div
                    className="w-full my-5 dark:text-white text-black"
                    key={index}
                  >
                    <div className="w-full flex">
                      <div>
                        <Image
                          src={
                            item?.user.avatar
                              ? item?.user.avatar.url
                              : avatarDefault
                          }
                          alt=""
                          width={50}
                          height={50}
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px]">{item?.user.name}</h1>
                        <Ratings rating={item.rating} />
                        <p>{item.comment}</p>
                        <small className="dark:text-[#ffffff83] text-[#0000009e]">
                          {format(item.createAt)}
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" && item.commentReplies && (
                      <span
                        className={`${styles.label} !ml-10 cursor-pointer`}
                        onClick={() => {
                          setReplyReview(true);
                          setReviewId(item._id);
                        }}
                      >
                        Add Reply
                      </span>
                    )}
                    {replyReview && reviewId && (
                      <div className="w-full flex relative">
                        <input
                          type="text"
                          placeholder="Enter your reply..."
                          value={reply}
                          onChange={(e: any) => setReply(e.target.value)}
                          className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%]"
                        />
                        <button
                          type="submit"
                          className="absolute right-0 bottom-1"
                          onClick={handleSubmitReplyReview}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    {item.commentReplies.map((item: any, index: number) => (
                      <div className="w-full flex 800px:ml-16 my-5" key={index}>
                        <div className="w-[50px] h-[50px]">
                          <Image
                            src={
                              item?.user.avatar
                                ? item?.user.avatar.url
                                : avatarDefault
                            }
                            alt=""
                            width={50}
                            height={50}
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{item.user.name}</h5>
                            <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                          </div>
                          <p>{item.comment}</p>
                          <small className="text-[#ffffff83]">
                            {format(item.createdAt)} •
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  user,
  setAnswerId,
  questionId,
  setQuestionId,
  answerLoading,
  handleSubmitAnswer
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            questionId={questionId}
            setQuestionId={setQuestionId}
            answerLoading={answerLoading}
            handleSubmitAnswer={handleSubmitAnswer}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  item,
  answer,
  setAnswer,
  questionId,
  setQuestionId,
  answerLoading,
  handleSubmitAnswer
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={item?.user.avatar ? item?.user.avatar.url : avatarDefault}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div className="pl-3">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p>{item?.question}</p>
            <small className="dark:text-[#ffffff83] text-[#000000b8]">
              {item.createAt ? format(item?.createAt) : ""}{" "}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="800px:pl-16 dark:text-[#ffffff83] text-[#000000b8] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer dark:text-[#ffffff83] text-[#000000b8]"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-[#000000b8]">
            {item.questionReplies.length}
          </span>
        </div>
        <div>
          {replyActive && questionId === item._id && (
            <>
              {item.questionReplies.map((item: any) => (
                <>
                  <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                    <div>
                      <Image
                        src={
                          item?.user.avatar
                            ? item?.user.avatar.url
                            : avatarDefault
                        }
                        alt=""
                        width={50}
                        height={50}
                        className="w-[50px] h-[50px] rounded-full object-cover"
                      />
                    </div>
                    <div className="pl-2">
                      <div className="flex items-center">
                        <h5 className="text-[20px]">{item.user.name}</h5>
                        {item.user.role === "admin" && (
                          <VscVerifiedFilled className="text-[#50c750] ml-2 text-[20px]" />
                        )}
                      </div>
                      <p>{item.answer}</p>
                      <small className="text-[#ffffff83]">
                        {format(item.createAt)}
                      </small>
                    </div>
                  </div>
                </>
              ))}
              <>
                <div className="w-full flex relative dark:text-white text-black">
                  <input
                    type="text"
                    placeholder="Enter your answer..."
                    value={answer}
                    onChange={(e: any) => setAnswer(e.target.value)}
                    className={` ${
                      answer === "" || (answerLoading && "cursor-not-allowed")
                    } block 800px:ml-12 mt-2 outline-none bg-transparent border-b dark:border-[#fff] border-[#00000027] p-[5px] w-[95%]`}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 bottom-0"
                    onClick={handleSubmitAnswer}
                    disabled={answer === "" || answerLoading}
                  >
                    Submit
                  </button>
                </div>
                <br />
              </>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseContentMedia;
