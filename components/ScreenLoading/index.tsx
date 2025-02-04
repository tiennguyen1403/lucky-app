import React from "react";
import CircularProgress from "../CircularProgress";

const ScreenLoading = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black/60 flex flex-col justify-center items-center gap-2 z-10">
      <CircularProgress size="lg" />
      <p className="text-3xl font-medium text-white tracking-wider">Loading...</p>
    </div>
  );
};

export default ScreenLoading;
