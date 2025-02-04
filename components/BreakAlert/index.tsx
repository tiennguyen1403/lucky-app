import React from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

import useRoundStore from "@/store/roundStore";
import CountdownComponent from "../CountdownComponent";

const BreakAlert: React.FC = () => {
  const { nextRound, nextRoundTime } = useRoundStore();

  const renderer: CountdownRendererFn = ({ hours, minutes, seconds }) => {
    return <CountdownComponent hours={hours} minutes={minutes} seconds={seconds} />;
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 px-2 -translate-y-24">
      {nextRound && (
        <>
          <p className="text-primary text-3xl md:text-5xl font-bold text-center">
            Vòng {nextRound - 1} đã kết thúc
          </p>
          <Countdown date={nextRoundTime as string} renderer={renderer} />
        </>
      )}
    </div>
  );
};

export default BreakAlert;
