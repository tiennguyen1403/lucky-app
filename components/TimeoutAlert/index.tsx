import React from "react";

const TimeoutAlert: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center pb-20 lg:pb-2">
      <p className="-translate-y-24 text-5xl text-primary font-semibold">Trò chơi đã bắt đầu!</p>
    </div>
  );
};

export default TimeoutAlert;
