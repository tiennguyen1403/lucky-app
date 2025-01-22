import React from "react";
import { FieldError } from "react-hook-form";

type Props = {
  value: string;
  error?: FieldError;
  placeholder?: string;
  onChange: (text: string) => void;
};

const sendInputClassName = `bg-input w-full py-2 px-3 rounded-xl outline-none text-secondary border-2 border-solid border-transparent`;

const Input: React.FC<Props> = (props) => {
  const { value, placeholder, error, onChange } = props;

  return (
    <>
      <div className="relative">
        <input
          value={value}
          placeholder={placeholder}
          className={sendInputClassName}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      {error && <p className="text-error text-sm">{error.message}</p>}
    </>
  );
};

export default Input;
