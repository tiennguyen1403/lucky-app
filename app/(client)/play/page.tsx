"use client";
import React from "react";
import numeral from "numeral";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { RoundStatus } from "@/types/round.types";
import { IResponse } from "@/types/general.types";
import { IEnvelope } from "@/types/envelope.types";

import useAuthStore from "@/store/authStore";
import useRoundStore from "@/store/roundStore";
import useEnvelopeStore from "@/store/envelopeStore";

import Modal from "@/components/Modal";
import SetupAlert from "@/components/SetupAlert";
import BreakAlert from "@/components/BreakAlert";
import PickedAlert from "@/components/PickedAlert";
import FinishedAlert from "@/components/FinishedAlert";

import axiosInstance from "@/utils/axios";
import { createClient } from "@/utils/client";

import primaryRedEnvelope from "@/public/primary-envelope.png";

const PlayPage: React.FC = () => {
  const router = useRouter();
  const supabase = createClient();
  const envelopesChannel = supabase.channel("envelopes");

  const { roundStatus, currentRound } = useRoundStore();
  const { envelopes, myEnvelopes, setMyEnvelopes } = useEnvelopeStore();
  const { user } = useAuthStore();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [receiveEnvelope, setReceiveEnvelope] = React.useState<IEnvelope>({} as IEnvelope);

  const isPicked = myEnvelopes.some((envelopes) => envelopes.round === currentRound);

  const goToProfile = () => {
    setAlertOpen(false);
    router.push("/profile");
  };

  const handlePick = async (eid: string) => {
    toast.dismiss();
    const url = "/envelope";
    const payload = { eid, currentRound };
    const { error, data = {} } = await axiosInstance.post<null, IResponse<IEnvelope>>(url, payload);

    if (error) {
      return toast.error(error);
    }

    const updatedEnvelopes = envelopes.map((envelope) => {
      if (envelope.eid === eid) {
        return { ...envelope, receiver: user?.id };
      } else {
        return envelope;
      }
    });

    envelopesChannel.send({
      type: "broadcast",
      event: "tracking-envelopes",
      payload: { updatedEnvelopes },
    });

    setAlertOpen(true);
    setReceiveEnvelope(data as IEnvelope);
    setMyEnvelopes([...myEnvelopes, data as IEnvelope]);
  };

  return (
    <>
      {roundStatus === RoundStatus.SETUP && <SetupAlert />}
      {roundStatus === RoundStatus.BREAK && <BreakAlert />}
      {roundStatus === RoundStatus.FINISHED && <FinishedAlert />}
      {roundStatus === RoundStatus.IN_PROGRESS && isPicked && <PickedAlert />}
      {roundStatus === RoundStatus.IN_PROGRESS && !isPicked && (
        <div className="h-full flex flex-col items-center justify-center py-2 pb-20">
          <p className="text-primary text-center text-5xl font-semibold mb-2">
            Vòng {currentRound}
          </p>
          <p className="text-secondary text-center font-semibold px-12 text-xl">
            Vui lòng chọn 1 bao lì xì bất kì
          </p>
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 md:gap-8 pt-10 px-6 md:px-20 lg:px-40">
            {envelopes.map((envelope) =>
              envelope?.receiver ? (
                <div key={envelope.eid}></div>
              ) : (
                <div
                  key={envelope.eid}
                  onClick={() => handlePick(envelope.eid || "")}
                  className="relative cursor-pointer shadow-2xl transition-all hover:-translate-y-2"
                >
                  <Image
                    src={primaryRedEnvelope}
                    alt="red-envelope"
                    className="w-full rounded-2xl"
                  />
                  <p className="text-secondary bg-white py-1 px-2 shadow-md rounded-md font-medium text-sm absolute top-6 left-1/2 -translate-x-1/2">
                    {envelope.eid}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}
      <Modal
        open={alertOpen}
        title="Chúc mừng"
        onConfirm={goToProfile}
        okText="Tới trang profile"
        onCancel={() => setAlertOpen(false)}
      >
        <p className="text-xl text-center my-4">
          Bạn đã nhận được:{" "}
          <span className="font-bold text-error">
            {numeral(receiveEnvelope.value).format("0,0")}₫
          </span>
        </p>
      </Modal>
    </>
  );
};

export default PlayPage;
