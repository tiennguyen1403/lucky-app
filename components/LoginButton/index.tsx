import React from "react";

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
};

const LoginButton = (props: Props) => {
  return (
    <button
      className="font-medium text-white bg-[#338cf1] py-2 px-4 rounded-lg text-xl animate-heartBeat opacity-75 z-50"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default LoginButton;
