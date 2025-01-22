import { Eye, EyeSlash } from "iconsax-react";
import React from "react";
import { FieldError } from "react-hook-form";

type Props = {
  value: string;
  error?: FieldError;
  placeholder?: string;
  onChange: (text: string) => void;
};

const sendInputClassName = `bg-input w-full py-2 px-3 rounded-xl outline-none text-secondary border-2 border-solid border-transparent`;
const iconWrapperClassName = `absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer`;

const InputPassword: React.FC<Props> = (props) => {
  const { value, placeholder, error, onChange } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <>
      <div className="relative">
        <input
          value={value}
          placeholder={placeholder}
          className={sendInputClassName}
          type={showPassword ? "text" : "password"}
          onChange={(event) => onChange(event.target.value)}
        />
        <div onClick={togglePassword} className={iconWrapperClassName}>
          {showPassword && <EyeSlash color="#364152" variant="Bold" size={24} />}
          {!showPassword && <Eye color="#364152" variant="Bold" size={24} />}
        </div>
      </div>
      {error && <p className="text-error text-sm">{error.message}</p>}
    </>
  );
};

export default InputPassword;
