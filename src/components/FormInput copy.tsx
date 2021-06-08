import React, { PropsWithChildren } from "react";

// type state = { username: string; password: string; email: string };
export interface FormInputProps<state> {
  field: keyof state & string;
  label: string;
  value: string;
  formLogic: {
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FormEvent<HTMLInputElement>) => void;
    touched: { [Property in keyof state]: boolean };
    errors: { [Property in keyof state]: string | false };
  };
}

const FormInput = <state,>({
  field,
  label,
  value,
  formLogic,
}: PropsWithChildren<FormInputProps<state>>) => {
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
