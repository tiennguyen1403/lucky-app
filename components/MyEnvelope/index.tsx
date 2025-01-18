import React from "react";
import numeral from "numeral";
import Image from "next/image";
import { Game } from "iconsax-react";
import { useRouter } from "next/navigation";
import Countdown, { CountdownRendererFn } from "react-countdown";

import useRoundStore from "@/store/roundStore";
import useProfileStore from "@/store/profileStore";

import primaryRedEnvelope from "@/public/primary-envelope.png";

const playButtonClassName = `mt-10 bg-primary text-white px-6 py-2 w-40 rounded-lg text-xl font-medium tracking-wide flex items-center justify-center gap-2`;

const MyEnvelope: React.FC = () => {
  const router = useRouter();
  const { nextRoundTime } = useRoundStore();
  const { title, description, receive } = useProfileStore();

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
      return (
        <p className="mt-10 px-6 py-2">
          Vòng tiếp theo {hours}:{minutes}:{seconds}
        </p>
      );
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center py-2 pb-20">
      <p className="text-primary text-4xl font-bold text-center">{title}</p>
      <p className="text-secondary text-center font-semibold px-12 text-lg">{description}</p>
      <div className="flex flex-col lg:flex-row gap-10 pt-10">
        {receive.map(({ id, value }) => (
          <div className="flex flex-col items-center gap-4" key={id}>
            <Image src={primaryRedEnvelope} className="w-52" alt="red-envelope" />
            <div>
              <p className="text-primary text-center font-semibold text-2xl">
                {numeral(value).format("0,0")}
              </p>
              <p className="text-secondary text-center font-medium text-lg">{id}</p>
            </div>
          </div>
        ))}
      </div>
      <Countdown date={nextRoundTime} renderer={renderer} />
    </div>
  );
};

export default MyEnvelope;
