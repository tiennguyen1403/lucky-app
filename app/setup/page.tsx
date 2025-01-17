"use client";
import React from "react";

import envelope from "@/public/envelope.png";
import Image from "next/image";
import numeral from "numeral";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Setup: React.FC = () => {
  const router = useRouter();
  const [smallEnvelope, setSmallEnvelope] = React.useState("0");
  const [mediumEnvelope, setMediumEnvelope] = React.useState("0");
  const [bigEnvelope, setBigEnvelope] = React.useState("0");

  const handleOnChange = (value: string, setValue: (newValue: string) => void) => {
    const formatted = numeral(value).format("0,0");
    setValue(formatted);
  };

  const handleSubmit = () => {
    toast.dismiss();
    const smallValue = numeral(smallEnvelope).value() || 0;
    const mediumValue = numeral(mediumEnvelope).value() || 0;
    const bigValue = numeral(bigEnvelope).value() || 0;

    if (smallValue < 50000) {
      toast.error("Ít nhất là 50k nha ní");
      return;
    }

    if (mediumValue < 50000) {
      toast.error("Ít nhất là 50k nha ní");
      return;
    }

    if (bigValue < 50000) {
      toast.error("Ít nhất là 50k nha ní");
      return;
    }
  };

  return (
    <div className="bg-secondary bg-no-repeat bg-center bg-cover h-full">
      <div className="h-full flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-4">
          <Image src={envelope} alt="red-envelope" className="scale-75" />
          <input
            value={smallEnvelope}
            onChange={(event) => handleOnChange(event.target.value, setSmallEnvelope)}
            className="w-80 bg-[#f4f4f5] outline-none px-4 py-2 rounded-lg"
            placeholder="Nhập tiền đi ní"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Image src={envelope} alt="red-envelope" className="scale-90" />
          <input
            value={mediumEnvelope}
            onChange={(event) => handleOnChange(event.target.value, setMediumEnvelope)}
            className="w-80 bg-[#f4f4f5] outline-none px-4 py-2 rounded-lg"
            placeholder="Nhập tiền đi ní"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Image src={envelope} alt="red-envelope" className="scale-105" />
          <input
            value={bigEnvelope}
            onChange={(event) => handleOnChange(event.target.value, setBigEnvelope)}
            className="w-80 bg-[#f4f4f5] outline-none px-4 py-2 rounded-lg"
            placeholder="Nhập tiền đi ní"
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            className="font-semibold text-[#338cf1] border-2 border-solid border-[#338cf1] py-2 px-4 rounded-lg text-lg w-40"
            onClick={() => router.back()}
          >
            Quay lại
          </button>
          <button
            className="font-semibold text-white bg-[#338cf1] border-2 border-solid border-[#338cf1] py-2 px-4 rounded-lg text-lg w-40"
            onClick={handleSubmit}
          >
            Rút lì xì
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setup;
