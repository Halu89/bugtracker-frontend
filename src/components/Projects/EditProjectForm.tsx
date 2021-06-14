import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useSend from "../../hooks/useSend";
import { apiCall } from "../../utils";
import { useGlobalContext } from "../../utils/context";
import TextInput, { TextArea } from "../FormInputs";
import ManageMembers from "../ManageMembers";

export interface NewProjectFormProps {}

type ProjectFormError = { name: string | false; description: string | false };
type ProjectFormTouched = { name: boolean; description: boolean };
type FormFields = "name" | "description";

const validate = {
  name: (a: string) => {
    if (!a.trim()) return "Please fill out this field";
    return false;
  },
  description: (a: string) => {
    if (!a.trim()) return "Please fill out this field";
    return false;
  },
};
const EditProjectForm: React.FC<NewProjectFormProps> = () => {
  const { currentProject, setCurrentProject } = useGlobalContext();
  const [state, setState] = useState({
    name: currentProject?.name,
    description: currentProject?.description,
  });
  const [errors, setErrors] = useState<ProjectFormError>({
    name: false,
    description: false,
  });
  const [touched, setTouched] = useState<ProjectFormTouched>({
    name: false,
    description: false,
  });

  // Populate the edit fields in case we did
  // not get to the page via the app and the projects context is not populated
  const params = useParams() as { projectId: string };
  useEffect(() => {
    const { projectId } = params;
    if (!currentProject) {
      apiCall(`/projects/${projectId}/details`, "GET")
        .then((resp) => {
          return resp.json();
        })
        .then((d) => {
          setState({ name: d.name, description: d.description });
          setCurrentProject(d);
        });
    }
  }, [currentProject, params, setCurrentProject]);

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

  const { status, response, error, sendRequest: sendNewProject } = useSend();

  const history = useHistory();
  useEffect(() => {
    if (response) {
      history.push("/projects");
    }
  }, [response, history]);
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

    if (isError || isEmpty) return;

    // Submit
    sendNewProject(`/projects/${currentProject?._id}`, "PUT", state).then(
      () => {
        setState({ name: "", description: "" });
      }
    );
  };

  useEffect(() => {
    console.log(error); //XXX
  }, [error]);

  const formLogic = { handleChange, handleBlur, errors, touched };

  return (
    <div className="edit-project">
      <div className="new-project-form">
        {error && <div>{error.message}</div>}
        <form onSubmit={handleSubmit}>
          {status === "pending" && (
            <div>Sending the project to the server...</div>
          )}
          <TextInput<typeof state>
            label="Project name : "
            value={state.name || ""}
            field="name"
            formLogic={formLogic}
          />
          <TextArea<typeof state>
            label="Project Description : "
            value={state.description || ""}
            field="description"
            formLogic={formLogic}
            dimensions={{ rows: 15, cols: 40 }}
          />
          <div className="form-commands">
            <button type="submit">Submit</button>
            <button
              onClick={() => {
                history.push("/projects");
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
      <ManageMembers projectId={currentProject?._id} />
    </div>
  );
};

export default EditProjectForm;
