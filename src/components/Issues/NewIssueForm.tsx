import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useSend from "../../hooks/useSend";
import { apiCall } from "../../utils";
import { useGlobalContext } from "../../utils/context";
import TextInput, { TextArea } from "../FormInputs";

export interface NewIssueFormProps {}

type ProjectFormError = { title: string | false; description: string | false };
type ProjectFormTouched = { title: boolean; description: boolean };
type FormFields = "title" | "description";

const validate = {
  title: (a: string) => {
    if (!a.trim()) return "Please fill out this field";
    return false;
  },
  description: (a: string) => {
    if (!a.trim()) return "Please fill out this field";
    return false;
  },
};
const NewIssueForm: React.FC<NewIssueFormProps> = () => {
  const [state, setState] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState<ProjectFormError>({
    title: false,
    description: false,
  });
  const [touched, setTouched] = useState<ProjectFormTouched>({
    title: false,
    description: false,
  });

  const { currentProject, setCurrentProject } = useGlobalContext();

  const { projectId } = useParams<{ projectId: string | undefined }>();

  //Populate the project in case we refresh
  useEffect(() => {
    if (currentProject) return;
    apiCall(`/projects/${projectId}/details`, "GET")
      .then((resp: any) => {
        return resp.json();
      })
      .then((d: any) => {
        console.log("project from useEffect : ", d);
        setCurrentProject(d);
      });
  }, [currentProject, projectId, setCurrentProject]);

  // Apply custom styles depending on the fields validation
  type FormFieldsType = keyof typeof state;
  useEffect(() => {
    const labelArrays = Object.keys(state) as Array<FormFieldsType>;
    labelArrays.forEach((field) => {
      const input = document.getElementById(field);
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

  const { status, response, error, sendRequest: sendNewIssue } = useSend();

  // Send the user back to the issues index on successful submition
  const history = useHistory();
  useEffect(() => {
    if (response) {
      history.push(`/projects/${projectId}`);
    }
  }, [response, history, projectId]);

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget as typeof e.currentTarget & {
      name: keyof typeof state;
      value: string;
    };
    setState({ ...state, [name]: value });
    setTouched({ ...touched, [name]: true });
  };

  const handleBlur = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget as typeof e.currentTarget & {
      name: keyof typeof state;
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
    const labelArray: FormFields[] = ["title", "description"];
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

    if (isError || isEmpty) return;

    // Submit
    sendNewIssue(`/projects/${projectId}`, "POST", state)
      .then(() => {
        setState({ title: "", description: "" });
      })
      .catch((e) => setErrors(e));
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  const formLogic = { handleChange, handleBlur, errors, touched };

  return (
    <div className="new-issue-form">
      {error && <div>{error.message}</div>}
      <form onSubmit={handleSubmit}>
        {status === "pending" && <div>Sending the issue to the server...</div>}
        <TextInput<typeof state>
          label="Issue title : "
          value={state.title}
          field="title"
          formLogic={formLogic}
        />
        <TextArea<typeof state>
          label="Issue Description : "
          value={state.description}
          field="description"
          formLogic={formLogic}
          dimensions={{ rows: 8, cols: 40 }}
        />

        <div className="form-commands">
          <button type="submit">Submit</button>
          <button
            onClick={() => {
              history.push(`/projects/${projectId}`);
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewIssueForm;
