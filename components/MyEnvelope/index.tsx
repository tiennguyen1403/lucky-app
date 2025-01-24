import React from "react";
import numeral from "numeral";
import Image from "next/image";
import { Game } from "iconsax-react";
import { useRouter } from "next/navigation";
import Countdown, { CountdownRendererFn } from "react-countdown";

import useRoundStore from "@/store/roundStore";
import CountdownComponent from "../CountdownComponent";

import primaryRedEnvelope from "@/public/primary-envelope.png";
import axiosInstance from "@/utils/axios";
import { IResponse } from "@/types/general.types";
import useEnvelopeStore from "@/store/envelopeStore";
import toast from "react-hot-toast";

const playButtonClassName = `mt-10 bg-primary text-white px-6 py-2 w-40 rounded-lg text-xl font-medium tracking-wide flex items-center justify-center gap-2`;

const MyEnvelope: React.FC = () => {
  const router = useRouter();
  const { nextRoundTime } = useRoundStore();
  const { myEnvelopes, setMyEnvelopes } = useEnvelopeStore();
  const totalReceive = myEnvelopes.reduce((total, item) => (total += item?.value || 0), 0);

  const getMyEnvelopes = async () => {
    const url = "/envelope/my-envelopes";
    const { data, error } = await axiosInstance.get<null, IResponse<any>>(url);
    if (error) return toast.error(error);
    setMyEnvelopes(data);
  };

  const onPlay = () => router.push("/play");

  const renderer: CountdownRendererFn = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <button className={playButtonClassName} onClick={onPlay}>
          <Game color="#ffffff" size={24} />
          <span>Play</span>
        </button>
      );
    } else {
      return <CountdownComponent hours={hours} minutes={minutes} seconds={seconds} />;
    }
  };

  React.useEffect(() => {
    getMyEnvelopes();
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-start py-2 pb-20 lg:pb-2">
      <p className="text-primary text-3xl md:text-5xl font-bold text-center">Bao lì xì của bạn</p>
      <p className="text-secondary text-center font-semibold px-12 text-xl">
        Bạn đang có: {numeral(totalReceive).format("0,0")}₫
      </p>
      <div className="flex flex-col lg:flex-row gap-10 pt-10">
        {/* {receive.map(({ id, value }) => (
          <div className="flex flex-col items-center gap-4" key={id}>
            <div className="relative">
              <Image src={primaryRedEnvelope} className="w-52" alt="red-envelope" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col">
                <p className="text-white text-center font-semibold tracking-wide text-lg ">{id}</p>
                <p className="text-white text-center font-semibold text-2xl">
                  {numeral(value).format("0,0")}₫
                </p>
              </div>
            </div>
          </div>
        ))} */}
      </div>
      <button className={playButtonClassName} onClick={onPlay}>
        <Game color="#ffffff" size={24} />
        <span>Play</span>
      </button>
    </div>
  );
};

export default MyEnvelope;
