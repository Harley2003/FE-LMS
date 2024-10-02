import React, {FC} from "react";
import {styles} from "../styles/style";

type Props = {};

const Policy: FC<Props> = (props) => {
    return (
        <div>
            <div className="w-[95%] 800px:w-[92%] m-auto py-2 dark:text-white text-black px-3">
                <h1 className={`${styles.title} !text-start pt-2`}>
                    Platform Terms and Conditions
                </h1>
                <ul className="ml-[15px] list-none">
                    <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                        Welcome to our E-Learning platform! By accessing and using our online courses and materials,
                        you agree to comply with and be bound by the following terms and conditions.
                        Please review them carefully before starting your learning journey.
                    </p>
                    <br/>
                    <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                        Course Access: Upon enrollment, you will have access to the courses for the specified duration.
                        Course content is provided for individual learning only, and sharing your account or course
                        materials
                        is strictly prohibited.
                    </p>
                    <br/>
                    <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                        Certification: Upon successful completion of the course, you will receive a certificate of
                        completion.
                        However, please note that this certificate is for personal achievement and does not serve as an
                        official accreditation unless otherwise specified.
                    </p>
                    <br/>
                    <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                        Intellectual Property: All content, including videos, quizzes, articles, and downloadable
                        materials,
                        are the intellectual property of the E-Learning platform. Unauthorized copying, redistribution,
                        or
                        modification of any materials is strictly prohibited.
                    </p>
                    <br/>
                    <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                        User Conduct: While interacting with instructors and other learners, you agree to maintain a
                        respectful
                        and constructive environment. Any misuse of discussion forums, harassment, or inappropriate
                        behavior may
                        result in suspension or termination of your account.
                    </p>
                    <br/>
                    <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                        Technical Support: We provide technical support to ensure smooth access to our courses.
                        However, you are responsible for ensuring your device meets the technical requirements to
                        access the platform, including a stable internet connection.
                    </p>
                    <br/>
                    <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                        Refund Policy: We offer refunds within the first 14 days of enrollment if you are not satisfied
                        with the course. After this period, refunds will not be issued. Please read the course
                        description
                        carefully before making a purchase.
                    </p>
                    <br/>
                    <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
                        Modifications: We reserve the right to modify these terms at any time. Any changes will be
                        communicated
                        via email or through notifications on the platform. Continued use of the platform after changes
                        have been made constitutes acceptance of the revised terms.
                    </p>
                    <br/>
                </ul>
            </div>
        </div>
    );
};

export default Policy;
