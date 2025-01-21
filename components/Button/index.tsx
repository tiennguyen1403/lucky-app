import React from "react";

type Props = {
  children?: React.ReactNode;
  type?: "default" | "text";
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
};

const Button: React.FC<Props> = (props) => {
  const { children, type = "default", icon, iconPosition = "start" } = props;

  const buttonTypeClassName: Record<string, string> = {
    default: "default-button",
    text: "text-button",
  };

  const iconPositionClassName: Record<string, string> = {
    start: "",
    end: "order-1",
  };

  const iconClassName = [iconPositionClassName[iconPosition]].join(" ");
  const buttonClassName = ["button", buttonTypeClassName[type]].join(" ");

  return (
    <button className={buttonClassName}>
      {icon && <div className={iconClassName}>{icon}</div>}
      <>{children}</>
    </button>
  );
};

export default Button;
