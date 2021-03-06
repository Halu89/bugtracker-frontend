import * as React from "react";
import { useCallback } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import { IIssue, IUser } from "../../types";
import { apiCall } from "../../utils";
import { useGlobalContext } from "../../utils/context";
import Issue from "./Issue";
import IssuesFilters from "./IssuesFilters";

export interface Props {}

export type filtersType = {
  title: string;
  statusText: string;
  openIssues: boolean;
  closedIssues: boolean;
  assignedToMe: boolean;
};

const applyFilters = (
  issuesArray: IIssue[],
  filters: filtersType,
  user: IUser
) => {
  let result = [...issuesArray];
  if (filters.title) {
    const titleReg = new RegExp(filters.title.toLowerCase());
    result = result.filter((issue) =>
      issue.title.toLowerCase().match(titleReg)
    );
  }
  if (filters.statusText) {
    const statusReg = new RegExp(filters.statusText.toLowerCase());
    result = result.filter((issue) => {
      if (!issue.statusText) return false;
      return issue.statusText.toLowerCase().match(statusReg);
    });
  }
  if (!filters.openIssues) {
    result = result.filter((issue) => !issue.isOpen);
  }
  if (!filters.closedIssues) {
    result = result.filter((issue) => issue.isOpen);
  }
  if (filters.assignedToMe) {
    result = result.filter((issue) =>
      issue.assignedTo.reduce((acc: boolean, el: IUser): boolean => {
        if (el._id === (user.id || user._id)) {
          return true;
        }
        return acc;
      }, false)
    );
  }
  return result;
};

const IssuesList: React.FC<Props> = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { currentProject, setCurrentProject, user } = useGlobalContext();
  const [issues, setIssues] = React.useState<IIssue[]>([]);
  const history = useHistory();

  const [filters, setFilters] = React.useState<filtersType>({
    title: "",
    statusText: "",
    openIssues: true,
    closedIssues: false,
    assignedToMe: false,
  });
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
    setIssues((issues) => issues.filter((issue) => issue._id !== id));
  };

  // Load the issues from the server
  const [loading, response] = useFetch(`/projects/${projectId}`, "GET");
  React.useEffect(() => {
    if (response) {
      setIssues(response);
    }
  }, [response]);

  const updateIssues = useCallback((newIssue) => {
    setIssues((issues) =>
      issues.map((original: IIssue) => {
        if (original._id === newIssue._id) {
          return {
            ...original,
            isOpen: newIssue.isOpen,
            assignedTo: newIssue.assignedTo,
          };
        }
        return original;
      })
    );
  }, []);

  const displayedIssues = applyFilters(issues, filters, user);

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
          {displayedIssues.map((issue: IIssue) => {
            return (
              <Issue
                issue={issue}
                key={issue._id}
                removeIssue={() => removeIssue(issue._id)}
                updateIssues={updateIssues}
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
              history.push(`/projects/${projectId}/new`);
            }}
          >
            New Issue
          </button>
          <IssuesFilters filters={filters} setFilters={setFilters} />
        </div>
      </aside>
    </div>
  );
};

export default IssuesList;
