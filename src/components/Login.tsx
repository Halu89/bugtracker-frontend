import React, { useState } from "react";
// import FormInput from "./FormInput";

type validateFunc = (a: string) => string | false;

const validate: {
  username: validateFunc;
  email: validateFunc;
  password: validateFunc;
} = {
  username: (value) => {
    if (!value) {
      return "Please fill out this field";
    }
    return false;
  },
  email: (value: string): string | false => {
    if (!value) {
      return "Please fill out this field";
    }
    return false;
  },
  password: (value: string): string | false => {
    if (!value) {
      return "Please fill out this field";
    }
    return false;
  },
};

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
  const [reqMessage, setReqMessage] =
    useState<{
      type: "error" | "success";
      message: string;
    } | null>();

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = JSON.stringify(state);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
      mode: "cors",
    };
    try {
      const resp = await fetch(
        "http://localhost:5050/auth/signup",
        requestOptions
      );
      const jsonData = await resp.json();
      setLoading(false);
      if (!resp.ok) {
        // Show an error message on top of the form
        setReqMessage({ type: "error", message: jsonData.message });
      } else {
        const { token } = jsonData;
        setReqMessage({ type: "success", message: token });
      }
    } catch (error) {
      console.log(error);
    }
    // .then((response) => response.json())
    // .then((result) => console.log(result.token))
    // .catch((error) => console.log("error", error));
  };
  return (
    <div className="container">
      {loading && <div className="success">Loading ...</div>}
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
