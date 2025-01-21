import React from "react";

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
};

const LoginButton = (props: Props) => {
  return (
    <button
      className="font-medium text-white bg-primary py-2 px-4 rounded-lg text-xl animate-heartBeat z-10 shadow-xl"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default LoginButton;
