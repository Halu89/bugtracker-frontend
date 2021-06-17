import React, { useEffect, useState } from "react";
import validate from "../utils/validate";
import useAuthSubmit from "../hooks/useAuthSubmit";
import { useGlobalContext } from "../utils/context";
import FormInput from "./FormInputs";

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
  // Restrict the type so we can be call errors[field] and touched[field]
  type FormFieldsType = keyof typeof state;
  const { setUser } = useGlobalContext();


  //Skip email validation on login form
  const validateForm = {...validate}
  if (type === "signin") {
    validateForm.email = () => {
      return false;
    };
  }

  useEffect(() => {
    const labelArrays = Object.keys(state) as Array<FormFieldsType>;
    // Apply custom styles depending on the fields validation
    labelArrays.forEach((field) => {
      //TODO : on the register page, the ids are not unique =>  useRef ?
      const input = document.getElementById(field);
      console.log(input)
      if (!input) return;
      if (touched[field] && errors[field]) {
        input.classList.add("invalid");
        input.classList.remove("valid");
      }
      if (touched[field] && !errors[field]) {
        input.classList.remove("invalid");
        input.classList.add("valid");
      }
    });
  }, [errors, state, touched]);

  useEffect(() => {
    setUser(user);
  }, [user, jwtToken, setUser]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as typeof e.currentTarget & {
      name: FormFieldsType;
      value: string;
    };
    setState({ ...state, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as typeof e.currentTarget & {
      name: FormFieldsType;
      value: string;
    };
    //Check for errors
    setErrors({ ...errors, [name]: validateForm[name](value) });
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
    const labelArray = Object.keys(state) as FormFieldsType[];
    labelArray.forEach((el) => {
      setTouched((touched) => ({ ...touched, [el]: true }));
      setErrors((errors) => ({ ...errors, [el]: validateForm[el](state[el]) }));
    });
    console.log(errors); //XXX
    // Verify that there is no error
    // errors here is the errors object before the handleSubmit call
    const isError = Object.values(errors).reduce((acc: boolean, el) => {
      return el ? true : acc;
    }, false);
    // Verify that we have values
    let isEmpty;
    if (type === "signup") {
      isEmpty = Object.values(state).reduce((acc: boolean, el: string) => {
        return el.length === 0 ? true : acc;
      }, false);
    } else {
      isEmpty = state.username.length === 0 || state.password.length === 0;
    }

    console.log("Error", isError);
    console.log("empty", isEmpty);
    if (isError || isEmpty) return;

    // Submit
    submitForm();
  };

  const formLogic = { handleChange, handleBlur, errors, touched };

  return (
    <div className="form-container">
      {status === "pending" && <div className="success">Loading ...</div>}
      {reqMessage && (
        <div className={reqMessage.type}>{reqMessage.message}</div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          field="username"
          label="Username : "
          value={state.username}
          formLogic={formLogic}
        />
        {type === "signup" && (
          <FormInput
            field="email"
            label="Email : "
            value={state.email}
            formLogic={formLogic}
          />
        )}
        <FormInput
          field="password"
          label="Password : "
          value={state.password}
          formLogic={formLogic}
        />
        <button type="submit">
          {type === "signup" ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
