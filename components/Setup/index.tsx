import React from "react";
import { z } from "zod";
import numeral from "numeral";
import Image from "next/image";
import { Save2 } from "iconsax-react";
import { toast } from "react-hot-toast";
import { FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import axiosInstance from "@/utils/axios";
import { generateRandomId } from "@/helpers";
import useAuthStore from "@/store/authStore";
import { IResponse } from "@/types/general.types";
import useProfileStore from "@/store/profileStore";

import primaryRedEnvelope from "@/public/primary-envelope.png";

const saveButtonClassName = `mt-10 bg-primary text-white px-6 py-2 w-40 rounded-lg text-xl font-medium tracking-wide flex items-center justify-center gap-2`;

const envelopeClassName = (error?: FieldError): string => {
  const initClassName = `bg-white py-2 px-3 rounded-xl outline-none text-primary w-52 border-2 border-solid shadow-xl`;
  const errorClassName = error ? "border-error" : "border-transparent";
  const className = [initClassName, errorClassName].join(" ");
  return className;
};

const schema = z.object({
  envelopes: z.array(
    z.object({
      eid: z.string().nonempty({ message: "ID của bao không được rỗng" }),
      value: z
        .number()
        .min(50000, { message: "Giá trị tối thiểu 50k" })
        .max(150000, { message: "Giá trị tối đa 150k" }),
    })
  ),
});

const defaultValues = Array.from({ length: 3 }).map(() => ({
  eid: generateRandomId(15),
  value: 0,
}));

type DataType = z.infer<typeof schema>;

const Setup: React.FC = () => {
  const {
    title,
    description,
    send,
    setSend,
    setTitle: setProfileTitle,
    setDescription,
  } = useProfileStore();
  const { user } = useAuthStore();

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { envelopes: defaultValues },
  });
  const { fields } = useFieldArray({ control, name: "envelopes" });

  const formatValue = (value: string): number => numeral(value).value() || 0;

  const onSubmit = async ({ envelopes }: DataType) => {
    const totalValue = envelopes.reduce((total, item) => (total += item.value), 0);
    if (totalValue < 300000) return toast.error("Tổng 3 bao phải bằng 300k");

    const payload = envelopes.map((envelope) => ({
      ...envelope,
      round: null,
      sender: user?.id || null,
      receiver: null,
    }));

    try {
      const { success, error } = await axiosInstance.post<unknown, IResponse>("/envelope", {
        envelopes: payload,
      });

      if (success) {
        toast.success("Lưu thành công");
      } else {
        toast.error(error);
      }
    } catch (error: any) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center pb-20 lg:pb-2">
      <p className="text-primary text-center text-3xl md:text-5xl font-semibold">{title}</p>
      <p className="text-secondary text-center font-semibold px-12 text-xl">{description}</p>
      <div className="flex flex-col lg:flex-row gap-10 pt-10">
        {fields.map((item, index) => (
          <div className="flex flex-col items-center gap-4" key={item.id}>
            <Image src={primaryRedEnvelope} className="w-52" alt="red-envelope" />
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
      <button onClick={handleSubmit(onSubmit)} className={saveButtonClassName}>
        <Save2 color="#ffffff" size={24} />
        <span>Save</span>
      </button>
    </div>
  );
};

export default Setup;
