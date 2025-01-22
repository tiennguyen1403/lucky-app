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
  confirmLoading?: boolean;
  maskClosable?: boolean;
};

const Modal: React.FC<Props> = (props) => {
  const {
    children,
    open,
    size = "md",
    title = "",
    cancelText = "Huỷ",
    okText = "Xác nhận",
    confirmLoading = false,
    maskClosable = true,
    onCancel,
    onConfirm,
  } = props;

  const overlayInitClassName = "fixed top-0 left-0 w-screen h-screen transition duration-200";
  const openClassName = open
    ? "opacity-100 pointer-events-auto z-20 bg-black/50"
    : "opacity-0 pointer-events-none -z-10 bg-transparent";
  const overlayClassName = [overlayInitClassName, openClassName].join(" ");

  const wrapperInitClassName = `absolute top-61 left-1/2 -translate-x-1/2 py-5 px-6 rounded-xl bg-white flex flex-col shadow-2xl`;
  const sizeMapping: Record<string, string> = {
    xs: "w-[320px]",
    sm: "w-[384px]",
    md: "w-[448px]",
    lg: "w-[512px]",
    xl: "w-[576px]",
  };
  const wrapperClassName = [wrapperInitClassName, sizeMapping[size]].join(" ");

  const confirmInitClassName = `bg-primary text-white px-3 h-10 rounded-lg text-sm outline-none transition-all flex items-center gap-2`;
  const cancelInitClassName = `bg-transparent text-secondary px-3 h-10 rounded-lg text-sm hover:bg-black/5 outline-none transition-colors`;
  const loadingClassName = confirmLoading ? "opacity-50 cursor-not-allowed" : "";
  const confirmClassName = [confirmInitClassName, loadingClassName].join(" ");
  const cancelClassName = [cancelInitClassName, loadingClassName].join(" ");

  return (
    <div className={overlayClassName}>
      <OutsideClickHandler onOutsideClick={onCancel} disabled={!maskClosable} useCapture>
        <div className={wrapperClassName}>
          <div className="flex items-center justify-between -translate-y-1.5">
            <p className="modal-title flex-1">{title}</p>
            <button className="icon-button" onClick={!confirmLoading ? onCancel : undefined}>
              <CloseCircle color="#535862" size={24} />
            </button>
          </div>
          <div className="pb-2">{children}</div>
          <div className="flex items-center justify-end gap-2">
            <button onClick={!confirmLoading ? onCancel : undefined} className={cancelClassName}>
              {cancelText}
            </button>
            <button onClick={!confirmLoading ? onConfirm : undefined} className={confirmClassName}>
              {okText}
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Modal;
