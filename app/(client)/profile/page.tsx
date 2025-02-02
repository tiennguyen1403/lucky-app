"use client";
import React from "react";

import Setup from "@/components/Setup";
import MyEnvelope from "@/components/MyEnvelope";
import useRoundStore from "@/store/roundStore";
import useEnvelopeStore from "@/store/envelopeStore";
import TimeoutAlert from "@/components/TimeoutAlert";

const ProfilePage: React.FC = () => {
  const { isSetupTime } = useRoundStore();
  const { setupEnvelopes } = useEnvelopeStore();

  return (
    <>
      {isSetupTime && <Setup />}
      {Boolean(!isSetupTime && !setupEnvelopes.length) && <TimeoutAlert />}
      {Boolean(!isSetupTime && setupEnvelopes.length) && <MyEnvelope />}
    </>
  );
};

export default ProfilePage;
