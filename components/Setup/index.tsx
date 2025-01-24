import React from "react";
import { z } from "zod";
import numeral from "numeral";
import Image from "next/image";
import { Save2 } from "iconsax-react";
import { toast } from "react-hot-toast";
import { FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import axiosInstance from "@/utils/axios";
import { IResponse } from "@/types/general.types";
import useRoundStore from "@/store/roundStore";
import useEnvelopeStore from "@/store/envelopeStore";
import CountdownComponent from "../CountdownComponent";

import primaryRedEnvelope from "@/public/primary-envelope.png";

const envelopeClassName = (error?: FieldError): string => {
  const initClassName = `bg-white py-2 px-3 rounded-xl outline-none text-primary w-48 border-2 border-solid shadow-xl`;
  const errorClassName = error ? "border-error" : "border-transparent";
  return [initClassName, errorClassName].join(" ");
};

const saveClassName = (loading: boolean): string => {
  const initClassName = `mt-4 bg-primary text-white px-6 py-2 w-40 rounded-lg text-xl font-medium tracking-wide flex items-center justify-center gap-2 transition-all`;
  const loadingClassName = loading ? "opacity-75 cursor-not-allowed pointer-events-none" : "";
  return [initClassName, loadingClassName].join(" ");
};

const schema = z.object({
  envelopes: z.array(
    z.object({
      value: z
        .number()
        .min(50000, { message: "Giá trị tối thiểu 50k" })
        .max(200000, { message: "Giá trị tối đa 200k" }),
    })
  ),
});

type DataType = z.infer<typeof schema>;

const Setup: React.FC = () => {
  const { rounds } = useRoundStore();
  const { setupEnvelopes } = useEnvelopeStore();
  const [loading, setLoading] = React.useState(false);

  const firstRound = rounds.find((round) => round.value === 1);

  const envelopes = Array.from({ length: 3 }).map((_, index) => ({
    value: setupEnvelopes?.[index]?.value || 0,
  }));

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { envelopes },
  });
  const { fields } = useFieldArray({ control, name: "envelopes" });

  const formatValue = (value: string): number => numeral(value).value() || 0;

  const onSubmit = async ({ envelopes }: DataType) => {
    setLoading(true);
    const totalValue = envelopes.reduce((total, item) => (total += item.value), 0);
    if (totalValue !== 300000) {
      setLoading(false);
      toast.error("Tổng 3 bao phải bằng 300k");
      return;
    }

    const url = "/envelope/setup-envelopes";
    const { error } = await axiosInstance.post<null, IResponse<null>>(url, { envelopes });
    setLoading(false);

    if (error) toast.error(error);
    else toast.success("Lưu thành công");
  };

  const renderer: CountdownRendererFn = ({ hours, minutes, seconds }) => {
    return <CountdownComponent hours={hours} minutes={minutes} seconds={seconds} />;
  };

  return (
    <div className="h-full flex flex-col items-center justify-start pb-20 lg:pb-0">
      <p className="text-primary text-center text-3xl md:text-5xl font-semibold">
        Chia tiền vào bao
      </p>
      <p className="text-secondary text-center font-semibold px-12 text-xl">
        Vui lòng chọn số tiền cho mỗi bao (thấp nhất 50k, cao nhất 200k)
      </p>
      <div className="mt-3 mb-5">
        <Countdown date={firstRound?.startTime} renderer={renderer} />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {fields.map((_, index) => (
          <div className="flex flex-col items-center gap-4" key={index}>
            <Image src={primaryRedEnvelope} className="w-48" alt="red-envelope" />
            <Controller
              control={control}
              name={`envelopes.${index}.value`}
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  placeholder="Nhập tiền đi ní"
                  className={envelopeClassName(error)}
                  value={numeral(field.value).format("0,0")}
                  onChange={(event) => field.onChange(formatValue(event.target.value))}
                />
              )}
            />
          </div>
        ))}
      </div>
      <button onClick={handleSubmit(onSubmit)} className={saveClassName(loading)}>
        <Save2 color="#ffffff" size={24} />
        <span>Save</span>
      </button>
    </div>
  );
};

export default Setup;
