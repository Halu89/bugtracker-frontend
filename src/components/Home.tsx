import React from "react";
import { useHistory } from "react-router-dom";

export interface Props {}

const Home: React.FC<Props> = () => {
  const history = useHistory();
  return (
    <section className="homepage">
      <div className="hero">
        <h1>
          Create a <span>project</span>
        </h1>
        <h1>
          Manage <span>tasks</span>
        </h1>
        <h1>
          Work in a <span>team</span>
        </h1>
      </div>
      <div className="cta">
        <button id="get-started" onClick={() => history.push("/register")}>
          Get started
        </button>
        <button id="learn-more" onClick={() => history.push("/docs")}>Learn more</button>
      </div>
    </section>
  );
};

export default Home;
