import React from "react";
import { CloseCircle } from "iconsax-react";
import OutsideClickHandler from "react-outside-click-handler";

type Props = {
  children: React.ReactNode;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  cancelText?: string;
  okText?: string;
};

const Modal: React.FC<Props> = (props) => {
  const {
    children,
    open,
    size = "md",
    title = "",
    cancelText = "Huỷ",
    okText = "Xác nhận",
    onCancel,
  } = props;

  const overlayInitClassName = "fixed top-0 left-0 w-screen h-screen transition-all duration-200";
  const openClassName = open
    ? "opacity-100 pointer-events-auto z-20 bg-black/50"
    : "opacity-0 pointer-events-none -z-10 bg-transparent";

  const overlayClassName = [overlayInitClassName, openClassName].join(" ");

  const wrapperInitClassName =
    "absolute top-61 left-1/2 -translate-x-1/2 py-5 px-6 rounded-xl bg-white flex flex-col shadow-2xl";
  const sizeMapping: Record<string, string> = {
    xs: "w-[320px]",
    sm: "w-[384px]",
    md: "w-[448px]",
    lg: "w-[512px]",
    xl: "w-[576px]",
  };

  const wrapperClassName = [wrapperInitClassName, sizeMapping[size]].join(" ");

  return (
    <div className={overlayClassName}>
      <OutsideClickHandler onOutsideClick={onCancel}>
        <div className={wrapperClassName}>
          <div className="flex items-center justify-between -translate-y-1.5">
            <p className="modal-title flex-1">{title}</p>
            <button className="icon-button" onClick={onCancel}>
              <CloseCircle color="#535862" size={24} />
            </button>
          </div>
          <div className="pb-2">{children}</div>
          <div className="flex items-center justify-end gap-2">
            <button>{cancelText}</button>
            <button>{okText}</button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Modal;
