"use client";

import { styles } from "@/app/styles/style";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import React, { FC, useActionState, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully!");
      setRoute("Login");
    }

    if (error && "data" in error) {
      toast.error(
        "The OTP you entered is invalid. Please check and try again."
      );
      setInvalidError(true);
    } else {
      console.log("An error occured: " + error);
    }
  }, [isSuccess, error, setRoute]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": ""
  });

  const handlerVerify = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      toast.error("Please enter a valid verification code!");
      setInvalidError(true);
      return;
    }

    await activation({
      activation_token: token,
      activation_code: verificationNumber
    });
  };

  const handlerInputChange = (index: number, value: string) => {
    setInvalidError(false);

    // Nếu giá trị dài hơn 1, chúng ta sẽ chia nó ra
    if (value.length > 1) {
      const newVerifyNumber: any = { ...verifyNumber };

      value.split("").forEach((char, idx) => {
        if (idx < 4) {
          newVerifyNumber[idx] = char; // Gán từng ký tự vào verifyNumber
          inputRefs[idx].current!.value = char; // Cập nhật giá trị input
        }
      });

      setVerifyNumber(newVerifyNumber);

      // Di chuyển ô input focus đến ô cuối cùng
      inputRefs[Math.min(value.length, 3)].current?.focus();
    } else {
      const newVerifyNumber = { ...verifyNumber, [index]: value };
      setVerifyNumber(newVerifyNumber);

      if (value === "" && index > 0) {
        inputRefs[index - 1].current?.focus();
      } else if (value.length === 1 && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Verification Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} color="#fff" />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError
                ? "shake border-red-500"
                : "dark:border-white border-[#0000004a]"
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handlerInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button
          className={`${styles.button} w-[150px]`}
          onClick={handlerVerify}
        >
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go back to Login?{" "}
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Login
        </span>
      </h5>
    </div>
  );
};

export default Verification;
