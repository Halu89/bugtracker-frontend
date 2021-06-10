import * as React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useFetch } from "../../hooks";
import { IIssue } from "../../types";
import { apiCall } from "../../utils";
import { useGlobalContext } from "../../utils/context";
import Issue from "./Issue";
import searchIcon from "../../images/icons/search-outline.svg";

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
    return <Issue issue={issue} />;
  });

  return (
    <div className="issues-container">
      <header className="issues__header">
        <h3>{project?.name}</h3>
      </header>
      {loading && <div>Loading...</div>}
      <div className="issues__list">{issues}</div>
      <aside>
        <div className="container">
          <button
            className="issues__new-button"
            onClick={() => {
              // history.push("/projects/${projectId}/new"); // TODO
            }}
          >
            New Issue
          </button>
          <div className="filters">
            <h2>Filters</h2>

            <div className="filters__search__input">
              <header>
                <h3 className="filters__search__headers">Search by</h3>
              </header>
              <label htmlFor="title" className="title-filter">
                Title
                <input
                  type="text"
                  placeholder="Title"
                  id="title"
                  aria-label="Search by issue title"
                />
                <img src={searchIcon} alt="search"></img>
              </label>
              <label htmlFor="statusText" className="status-filter">
                Status text
                <input
                  type="text"
                  id="statusText"
                  placeholder="Status"
                  aria-label="Search by status text"
                />
                <img src={searchIcon} alt="search"></img>
              </label>
            </div>
            <label className="filters__issues-open" htmlFor="open-checkbox">
              <input type="checkbox" name="issues_open" id="open-checkbox" />
              <span className="checkbox-label">Show open issues</span>
            </label>
            <label className="filters__issues-closed" htmlFor="closed-checkbox">
              <input type="checkbox" name="issues_open" id="closed-checkbox" />
              <span className="checkbox-label">Show closed issues</span>
            </label>
            <label className="filters__toMe" htmlFor="toMe">
              <input type="checkbox" name="issues_open" id="toMe" />
              <span className="checkbox-label">Only issues assigned to me</span>
            </label>
          </div>
        </div>
      </aside>

      <Link to={"/projects"} onClick={() => setProject(undefined)}>
        Back
      </Link>
    </div>
  );
};

export default IssuesList;
