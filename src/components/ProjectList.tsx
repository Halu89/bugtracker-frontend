import { useHistory } from "react-router-dom";
import { useFetch } from "../hooks";
import { IProject } from "../types";
import { useGlobalContext } from "../utils/context";

const ProjectList = () => {
  const [loading, response, error] = useFetch(
    "http://localhost:5050/projects",
    "GET"
  );
  let projects;
  const { setProject } = useGlobalContext();
  const history = useHistory();
  if (response) {
    projects = response.map((project: IProject) => {
      return (
        <div
          key={project._id}
          onClick={() => {
            setProject(project);
            history.push(`/projects/${project._id}`);
          }}
        >
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>{project.issues.length} issues open</p>
        </div>
      );
    });
  }

  return (
    <main className="projects-container">
      {loading && <div className="loading">Loading...</div>}
      {projects}
    </main>
  );
};

export default ProjectList;
