"use client";
import React from "react";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

import Setup from "@/components/Setup";
import MyEnvelope from "@/components/MyEnvelope";
import axiosInstance from "@/utils/axios";
import { IRounds } from "@/types/round.types";
import { IResponse } from "@/types/general.types";
import useRoundStore from "@/store/roundStore";
import useEnvelopeStore from "@/store/envelopeStore";
import { IEnvelopes } from "@/types/envelope.types";
import ScreenLoading from "@/components/ScreenLoading";

const TimeoutAlert = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center pb-20 lg:pb-2">
      <p className="-translate-y-24 text-5xl text-primary font-semibold">Trò chơi đã bắt đầu!</p>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const { setRounds } = useRoundStore();
  const { setupEnvelopes, setSetupEnvelopes } = useEnvelopeStore();
  const [loading, setLoading] = React.useState(true);
  const [setupTime, setSetupTime] = React.useState(true);

  const getSetupEnvelopes = async () => {
    const url = "/envelope/setup-envelopes";
    const { data = [], error } = await axiosInstance.get<null, IResponse<IEnvelopes>>(url);
    if (error) return toast.error(error);
    setSetupEnvelopes(data);
  };

  const getRounds = async () => {
    const { error, data = [] } = await axiosInstance.get<null, IResponse<IRounds>>("/round");
    if (error) return toast.error(error);

    const firstRound = data.find((round) => round.value === 1);
    if (dayjs().isBefore(dayjs(firstRound?.startTime))) setSetupTime(true);
    else setSetupTime(false);

    setRounds(data);
  };

  React.useEffect(() => {
    Promise.all([getRounds(), getSetupEnvelopes()]).then(() => setLoading(false));
  }, []);

  if (loading) return <ScreenLoading />;

  return (
    <>
      {setupTime && <Setup />}
      {Boolean(!setupTime && !setupEnvelopes.length) && <TimeoutAlert />}
      {Boolean(!setupTime && setupEnvelopes.length) && <MyEnvelope />}
    </>
  );
};

export default ProfilePage;
