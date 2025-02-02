"use client";
import React from "react";
import dayjs from "dayjs";
import { toast } from "react-hot-toast";

import Header from "@/components/Header";
import axiosInstance from "@/utils/axios";
import { IRounds } from "@/types/round.types";
import { IResponse } from "@/types/general.types";
import { IEnvelopes } from "@/types/envelope.types";
import useRoundStore from "@/store/roundStore";
import useEnvelopeStore from "@/store/envelopeStore";
import ScreenLoading from "@/components/ScreenLoading";

type Props = {
  children: React.ReactNode;
};

const ClientLayout: React.FC<Props> = ({ children }) => {
  const { setSetupEnvelopes, setEnvelopes } = useEnvelopeStore();
  const { setIsSetupTime, setRounds } = useRoundStore();
  const [loading, setLoading] = React.useState(true);

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
    if (dayjs().isBefore(dayjs(firstRound?.startTime))) setIsSetupTime(true);
    else setIsSetupTime(false);

    setRounds(data);
  };

  const getEnvelopes = async () => {
    const url = "/envelope";
    const { error, data = [] } = await axiosInstance.get<null, IResponse<IEnvelopes>>(url);
    if (error) return toast.error(error);
    setEnvelopes(data);
  };

  React.useEffect(() => {
    Promise.all([getRounds(), getEnvelopes(), getSetupEnvelopes()]).then(() => setLoading(false));
  }, []);

  if (loading) return <ScreenLoading />;

  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ClientLayout;
