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
import { getRoundState } from "@/helpers";

type Props = {
  children: React.ReactNode;
};

const ClientLayout: React.FC<Props> = ({ children }) => {
  const { setIsSetupTime, setRounds, setRoundState } = useRoundStore();
  const { setSetupEnvelopes, setEnvelopes } = useEnvelopeStore();
  const [loading, setLoading] = React.useState(true);

  const getSetupEnvelopes = async () => {
    const url = "/envelope/setup-envelopes";
    const { data = [], error } = await axiosInstance.get<null, IResponse<IEnvelopes>>(url);
    if (error) return toast.error(error);
    setSetupEnvelopes(data);
    return Promise.resolve(data);
  };

  const getRounds = async () => {
    const { error, data = [] } = await axiosInstance.get<null, IResponse<IRounds>>("/round");
    if (error) return toast.error(error);

    const firstRound = data.find((round) => round.value === 1);
    if (dayjs().isBefore(dayjs(firstRound?.startTime))) setIsSetupTime(true);
    else setIsSetupTime(false);

    setRounds(data);
    return Promise.resolve(data);
  };

  const getEnvelopes = async () => {
    const url = "/envelope";
    const { error, data = [] } = await axiosInstance.get<null, IResponse<IEnvelopes>>(url);
    if (error) return toast.error(error);
    setEnvelopes(data);
    return Promise.resolve(data);
  };

  React.useEffect(() => {
    Promise.all([getRounds(), getEnvelopes(), getSetupEnvelopes()]).then(
      ([rounds, envelopes, setupEnvelopes]) => {
        setRoundState(getRoundState(rounds as IRounds));
        setLoading(false);
      }
    );
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
