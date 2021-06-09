import React from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../hooks";
import { IProject } from "../types";
import { useGlobalContext } from "../utils/context";
import Project from "./Project";
import searchIcon from "../images/icons/search-outline.svg";

const ProjectList = () => {
  const [loading, response] = useFetch("/projects", "GET");
  let projects;
  const { setProject } = useGlobalContext();
  const history = useHistory();

  if (response) {
    projects = response.map((project: IProject) => {
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
          <button className="projects__new-button"
            onClick={() => {
              history.push("/projects/new");
            }}
          >
            New project
          </button>
          <div className="filters">
            <h2>Filters</h2>
            <div className="filters__search-input">
              <input type="text" placeholder="Name" aria-label="Project Name" />
              <img src={searchIcon} alt="search"></img>
            </div>
            <div className="filters__team-buttons">
              <button
                onClick={() => {
                  console.log("author");
                }}
              >
                Author
              </button>
              <button
                onClick={() => {
                  console.log("Admin");
                }}
              >
                Admin
              </button>
              <button
                onClick={() => {
                  console.log("Member");
                }}
              >
                Member
              </button>
            </div>
            <label className="filters__issues-open" htmlFor="checkbox">
              <input type="checkbox" name="issues_open" id="checkbox" />
              <span className="checkbox-label">Only with issues open</span>
            </label>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default ProjectList;
