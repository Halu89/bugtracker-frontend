import React from "react";

export interface FormInputProps {
  name: string;
  label: string;
  value: string;
  formLogic: any;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  value,
  formLogic,
}) => {
  const { handleChange, onBlur, touched, errors } = formLogic;
  return (
    <label htmlFor={`"${name}"`}>
      {label}
      <input
        type={name === "email" ? "email" : "text"}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        required
        autoComplete={name === "name" || "email" ? "off" : "on"}
      />
      <span>{touched[name] && errors[name]}</span>
    </label>
  );
};

export default FormInput;
