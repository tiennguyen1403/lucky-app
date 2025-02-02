"use client";
import React from "react";
import numeral from "numeral";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProfileCircle } from "iconsax-react";

import { randomValue } from "@/helpers";
import useRoundStore from "@/store/roundStore";
import useProfileStore from "@/store/profileStore";
import primaryRedEnvelope from "@/public/primary-envelope.png";
import useEnvelopeStore from "@/store/envelopeStore";
import TimeoutAlert from "@/components/TimeoutAlert";
import dayjs from "dayjs";

const className = `bg-primary text-white px-6 py-2 w-40 rounded-lg text-xl font-medium tracking-wide flex items-center justify-center gap-2`;

const SetupTime = () => {
  const router = useRouter();
  const goToProfile = () => router.push("/profile");

  return (
    <div className="col-span-10 flex flex-col items-center gap-4 pt-20 md:pt-28 px-6">
      <p className="text-center text-secondary text-2xl md:text-3xl">
        Chưa tới giờ chơi, vào profile để chia bao lì xì nhé
      </p>
      <button className={className} onClick={goToProfile}>
        <ProfileCircle variant="Bold" color="#ffffff" size={24} />
        <span>Profile</span>
      </button>
    </div>
  );
};

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
  const { receive, setReceive, setDescription } = useProfileStore();
  const { isSetupTime, rounds, setError } = useRoundStore();
  const { setupEnvelopes, myEnvelopes, envelopes } = useEnvelopeStore();

  const currentRound = rounds.find(
    (round) => dayjs().isAfter(dayjs(round.startTime)) && dayjs().isBefore(dayjs(round.endTime))
  );
  const isPicked = myEnvelopes.length === currentRound?.value;

  console.log("currentRound :>> ", currentRound);
  console.log("isPicked :>> ", isPicked);

  const handlePick = (id: string) => {
    const updatedReceive = [...receive, { id, value: randomValue(50000, 150000, 10000) }];
    const updatedTotal = updatedReceive.reduce((total, item) => (total += item.value), 0);
    setReceive(updatedReceive);
    setDescription(`Bạn đang có: ${numeral(updatedTotal).format("0,0")}₫`);
    setError("Ồ, bạn đã chơi vòng này rồi, vào profile xem kết quả nhé!");
  };

  return (
    <>
      {isSetupTime && <SetupTime />}
      {Boolean(!isSetupTime && !setupEnvelopes.length) && <TimeoutAlert />}
      <div className="h-full flex flex-col items-center justify-center py-2 pb-20">
        {currentRound && (
          <>
            <p className="text-primary text-center text-5xl font-semibold">
              Vòng {currentRound.value}
            </p>
            <p className="text-secondary text-center font-semibold px-12 text-xl">
              Vui lòng chọn 1 bao lì xì bất kì
            </p>
          </>
        )}
        {/* <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-10 gap-6 md:gap-10 pt-10 px-6 md:px-20 lg:px-40">
          {available.map(({ id }) => (
            <div key={id} onClick={() => handlePick(id)} className="relative cursor-pointer">
              <Image src={primaryRedEnvelope} alt="red-envelope" className="w-full" />
              <p className="text-white font-medium text-lg absolute top-4 left-1/2 -translate-x-1/2">
                {id}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default PlayPage;
