import React from "react";
import { IFormState } from "../types";
export interface FormInputProps {
  field: "username" | "email" | "password";
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
  field,
  label,
  value,
  formLogic,
}) => {
  const { handleChange, handleBlur, touched, errors } = formLogic;

  const inputType = field === "password" ? "password" : "text";
  return (
    <label htmlFor={field}>
      {label}
      <input
        type={inputType}
        name={field}
        id={field}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span className="form__error-message">
        {touched[field] && errors[field]}
      </span>
    </label>
  );
};

export default FormInput;
