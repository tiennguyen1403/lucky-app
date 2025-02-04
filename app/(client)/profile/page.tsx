"use client";
import React from "react";

import { RoundStatus } from "@/types/round.types";

import useRoundStore from "@/store/roundStore";
import useEnvelopeStore from "@/store/envelopeStore";

import Setup from "@/components/Setup";
import MyEnvelope from "@/components/MyEnvelope";
import TimeoutAlert from "@/components/TimeoutAlert";
import FinishedAlert from "@/components/FinishedAlert";

const ProfilePage: React.FC = () => {
  const { roundStatus } = useRoundStore();
  const { setupEnvelopes } = useEnvelopeStore();

  const renderer = () => {
    switch (roundStatus) {
      case RoundStatus.SETUP: {
        return <Setup />;
      }
      case RoundStatus.IN_PROGRESS:
      case RoundStatus.BREAK: {
        if (setupEnvelopes.length) {
          return <MyEnvelope />;
        } else {
          return <TimeoutAlert />;
        }
      }
      default: {
        return <FinishedAlert />;
      }
    }
  };

  return <>{renderer()}</>;
};

export default ProfilePage;
