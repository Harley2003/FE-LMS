import Link from "next/link";
import React, { FC } from "react";
import { FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer: FC = () => {
  return (
    <footer>
      <div className="border border-[#00000000e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] dark:text-white text-black">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/policy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] dark:text-white text-black">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href=""
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] dark:text-white text-black">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://youtube.com"
                  className="flex items-center space-x-2 text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <FaYoutube size={20} />
                  <span>YouTube</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  className="flex items-center space-x-2 text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <FaInstagram size={20} />
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com"
                  className="flex items-center space-x-2 text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  <FaGithub size={20} />
                  <span>GitHub</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-[600] dark:text-white text-black pb-3">
              Contact Info
            </h3>
            <p className="text-base dark:text-gray-300 text-black dark:hover:text-white pb-2">
              Call Us: ......
            </p>
            <p className="text-base dark:text-gray-300 text-black dark:hover:text-white pb-2">
              Address: ......
            </p>
            <p className="text-base dark:text-gray-300 text-black dark:hover:text-white pb-2">
              Mail Us: ......
            </p>
          </div>
        </div>
        <br />
        <p className="text-center dark:text-white text-black">
          Copyright © 2024 ELearning | All Rights Reserved
        </p>
        <br />
      </div>
    </footer>
  );
};

export default Footer;
