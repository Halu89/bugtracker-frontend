import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks";
import { IIssue } from "../types";
import { useGlobalContext } from "../utils/context";

export interface Props {}

const Project: React.FC<Props> = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [loading, response] = useFetch(`/projects/${projectId}`, "GET");
  const { project, setProject } = useGlobalContext();

  let issues;
  console.log("Issues", response); // XXX
  if (response) {
    issues = response.map((issue: IIssue) => {
      return (
        <div className="issue" key={issue._id}>
          <h3 className="issue__title">{issue.title}</h3>
          <p className="issue__author">Created by {issue.author.username}</p>
          <p className="issue__description">Description :{issue.description}</p>
        </div>
      );
    });
  }
  return (
    <div className="issues-container">
      <h3>{project?.name}</h3>
      {loading && <div>Loading...</div>}
      {issues}
      <Link to={"/projects"} onClick={() => setProject(undefined)}>
        Back
      </Link>
    </div>
  );
};

export default Project;
