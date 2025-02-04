"use client";
import React from "react";

import Setup from "@/components/Setup";
import MyEnvelope from "@/components/MyEnvelope";
import useRoundStore from "@/store/roundStore";
import useEnvelopeStore from "@/store/envelopeStore";
import TimeoutAlert from "@/components/TimeoutAlert";
import FinishedAlert from "@/components/FinishedAlert";
import { RoundStatus } from "@/types/round.types";

const ProfilePage: React.FC = () => {
  const { roundStatus } = useRoundStore();
  const { setupEnvelopes } = useEnvelopeStore();

  return (
    <>
      {roundStatus === RoundStatus.SETUP && <Setup />}
      {Boolean(
        [RoundStatus.IN_PROGRESS, RoundStatus.BREAK].includes(roundStatus) && !setupEnvelopes.length
      ) && <TimeoutAlert />}
      {Boolean(
        [RoundStatus.IN_PROGRESS, RoundStatus.BREAK].includes(roundStatus) && setupEnvelopes.length
      ) && <MyEnvelope />}
      {roundStatus === RoundStatus.FINISHED && <FinishedAlert />}
    </>
  );
};

export default ProfilePage;
