import React, { PropsWithChildren } from "react";

// type state = { username: string; password: string; email: string };
export interface FormInputProps<state, InputType> {
  field: keyof state & string;
  label: string;
  value: string;
  formLogic: IFormLogic<state, InputType>;
}

export interface IFormLogic<state, InputType> {
  handleChange: (e: React.FormEvent<InputType>) => void;
  handleBlur: (e: React.FormEvent<InputType>) => void;
  touched: { [Property in keyof state]: boolean };
  errors: { [Property in keyof state]: string | false };
}

const TextInput = <state,>({
  field,
  label,
  value,
  formLogic,
}: PropsWithChildren<FormInputProps<state, HTMLInputElement>>) => {
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

export default TextInput;

export const TextArea = <state,>({
  field,
  label,
  value,
  formLogic,
  dimensions,
}: PropsWithChildren<FormInputProps<state, HTMLTextAreaElement>> & {
  dimensions: { rows: number; cols: number };
}) => {
  const { handleChange, handleBlur, touched, errors } = formLogic;
  return (
    <label htmlFor={field}>
      {label}
      <textarea
        name={field}
        id={field}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={dimensions.rows}
        cols={dimensions.cols}
        autoComplete="off"
        spellCheck="true"
        style={value ? { borderColor: "green" } : {}}
      />
      <span>{touched[field] && errors[field]}</span>
    </label>
  );
};
