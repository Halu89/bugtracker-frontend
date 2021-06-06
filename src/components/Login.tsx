import React, { useEffect, useState } from "react";
// import FormInput from "./FormInput";
import validate from "../utils/validate";
import useAuthSubmit from "../hooks/useAuthSubmit";
import { useGlobalContext } from "../utils/context";

export interface LoginFormProps {}

interface errorType {
  username: string | false;
  email: string | false;
  password: string | false;
}

const RegisterForm: React.FC<LoginFormProps> = () => {
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<errorType>({
    username: false,
    email: false,
    password: false,
  });
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [status, reqMessage, user, jwtToken, onSubmit] = useAuthSubmit(
    "signin",
    state
  );
  const { setUser } = useGlobalContext();
  
  useEffect(() => {
    setUser(user);
    console.log("jwtToken", jwtToken);
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
    setError({ ...error, [name]: validate[name](value) });
    // Set touched
    setTouched({ ...touched, [e.currentTarget.name]: true });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="container">
      {status === "pending" && <div className="success">Loading ...</div>}
      {reqMessage && (
        <div className={reqMessage.type}>{reqMessage.message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          name="username"
          id="username"
          value={state.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="form__error-message">{error.username}</span>
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          name="email"
          id="email"
          value={state.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="form__error-message">{error.email}</span>
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          id="password"
          value={state.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span className="form__error-message">{error.password}</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterForm;
