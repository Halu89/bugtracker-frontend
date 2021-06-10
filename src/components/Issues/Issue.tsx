import { IIssue } from "../../types";
import IssuesFilter from "./IssuesFilters";

export interface IssueProps {
  issue: IIssue;
}

const Issue: React.FC<IssueProps> = ({ issue }) => {
  return (
    <div className="issue" key={issue._id}>
      <header>
        <h3 className="issue__title">{issue.title}</h3>
        <p>
          Opened on {issue.createdAt} by {issue.author.username}
        </p>
      </header>
      <p className="issue__description">Description :{issue.description}</p>
      <p>
        Assigned to :{" "}
        {issue.assignedTo.length ? issue.assignedTo.join(", ") : "Nobody"}
      </p>
    </div>
  );
};

export default Issue;
