import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks";
import { IProject, IUser } from "../../types";
import { useGlobalContext } from "../../utils/context";
import Project from "./Project";
import searchIcon from "../../images/icons/search-outline.svg";

type filtersType = {
  author: boolean;
  admins: boolean;
  issueOpen: boolean;
  member: boolean;
  name: string;
};

const applyFilters = (
  projectsArray: IProject[] & { team: string[]; admins: string[] },
  filters: filtersType,
  user: IUser
) => {
  let result = [...projectsArray];
  if (filters.author) {
    result = result.filter((proj) => {
      return proj.author !== user.id;
    });
  }
  if (filters.admins) {
    result = result.filter(
      (proj) => !(proj.admins as string[]).includes(user.id)
    );
  }
  if (filters.member) {
    result = result.filter(
      (proj) => !(proj.team as string[]).includes(user.id)
    );
  }
  if (filters.issueOpen) {
    result = result.filter((proj) => proj.issues.length > 0);
  }
  if (filters.name) {
    const reg = new RegExp(filters.name.toLowerCase());
    result = result.filter((proj) => proj.name.toLowerCase().match(reg));
  }
  return result;
};

const ProjectList = () => {
  const [loading, response] = useFetch("/projects", "GET");
  let projects;
  const { setProject, user } = useGlobalContext();
  const history = useHistory();
  const [filters, setFilters] = useState({
    author: false,
    admins: false,
    issueOpen: false,
    member: false,
    name: "",
  });

  if (response) {
    const displayedProjects = applyFilters(response, filters, user);
    projects = displayedProjects.map((project: IProject) => {
      return (
        <Project
          project={project}
          setProject={setProject}
          history={history}
          key={project._id}
        />
      );
    });
  }

  return (
    <main className="projects">
      {loading && <div className="loading">Loading...</div>}
      <section className="projects-container">{projects}</section>
      <aside>
        <div className="container">
          <button
            className="projects__new-button"
            onClick={() => {
              history.push("/projects/new");
            }}
          >
            New project
          </button>
          <div className="filters">
            <h2>Filters</h2>
            <div className="filters__search-input">
              <input
                type="text"
                placeholder="Name"
                aria-label="Project Name"
                onChange={(e) => {
                  const projectName = e.currentTarget.value;
                  setFilters({ ...filters, name: projectName });
                }}
                value={filters.name}
              />
              <img src={searchIcon} alt="search"></img>
            </div>
            <div className="filters__team-buttons">
              <button
                className={filters.author ? "active" : ""}
                onClick={() => {
                  setFilters({ ...filters, author: !filters.author });
                }}
              >
                Author
              </button>
              <button
                className={filters.admins ? "active" : ""}
                onClick={() => {
                  setFilters({ ...filters, admins: !filters.admins });
                }}
              >
                Admin
              </button>
              <button
                className={filters.member ? "active" : ""}
                onClick={() => {
                  setFilters({ ...filters, member: !filters.member });
                }}
              >
                Member
              </button>
            </div>
            <label className="filters__issues-open" htmlFor="checkbox">
              <input
                type="checkbox"
                name="issues_open"
                id="checkbox"
                onChange={() => {
                  setFilters({ ...filters, issueOpen: !filters.issueOpen });
                }}
              />
              <span className="checkbox-label">Only with issues open</span>
            </label>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default ProjectList;
