import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useSend from "../../hooks/useSend";
import { apiCall } from "../../utils";
import { useGlobalContext } from "../../utils/context";
import TextInput, { TextArea } from "../FormInputs";

export interface NewIssueFormProps {
  // issue: IIssue;
}

type ProjectFormError = {
  title: string | false;
  description: string | false;
  statusText: string | false;
  isOpen: string | false;
};
type ProjectFormTouched = {
  title: boolean;
  description: boolean;
  statusText: boolean;
  isOpen: boolean;
};
type FormFields = "title" | "description" | "statusText" | "isOpen";

const validate = {
  title: (a: string) => {
    if (!a.trim()) return "Please fill out this field";
    return false;
  },
  description: (a: string) => {
    if (!a.trim()) return "Please fill out this field";
    return false;
  },
  statusText: (a: string) => false,
  isOpen: (a: string) => false,
};
const EditIssueForm: React.FC<NewIssueFormProps> = () => {
  const { currentProject, setCurrentProject, issue, setIssue } =
    useGlobalContext();

  const [state, setState] = useState({
    title: issue?.title,
    description: issue?.description,
    statusText: issue?.statusText,
    isOpen: issue?.isOpen,
  });
  const [errors, setErrors] = useState<ProjectFormError>({
    title: false,
    description: false,
    statusText: false,
    isOpen: false,
  });
  const [touched, setTouched] = useState<ProjectFormTouched>({
    title: false,
    description: false,
    statusText: false,
    isOpen: false,
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
          setCurrentProject(proj);
        });
    }
  }, [issue, params, setCurrentProject]);

  useEffect(() => {
    const { issueId, projectId } = params;
    if (!issue) {
      apiCall(`/projects/${projectId}/${issueId}`, "GET")
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          const { title, description, statusText, isOpen } = data;
          setState({
            title,
            description,
            statusText,
            isOpen,
          });
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
      history.push(`/projects/${currentProject?._id}`);
    }
  }, [response, history, currentProject]);

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
    // Verify that we have values in the required fields
    const isEmpty = [state.description, state.title].reduce(
      (acc: boolean, el: string) => {
        return el.length <= 0 ? true : acc;
      },
      false
    );

    if (isError || isEmpty) return;

    // Submit
    sendEditedIssue(
      `/projects/${currentProject?._id}/${issue?._id}`,
      "PUT",
      state
    ).then(() => {
      setState({ title: "", description: "", statusText: "", isOpen: false });
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
            dimensions={{ rows: 7, cols: 40 }}
          />
          <TextInput<typeof state>
            label="Status text : "
            value={state.statusText || ""}
            field="statusText"
            formLogic={formLogic}
          />
          <label className="edit-issue__checkbox" htmlFor="closed-checkbox">
            <input
              type="checkbox"
              name="issues_open"
              id="closed-checkbox"
              checked={!state.isOpen}
              onChange={(e) => {
                const isOpen = !e.currentTarget.checked;
                setState({ ...state, isOpen });
              }}
            />
            <span className="edit-issue__checkbox-label">Close the issue</span>
          </label>
          <div className="form-commands">
            <button type="submit">Submit</button>
            <button
              onClick={() => {
                history.push(`/projects/${currentProject?._id}`);
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
