import React, { useEffect, useState } from "react";
// import FormInput from "./FormInput";
import validate from "../utils/validate";
import useAuthSubmit from "../hooks/useAuthSubmit";
import { useGlobalContext } from "../utils/context";
import FormInput from "./FormInput";

import { AuthLabels } from "../types";

interface errorType {
  username: string | false;
  email: string | false;
  password: string | false;
}
type Props = { type: "signin" | "signup" };

const AuthForm = ({ type }: Props) => {
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState<errorType>({
    username: false,
    email: false,
    password: false,
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [status, reqMessage, user, jwtToken, submitForm] = useAuthSubmit(
    type,
    state
  );
  const { setUser } = useGlobalContext();

  useEffect(() => {
    setUser(user);
  }, [user, jwtToken, setUser]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as typeof e.currentTarget & {
      name: "username" | "email" | "password";
      value: string;
    };
    setState({ ...state, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as typeof e.currentTarget & {
      name: "username" | "email" | "password";
      value: string;
    };
    //Check for errors
    setErrors({ ...errors, [name]: validate[name](value) });
    // Set touched
    setTouched({ ...touched, [e.currentTarget.name]: true });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Prevent multi submit
    if (status === "pending") {
      return;
    }
    // Touch all fields and display errors if any
    const labelArray: AuthLabels[] = ["username", "email", "password"];
    labelArray.forEach((el) => {
      setTouched((touched) => ({ ...touched, [el]: true }));
      setErrors((errors) => ({ ...errors, [el]: validate[el](state[el]) }));
    });

    // Verify that there is no error
    // errors here is the errors object before the handleSubmit call
    const isError = Object.values(errors).reduce((acc: boolean, el) => {
      return el ? true : acc;
    }, false);
    // Verify that we have values
    // FIXME don't look at the email field if we are on signin
    const isEmpty = Object.values(state).reduce((acc: boolean, el: string) => {
      return el.length <= 0 ? true : acc;
    }, false);

    if (isError || isEmpty) return;

    // Submit
    submitForm();
  };

  const formLogic = { handleChange, handleBlur, errors, touched };

  return (
    <div className="container">
      {status === "pending" && <div className="success">Loading ...</div>}
      {reqMessage && (
        <div className={reqMessage.type}>{reqMessage.message}</div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          name="username"
          label="Name : "
          value={state.username}
          formLogic={formLogic}
        />
        {type === "signup" && (
          <FormInput
            name="email"
            label="Email : "
            value={state.email}
            formLogic={formLogic}
          />
        )}
        <FormInput
          name="password"
          label="Password : "
          value={state.password}
          formLogic={formLogic}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;
