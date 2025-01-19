import React from "react";
import { zeroPad } from "react-countdown";

type Props = {
  hours: number;
  minutes: number;
  seconds: number;
};

//ebb4b5

const CountdownComponent: React.FC<Props> = ({ hours, minutes, seconds }) => {
  return (
    <div className="flex flex-col items-center gap-2 px-10 py-4 my-6 bg-white rounded-xl shadow-xl">
      <p className="text-primary text-xl font-semibold">Vòng tiếp theo</p>
      <div className=" flex items-center gap-6 text-[#af7b7a] text-xl font-semibold">
        <div className="flex flex-col items-center">
          <p className="tracking-wider">{zeroPad(hours)}</p>
          <p className="text-base">Hours</p>
        </div>
        <div className="w-0.5 h-3/4 bg-[#af7b7a]/70"></div>
        <div className="flex flex-col items-center">
          <p className="tracking-wider">{zeroPad(minutes)}</p>
          <p className="text-base">Minutes</p>
        </div>
        <div className="w-0.5 h-3/4 bg-[#af7b7a]/70"></div>
        <div className="flex flex-col items-center">
          <p className="tracking-wider">{zeroPad(seconds)}</p>
          <p className="text-base">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default CountdownComponent;
