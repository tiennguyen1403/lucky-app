"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProfileCircle } from "iconsax-react";

import useRoundStore from "@/store/roundStore";
import primaryRedEnvelope from "@/public/primary-envelope.png";
import useEnvelopeStore from "@/store/envelopeStore";
import FinishedAlert from "@/components/FinishedAlert";
import SetupAlert from "@/components/SetupAlert";
import BreakAlert from "@/components/BreakAlert";
import { RoundStatus } from "@/types/round.types";
import axiosInstance from "@/utils/axios";
import { IResponse } from "@/types/general.types";
import toast from "react-hot-toast";
import { createClient } from "@/utils/client";
import useAuthStore from "@/store/authStore";

const className = `bg-primary text-white px-6 py-2 w-40 rounded-lg text-xl font-medium tracking-wide flex items-center justify-center gap-2`;

const PickedAlert = () => {
  const router = useRouter();
  const goToProfile = () => router.push("/profile");

  return (
    <div className="col-span-10 flex flex-col items-center gap-4 pt-20 md:pt-28 px-6">
      <p className="text-center text-secondary text-2xl md:text-3xl">
        Ồ, bạn đã chơi vòng này rồi, vào profile xem kết quả nhé
      </p>
      <button className={className} onClick={goToProfile}>
        <ProfileCircle variant="Bold" color="#ffffff" size={24} />
        <span>Profile</span>
      </button>
    </div>
  );
};

const PlayPage: React.FC = () => {
  const supabase = createClient();
  const envelopesChannel = supabase.channel("envelopes");
  const { roundStatus, currentRound } = useRoundStore();
  const { envelopes } = useEnvelopeStore();
  const { user } = useAuthStore();

  // const handlePick = (id: string) => {
  //   const updatedReceive = [...receive, { id, value: randomValue(50000, 150000, 10000) }];
  //   const updatedTotal = updatedReceive.reduce((total, item) => (total += item.value), 0);
  //   setReceive(updatedReceive);
  //   setDescription(`Bạn đang có: ${numeral(updatedTotal).format("0,0")}₫`);
  //   setError("Ồ, bạn đã chơi vòng này rồi, vào profile xem kết quả nhé!");
  // };

  const handlePick = async (eid: string) => {
    toast.dismiss();
    const url = "/envelope";
    const { error } = await axiosInstance.post<null, IResponse<null>>(url, { eid, currentRound });

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
  };

  return (
    <div className="h-full">
      {roundStatus === RoundStatus.SETUP && <SetupAlert />}
      {roundStatus === RoundStatus.BREAK && <BreakAlert />}
      {roundStatus === RoundStatus.FINISHED && <FinishedAlert />}
      {roundStatus === RoundStatus.IN_PROGRESS && (
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
    </div>
  );
};

export default PlayPage;
