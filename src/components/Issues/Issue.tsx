import { useState } from "react";
import { IIssue } from "../../types";
import deleteIcon from "../../images/icons/delete.svg";
import editIcon from "../../images/icons/edit.svg";
import { useGlobalContext } from "../../utils/context";
import { useHistory } from "react-router";
import useSend from "../../hooks/useSend";

export interface IssueProps {
  issue: IIssue;
}

const Issue: React.FC<IssueProps> = ({ issue }) => {
  // const [showControls, setControls] = useState(true);
  const createdAt = new Date(issue.createdAt).toDateString();

  const { setIssue, project, user } = useGlobalContext();
  const history = useHistory();

  const { sendRequest: sendDelete } = useSend();

  // Only show buttons when admin or author
  // Must handle the case when the project author is populated from mongo or not
  const showControls =
    user.id === project?.author?._id ||
    project?.admins.includes(user.id) ||
    project.author;

  return (
    <div className="issue" key={issue._id}>
      <header>
        <h3 className="issue__title">{issue.title}</h3>
        {showControls && (
          <div className="issue__controls">
            <button
              aria-label="edit"
              onClick={() => {
                setIssue(issue);
                history.push(`/projects/${project?._id}/${issue?._id}/edit`);
              }}
            >
              <img src={editIcon} alt="edit" />
            </button>
            <button
              onClick={() => {
                //TODO : ask for confirmation and remove issue from issues displayed if no error
                sendDelete(`/projects/${project._id}/${issue?._id}`, "DELETE");
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
