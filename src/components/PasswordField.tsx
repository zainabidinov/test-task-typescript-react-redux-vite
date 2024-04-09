import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const PasswordField = (props: {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError: string;
  confirmPassword: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="password-input">
      <input
        type={showPassword ? "text" : "password"}
        id={props.id}
        onChange={props.onChange}
        className={`signup__input ${
          (props.passwordError || props.confirmPassword) &&
          "signup__input--error"
        }`}
      />
      <span className="toggle-password" onClick={togglePasswordVisibility}>
        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
      </span>
    </div>
  );
};

export default PasswordField;
