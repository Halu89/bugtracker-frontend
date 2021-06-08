import React, { useEffect, useState } from "react";
import useSend from "../hooks/useSend";
import FormInput from "./FormInput copy";

export interface NewProjectFormProps {}

type ProjectFormError = { name: string | false; description: string | false };
type ProjectFormTouched = { name: boolean; description: boolean };
type FormFields = "name" | "description";

const validate = {
  name: (a: string) => {},
  description: (a: string) => {},
};
const NewProjectForm: React.FC<NewProjectFormProps> = () => {
  const [state, setState] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState<ProjectFormError>({
    name: false,
    description: false,
  });
  const [touched, setTouched] = useState<ProjectFormTouched>({
    name: false,
    description: false,
  });

  const {
    status,
    response,
    error,
    sendRequest: sendNewProject,
  } = useSend("/projects", "POST", state);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as typeof e.currentTarget & {
      name: "name" | "description";
      value: string;
    };
    setState({ ...state, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget as typeof e.currentTarget & {
      name: "name" | "description";
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
    const labelArray: FormFields[] = ["name", "description"];
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
    const isEmpty = Object.values(state).reduce((acc: boolean, el: string) => {
      return el.length <= 0 ? true : acc;
    }, false);

    // if (isError || isEmpty) return;

    // Submit
    sendNewProject().then(() => {
      setState({ name: "", description: "" });
    });
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  const formLogic = { handleChange, handleBlur, errors, touched };

  return (
    <div className="new-project-form">
      {error && <div>{error.message}</div>}
      <form onSubmit={handleSubmit}>
        {status === "pending" && (
          <div>Sending the project to the server...</div>
        )}
        <FormInput<typeof state>
          label="Project name : "
          value={state.name}
          field="name"
          formLogic={formLogic}
        />
        <FormInput<typeof state>
          label="Project Description : "
          value={state.description}
          field="description"
          formLogic={formLogic}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewProjectForm;
