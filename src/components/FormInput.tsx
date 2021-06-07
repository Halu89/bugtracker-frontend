import React from "react";
import { IFormState } from "../types";
export interface FormInputProps {
  name: "username" | "email" | "password";
  label: string;
  value: string;
  formLogic: {
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FormEvent<HTMLInputElement>) => void;
    touched: { username: boolean; password: boolean; email: boolean };
    errors: IFormState;
  };
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  value,
  formLogic,
}) => {
  const { handleChange, handleBlur, touched, errors } = formLogic;

  const inputType = name === "password" ? "password" : "text";
  return (
    <label htmlFor="name">
      {label}
      <input
        type={inputType}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span className="form__error-message">
        {touched[name] && errors[name]}
      </span>
    </label>
  );
};

export default FormInput;
