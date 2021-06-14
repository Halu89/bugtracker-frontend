import * as React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import { IIssue } from "../../types";
import { apiCall } from "../../utils";
import { useGlobalContext } from "../../utils/context";
import Issue from "./Issue";
import IssuesFilters from "./IssuesFilters";

export interface Props {}

const IssuesList: React.FC<Props> = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { currentProject, setCurrentProject } = useGlobalContext();
  const [issues, setIssues] = React.useState<IIssue[]>([]);
  const history = useHistory();

  //Populate the project in case we refresh
  React.useEffect(() => {
    if (currentProject) return;
    apiCall(`/projects/${projectId}/details`, "GET")
      .then((resp: any) => {
        return resp.json();
      })
      .then((d: any) => {
        setCurrentProject(d);
      });
  }, [currentProject, projectId, setCurrentProject]);

  const removeIssue = (id: string) => {
    setIssues(issues.filter((issue) => issue._id !== id));
  };

  // Load the issues from the server
  const [loading, response] = useFetch(`/projects/${projectId}`, "GET");
  React.useEffect(() => {
    if (response) {
      setIssues(response);
    }
  }, [response]);

  return (
    <div className="issues">
      <div className="container">
        <header className="issues__header">
          <h3>{currentProject?.name}</h3>
          <Link to={"/projects"} onClick={() => setCurrentProject(undefined)}>
            Back to projects
          </Link>
        </header>
        {loading && <div>Loading...</div>}
        <div className="issues__list">
          {issues.map((issue: IIssue) => {
            return (
              <Issue
                issue={issue}
                key={issue._id}
                removeIssue={() => removeIssue(issue._id)}
              />
            );
          })}
        </div>
      </div>
      <aside>
        <div className="container">
          <button
            className="issues__new-button"
            onClick={() => {
              history.push(`/projects/${projectId}/new`); // TODO
            }}
          >
            New Issue
          </button>
          <IssuesFilters />
        </div>
      </aside>
    </div>
  );
};

export default IssuesList;
