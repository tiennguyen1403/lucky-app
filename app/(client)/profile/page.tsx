"use client";
import React from "react";

import Setup from "@/components/Setup";
import useRoundStore from "@/store/roundStore";
import MyEnvelope from "@/components/MyEnvelope";

const ProfilePage: React.FC = () => {
  const { round } = useRoundStore();
  // const [round, setRound] = React.useState<number | null>(null);

  // const getCurrentRound = async () => {
  //   const;
  // };

  return (
    <>
      {Boolean(round === 0) && <Setup />}
      {Boolean(round > 0) && <MyEnvelope />}
    </>
  );
};

export default ProfilePage;
