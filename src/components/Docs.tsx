import newProject from "../images/tutorial/new_project.png";
import firstProject from "../images/tutorial/first_project.png";

const Docs = () => {
  return (
    <div className="docs">
      <aside className="sidenav">
        <ul>
          <li>
            <a href="#intro">Intro</a>
          </li>
          <li>
            <a href="#features">Features</a>
            <ul className="sublist">
              <li>
                <a href="#auth">Authentication</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#issues">Issues</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#features">Tech Stack</a>
          </li>
        </ul>
      </aside>
      <div className="docs__main">
        <h1>Documentation</h1>
        <section id="intro">
          <h2 id="intro">Intro</h2>
          <p>
            This project was built by Corentin Briand as a learning project to
            be able to track team projects, and issues related to those projects
            (kind of like Jira).
          </p>
          <p>
            You can view the source code on{" "}
            <a href="https://github.com/Halu89/bugtracker-frontend">Github</a>
          </p>
          <p>
            The objectives of this project were to learn Typescript, as well as
            learning and practicing with "advanced" React features such as
            custom Hooks, and the useCallback and useContext APIs.
          </p>
          <p>
            This website is coded with Typescript, and uses React and
            react-router-dom for the frontend, jwt for the authentication, and
            Sass for the styles.
          </p>
        </section>
        <section id="features">
          <h2>Features</h2>
          <section id="auth">
            <h3>Authentication</h3>
            <p>
              To use this website, you need to create an account by clicking on
              the "Register" button. As it is a learning project, your email
              adress is not used for anything and you can use a dummy adress (It
              still needs to be unique and look like a regular adress).
            </p>
            <p>
              Similarly, I volontarily have not added password restriction, and
              you're free to use a 1 character password if you want.
            </p>
          </section>
          <section id="projects">
            <h3>Projects</h3>
            <p>
              Once you login, you get redirected to the projects page, which is
              empty for now. You can create a project by clicking on the aptly
              named button
            </p>
            <h4>Create a project</h4>
            <p>Let's create a new project ✨!</p>
            <p>
              Once you clicked on the new project button, you can enter a name
              and a description for your project
            </p>
            <img src={newProject} alt="" className="tutorial-img" />
            <p>
              Click submit, and that's it, you made your first project, and we
              can see it in the projects page 🎈🎈.
            </p>
            <img src={firstProject} alt="" className="tutorial-img" />
            <p>
              For now, you are the only contributor and there isn't any issues
              associated with that project
            </p>
            <h4>Edit a project</h4>
            <p>
              Woops, we only want 1 exclamation mark in the description. Let's
              change the project by clicking on the green edit button
            </p>
            <p>
              There, we can edit our project title, description, and see a list
              of all the project members and admins, as well as add or remove
              users from our project.
            </p>
          </section>
          <section id="issues">
            <h3>Issues</h3>
            <p>
              The authentication is handled with JSON Web Tokens (JWT). On
              login, the user informations are sent to the server wich verify
              the credentials and returns a signed JWT. The token is then added
              to the Local Storage, and added to every subsequent requests. The
              server verifies that the token is there and hasn't been tampered
              with.
            </p>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Docs;
