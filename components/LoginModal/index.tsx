import React from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import Modal from "../Modal";
import Input from "../Input";
import InputPassword from "../InputPassword";
import axiosInstance from "@/utils/axios";
import { IResponse } from "@/types/general.types";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required!"),
});

type LoginType = z.infer<typeof schema>;

const defaultValues: LoginType = { email: "", password: "" };

const LoginModal: React.FC<Props> = (props) => {
  const router = useRouter();
  const { isOpen, setIsOpen } = props;
  const [loading, setLoading] = React.useState(false);

  const { control, reset, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const handleLogin = async (values: LoginType) => {
    setLoading(true);
    const { error } = await axiosInstance.post<null, IResponse<null>>("/login", values);
    setLoading(false);

    if (error) return toast.error(error);

    toast.success("Đăng nhập thành công!");
    router.push("/profile");
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      okText="Đăng nhập"
      maskClosable={false}
      title="Thông tin đăng nhập"
      confirmLoading={loading}
      onCancel={handleClose}
      onConfirm={handleSubmit((values) => handleLogin(values))}
    >
      <form className="flex flex-col gap-4 pb-4">
        <div className="flex flex-col gap-1">
          <p className="text-secondary">Email</p>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input {...field} error={error} placeholder="Địa chỉ email" />
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-secondary">Mật khẩu</p>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputPassword {...field} error={error} placeholder="Mật khẩu" />
            )}
          />
        </div>
      </form>
    </Modal>
  );
};

export default LoginModal;
