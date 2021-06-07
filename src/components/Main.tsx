import React, { useCallback, useEffect, useMemo } from "react";
import { useFetch } from "../hooks";
import { IProject } from "../types";

const Main = () => {
  const [loading, response] = useFetch("http://localhost:5050/projects", "GET");
  let projects;
  console.log("response", response);

  if (response) {
    projects = response.map((project: IProject) => {
      return (
        <div key={project._id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>{project.issues.length} issues open</p>
        </div>
      );
    });
  }

  return (
    <main className="projects">
      {loading && <div className="loading">Loading...</div>}
      {projects}
    </main>
  );
};

export default Main;
