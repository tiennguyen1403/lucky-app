import useRoundStore from "@/store/roundStore";
import React from "react";

const BreakAlert: React.FC = () => {
  const { currentRound } = useRoundStore();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6 px-2 -translate-y-24">
      {currentRound && (
        <p className="text-primary text-3xl md:text-5xl font-bold text-center">
          Vòng {currentRound} đã kết thúc
        </p>
      )}
    </div>
  );
};

export default BreakAlert;
