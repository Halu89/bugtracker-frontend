import { useState } from "react";
import { IIssue } from "../../types";
import deleteIcon from "../../images/icons/delete.svg";
import editIcon from "../../images/icons/edit.svg";

export interface IssueProps {
  issue: IIssue;
}

const Issue: React.FC<IssueProps> = ({ issue }) => {
  const [showControls, setControls] = useState(true);
  const createdAt = new Date(issue.createdAt).toDateString();
  return (
    <div className="issue" key={issue._id}>
      <header>
        <h3 className="issue__title">{issue.title}</h3>
        {showControls && (
          <div className="issue__controls">
            <button
              aria-label="edit"
              onClick={() => {
                // setProject(project);
                // history.push(`/projects/${project._id}/edit`);
              }}
            >
              <img src={editIcon} alt="edit" />
            </button>
            <button
              onClick={() => {
                //TODO : ask for confirmation and remove projects from projects displayed if no error
                // sendDelete(`/projects/${project._id}`, "DELETE");
              }}
            >
              <img src={deleteIcon} alt="delete" aria-label="delete" />
            </button>
          </div>
        )}
      </header>
      <p className="issue__subtitle">
        Opened on <span className="date">{createdAt}</span> by{" "}
        <span className="author">{issue.author.username}</span>
      </p>

      <p className="issue__description">{issue.description}</p>
      <p className="issue__assignedTo">
        Assigned to :{" "}
        {issue.assignedTo.length ? issue.assignedTo.join(", ") : "Nobody"}
      </p>
    </div>
  );
};

export default Issue;
