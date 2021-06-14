import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks";
import { IProject, IUser } from "../../types";
import { useGlobalContext } from "../../utils/context";
import Project from "./Project";
import ProjectFilters from "./ProjectFilters";

export type filtersType = {
  author: boolean;
  admins: boolean;
  issueOpen: boolean;
  member: boolean;
  name: string;
};

const applyFilters = (
  projectsArray: IProject[],
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
  //Load the user projects
  const [loading, response] = useFetch("/projects", "GET");
  useEffect(() => {
    if (response) {
      setProjects(response);
    }
  }, [response]);

  const [projects, setProjects] = useState<IProject[]>([]);
  const { setCurrentProject, user } = useGlobalContext();
  const history = useHistory();
  const [filters, setFilters] = useState({
    author: false,
    admins: false,
    issueOpen: false,
    member: false,
    name: "",
  });

  const removeProject = (id: string) => {
    setProjects(projects.filter((proj) => proj._id !== id));
  };

  //Apply the filters
  const displayedProjects = applyFilters(projects, filters, user);

  return (
    <main className="projects">
      {loading && <div className="loading">Loading...</div>}
      <section className="projects-container">
        {displayedProjects.map((project: IProject) => {
          return (
            <Project
              project={project}
              setProject={setCurrentProject}
              history={history}
              key={project._id}
              removeProject={() => removeProject(project._id)}
            />
          );
        })}
      </section>
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
          <ProjectFilters filters={filters} setFilters={setFilters} />
        </div>
      </aside>
    </main>
  );
};

export default ProjectList;
