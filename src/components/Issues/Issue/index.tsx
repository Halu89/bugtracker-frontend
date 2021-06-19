import { IIssue } from "../../../types";

import { useGlobalContext } from "../../../utils/context";
import IssueControls from "./IssueControls";
import IssueFooter from "./IssueFooter";

interface IssueProps {
  issue: IIssue;
  removeIssue: () => void;
  manageAssignToMe: (id: string) => void;
  manageAssign: (issue: IIssue) => void;
}

const Issue: React.FC<IssueProps> = ({
  issue,
  removeIssue,
  manageAssignToMe,
  manageAssign,
}) => {
  const createdAt = new Date(issue.createdAt).toDateString();

  const { currentProject, user } = useGlobalContext();

  // Only show buttons when admin or author
  // Must handle the case when the project author is populated from mongo or not
  const showControls =
    user.id === currentProject?.author?._id ||
    currentProject?.admins.includes(user.id) ||
    user.id === currentProject?.author;

  return (
    <div className="issue" key={issue._id}>
      <header>
        <h3 className="issue__title">{issue.title}</h3>
        <IssueControls
          issue={issue}
          removeIssue={removeIssue}
          showControls={showControls}
        />
      </header>
      <p className="issue__subtitle">
        Opened on <span className="date">{createdAt}</span> by{" "}
        <span className="author">{issue?.author?.username}</span>
      </p>

      <p className="issue__description">{issue.description}</p>
      <IssueFooter
        issue={issue}
        showControls={showControls}
        manageAssignToMe={manageAssignToMe}
        manageAssign={manageAssign}
      />
    </div>
  );
};

export default Issue;
