import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useSend from "../../hooks/useSend";
import { IIssue } from "../../types";
import { apiCall } from "../../utils";
import { useGlobalContext } from "../../utils/context";
import TextInput, { TextArea } from "../FormInputs";
import ManageMembers from "../ManageMembers";

export interface NewIssueFormProps {
  // issue: IIssue;
}

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
const EditIssueForm: React.FC<NewIssueFormProps> = () => {
  const { project, setProject, issue, setIssue } = useGlobalContext();

  const [state, setState] = useState({
    title: issue?.title,
    description: issue?.description,
  });
  const [errors, setErrors] = useState<ProjectFormError>({
    title: false,
    description: false,
  });
  const [touched, setTouched] = useState<ProjectFormTouched>({
    title: false,
    description: false,
  });

  // Populate the edit fields in case we did
  // not get to the page via the app and the projects context is not populated
  const params = useParams() as { projectId: string; issueId: string };
  useEffect(() => {
    const { projectId } = params;
    if (!issue) {
      apiCall(`/projects/${projectId}/details`, "GET")
        .then((resp) => {
          return resp.json();
        })
        .then((proj) => {
          setProject(proj);
        });
    }
  }, [issue, params, setProject]);

  useEffect(() => {
    const { issueId, projectId } = params;
    if (!issue) {
      apiCall(`/projects/${projectId}/${issueId}`, "GET")
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          setState({ title: data.title, description: data.description });
          setIssue(data);
        });
    }
  }, [issue, params, setIssue]);

  type FormFieldsType = keyof typeof state;
  useEffect(() => {
    const labelArrays = Object.keys(state) as Array<FormFieldsType>;
    // Apply custom styles depending on the fields validation
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

  const { status, response, error, sendRequest: sendEditedIssue } = useSend();

  //Send back to the issues index on successful submit
  const history = useHistory();
  useEffect(() => {
    if (response) {
      history.push(`/projects/${project?._id}`);
    }
  }, [response, history, project]);

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
    sendEditedIssue(
      `/projects/${project?._id}/${issue?._id}`,
      "PUT",
      state
    ).then(() => {
      setState({ title: "", description: "" });
    });
  };

  useEffect(() => {
    console.log(error); //TODO
  }, [error]);

  const formLogic = { handleChange, handleBlur, errors, touched };

  return (
    <div className="edit-issue">
      <div className="new-issue-form">
        {error && <div>{error.message}</div>}

        <form onSubmit={handleSubmit}>
          {status === "pending" && (
            <div>Sending the issue to the server...</div>
          )}
          <TextInput<typeof state>
            label="Issue name : "
            value={state.title || ""}
            field="title"
            formLogic={formLogic}
          />
          <TextArea<typeof state>
            label="Issue Description : "
            value={state.description || ""}
            field="description"
            formLogic={formLogic}
            dimensions={{ rows: 8, cols: 40 }}
          />
          <div className="form-commands">
            <button type="submit">Submit</button>
            <button
              onClick={() => {
                history.push(`/projects/${project?._id}`);
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIssueForm;
