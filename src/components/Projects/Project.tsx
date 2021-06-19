import React from "react";
import { IProject } from "../../types";
import { useGlobalContext } from "../../utils/context";
import deleteIcon from "../../images/icons/delete.svg";
import editIcon from "../../images/icons/edit.svg";
import personOutline from "../../images/icons/person-outline.svg";
import useSend from "../../hooks/useSend";

interface Props {
  project: IProject;
  setProject: any;
  history: any;
  removeProject: () => void;
}

const Project = ({ project, setProject, history, removeProject }: Props) => {
  const { user } = useGlobalContext();

  // Format the contributors message string
  const contribNum = new Set([
    ...project.team,
    ...project.admins,
    project.author,
  ]).size;
  const contribMessage = `${contribNum} contributor${
    contribNum > 1 ? "s" : ""
  }`;

  const { sendRequest: sendDelete } = useSend();

  // Only show buttons when admin or author
  const showControls =
    user.id === project.author || project.admins.includes(user.id);

  return (
    <div className="project" key={project._id}>
      <div className="project__header">
        <h3 className="project__name">{project.name}</h3>
        <div className="container">
          {showControls && (
            <div className="project__controls">
              <button
                aria-label="edit"
                onClick={() => {
                  setProject(project);
                  history.push(`/projects/${project._id}/edit`);
                }}
              >
                <img src={editIcon} alt="edit" />
              </button>
              <button
                onClick={() => {
                  //TODO : ask for confirmation and remove projects from projects displayed if no error
                  const confirm = window.confirm(
                    "Do you really want to delete"
                  );
                  if (confirm) {
                    removeProject();
                    sendDelete(`/projects/${project._id}`, "DELETE");
                  }
                }}
              >
                <img src={deleteIcon} alt="delete" aria-label="delete" />
              </button>
            </div>
          )}
          <div className="project__contrib">
            <img src={personOutline} alt="icon"></img>
            <span>{contribMessage}</span>
          </div>
        </div>
      </div>
      <p className="project__description">{project.description}</p>
      <button
        className="project__issues-open"
        onClick={() => {
          setProject(project);
          history.push(`/projects/${project._id}`);
        }}
      >
        {project.issues.length} issues
      </button>
    </div>
  );
};

export default Project;
