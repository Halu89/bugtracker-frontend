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
  const [loading, response] = useFetch(`/projects/${projectId}`, "GET");
  const { project, setProject } = useGlobalContext();

  const history = useHistory();

  //Populate the project in case we refresh
  React.useEffect(() => {
    if (project) return;
    apiCall(`/projects/${projectId}/details`, "GET")
      .then((resp: any) => {
        return resp.json();
      })
      .then((d: any) => {
        console.log("project from useEffect : ", d);
        setProject(d);
      });
  }, [project, projectId, setProject]);

  const issues = response?.map((issue: IIssue) => {
    return <Issue issue={issue} key={issue._id} />;
  });

  return (
    <div className="issues">
      <div className="container">
        <header className="issues__header">
          <h3>{project?.name}</h3>
          <Link to={"/projects"} onClick={() => setProject(undefined)}>
            Back to projects
          </Link>
        </header>
        {loading && <div>Loading...</div>}
        <div className="issues__list">{issues}</div>
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
