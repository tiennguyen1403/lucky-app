"use client";
import React from "react";
import { toast } from "react-hot-toast";

import { IRounds } from "@/types/round.types";
import { IResponse } from "@/types/general.types";
import { IEnvelopes } from "@/types/envelope.types";

import useRoundStore from "@/store/roundStore";
import useEnvelopeStore from "@/store/envelopeStore";

import Header from "@/components/Header";
import ScreenLoading from "@/components/ScreenLoading";

import { getRoundState } from "@/helpers";
import axiosInstance from "@/utils/axios";
import { createClient } from "@/utils/client";

type Props = {
  children: React.ReactNode;
};

const ClientLayout: React.FC<Props> = ({ children }) => {
  const supabase = createClient();
  const { setRounds, setCurrentRound, setRoundStatus, setNextRoundTime, setNextRound } =
    useRoundStore();
  const { setSetupEnvelopes, setMyEnvelopes, setEnvelopes } = useEnvelopeStore();
  const [loading, setLoading] = React.useState(true);

  const getRounds = async () => {
    const url = "/round";
    const { error, data = [] } = await axiosInstance.get<null, IResponse<IRounds>>(url);
    if (error) {
      toast.error(error);
      return Promise.reject(error);
    } else {
      setRounds(data);
      return Promise.resolve(data);
    }
  };

  const getSetupEnvelopes = async () => {
    const url = "/envelope/setup-envelopes";
    const { error, data = [] } = await axiosInstance.get<null, IResponse<IEnvelopes>>(url);
    if (error) {
      toast.error(error);
      return Promise.reject(error);
    } else {
      setSetupEnvelopes(data);
      return Promise.resolve(data);
    }
  };

  const getMyEnvelopes = async () => {
    const url = "/envelope/my-envelopes";
    const { error, data = [] } = await axiosInstance.get<null, IResponse<IEnvelopes>>(url);
    if (error) {
      toast.error(error);
      return Promise.reject(error);
    } else {
      setMyEnvelopes(data);
      return Promise.resolve(data);
    }
  };

  const getEnvelopes = async () => {
    const url = "/envelope";
    const { error, data = [] } = await axiosInstance.get<null, IResponse<IEnvelopes>>(url);
    if (error) {
      toast.error(error);
      return Promise.reject(error);
    } else {
      setEnvelopes(data);
      return Promise.resolve(data);
    }
  };

  React.useEffect(() => {
    Promise.all([getRounds(), getEnvelopes(), getMyEnvelopes(), getSetupEnvelopes()]).then(
      ([rounds]) => {
        const { currentRound, nextRoundTime, roundStatus, nextRound } = getRoundState(
          rounds as IRounds
        );

        setNextRound(nextRound);
        setRoundStatus(roundStatus);
        setCurrentRound(currentRound);
        setNextRoundTime(nextRoundTime);

        setLoading(false);
      }
    );

    const envelopesChannel = supabase.channel("envelopes");

    envelopesChannel
      .on("broadcast", { event: "tracking-envelopes" }, ({ payload }) => {
        setEnvelopes(payload.updatedEnvelopes);
      })
      .subscribe();

    return () => {
      envelopesChannel.unsubscribe();
    };
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
