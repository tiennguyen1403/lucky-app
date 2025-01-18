import React from "react";
import numeral from "numeral";
import Image from "next/image";
import { Save2 } from "iconsax-react";
import { toast } from "react-hot-toast";

import useRoundStore from "@/store/roundStore";
import useProfileStore from "@/store/profileStore";

import primaryRedEnvelope from "@/public/primary-envelope.png";
import Countdown, { CountdownRendererFn } from "react-countdown";

const sendInputClassName = `bg-white py-2 px-3 rounded-xl outline-none text-primary w-52 border-2 border-solid border-transparent shadow-xl`;
const saveButtonClassName = `mt-10 bg-primary text-white px-6 py-2 w-40 rounded-lg text-xl font-medium tracking-wide flex items-center justify-center gap-2`;

const Setup: React.FC = () => {
  const {
    title,
    description,
    send,
    setSend,
    setTitle: setProfileTitle,
    setDescription,
  } = useProfileStore();
  const { round, nextRoundTime, setRound, setTitle } = useRoundStore();
  const [invalidEnvelope, setInvalidEnvelope] = React.useState<string | null>(null);

  const onChange = (id: string, value: string) => {
    const formattedValue = numeral(value).value() || 0;
    const updatedSend = send.map((item) => {
      return item.id === id ? { ...item, value: formattedValue } : { ...item };
    });
    setSend(updatedSend);
  };

  const onSave = () => {
    toast.dismiss();
    const invalidLower = send.find((item) => item.value < 50000);
    const invalidHigher = send.find((item) => item.value > 200000);
    const totalValue = send.reduce((total, item) => (total += item.value), 0);

    if (invalidLower) {
      toast.error("Tối thiểu là 50k!!!");
      setInvalidEnvelope(invalidLower.id);
      return;
    }
    if (invalidHigher) {
      toast.error("Tối đa là 200k!!!");
      setInvalidEnvelope(invalidHigher.id);
      return;
    }

    setInvalidEnvelope(null);

    if (totalValue > 300000) return toast.error("Tổng 3 bao 300k thôi nha!!!");

    toast.success("Lưu thành công");
  };

  const renderer: CountdownRendererFn = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      const nextRound = round + 1;
      setRound(nextRound);
      setTitle(`Vòng ${nextRound}`);
      setDescription("Bạn đang có: 0");
      setProfileTitle("Bao lì xì của bạn");
    }

    return (
      <p>
        Vòng tiếp theo {hours}:{minutes}:{seconds}
      </p>
    );
  };

  return (
    <div className="h-full flex flex-col items-center justify-center py-2 pb-20">
      <p className="text-primary text-center text-4xl font-semibold">{title}</p>
      <p className="text-secondary text-center font-semibold px-12 text-lg">{description}</p>
      <Countdown date={nextRoundTime} renderer={renderer} />
      <div className="flex flex-col lg:flex-row gap-10 pt-10">
        {send.map(({ id, value }) => (
          <div className="flex flex-col items-center gap-4" key={id}>
            <Image src={primaryRedEnvelope} className="w-52" alt="red-envelope" />
            <input
              style={invalidEnvelope === id ? { borderColor: "#E21932" } : {}}
              onChange={(event) => onChange(id, event.target.value)}
              value={numeral(value).format("0,0")}
              placeholder="Nhập tiền đi ní"
              className={sendInputClassName}
            />
          </div>
        ))}
      </div>
      <button onClick={onSave} className={saveButtonClassName}>
        <Save2 color="#ffffff" size={24} />
        <span>Save</span>
      </button>
    </div>
  );
};

export default Setup;
