import { IIssue } from "../../types";

export interface IssueProps {
  issue: IIssue;
}

const Issue: React.FC<IssueProps> = ({ issue }) => {
  return (
    <div className="issue" key={issue._id}>
      <h3 className="issue__title">{issue.title}</h3>
      <p className="issue__author">Created by {issue.author.username}</p>
      <p className="issue__description">Description :{issue.description}</p>
    </div>
  );
};

export default Issue;
