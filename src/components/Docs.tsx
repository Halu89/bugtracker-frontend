import newProject from "../images/tutorial/new_project.png";
import firstProject from "../images/tutorial/first_project.png";
import editProject from "../images/tutorial/edit_project.png";
import addAdmin from "../images/tutorial/add_admin.png";
import addMember from "../images/tutorial/add_member.png";
import afterProjectEdit from "../images/tutorial/After_project_edit.png";
import firstIssue from "../images/tutorial/first_issue.png";
import issueFromMember from "../images/tutorial/issue_from_member.png";
import projectFromMember from "../images/tutorial/project_from_member.png";
import statusUpdated from "../images/tutorial/status_updated.png";
import teamRecap from "../images/tutorial/team_recap.png";

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
            <a href="#conclusion">Conclusion</a>
          </li>
        </ul>
        {/* <button>Back to top</button> */}
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
              of all the project's members and admins, as well as add or remove
              users from our project.
            </p>
            <img src={editProject} alt="" />
            <p>Since we're here, let's add a user to our project</p>
            <p>
              I click on the members button, and I can add a new user to my team
            </p>
            <img src={addMember} alt="" />
            <p>
              Might aswell add an admin too. Let's click on the admins button
              and add an admin to our project.
            </p>
            <img src={addAdmin} alt="" />
            <p>
              As you can see, our new team additions are reflected on the Team
              display.
            </p>
            <img src={teamRecap} alt="" />
            <p>
              To remove a user from the project, nothing more simple, just click
              on the admins or members button, write a username, and click
              remove.
            </p>
            <p>
              Ok, we made our edit to the project's description, and you can see
              that our project now has 3 contributors listed.
            </p>
            <img src={afterProjectEdit} alt="" />
          </section>
          <section id="issues">
            <h3>Issues</h3>
            <p>
              Time to create our first issue. Click on the issues button, and
              you're now on your project's page.
            </p>
            <p>
              Here you can see all the issues you created associated with that
              project, filter them by name, status text, etc.
            </p>
            <p>
              Let's create our first issue. Just like before with the project,
              click on the new issue button, and give a title and a description.
            </p>
            <p>
              Okay, our first issue is created. Just like projects, I can edit,
              or delete the issue, but as the project's author, I can also
              manage the members assigned to my issue, or close it.
            </p>
            <img src={firstIssue} alt="" />
            <p>
              To assign someone to the issue, I just need to click manage, and
              like before, provide a username. Let's put a cookie specialist on
              the case.
            </p>
            <p>
              Let's also update the status of the issue. To do that, I click on
              the edit button, and simply write my status and click submit.
            </p>
            <img src={statusUpdated} alt="" />
            <p>
              You're free to have status as diverse as you want, but a good idea
              might be to have a few predetermined status you can use to
              communicate with your team, like :
            </p>
            <ul>
              <li>Just started</li>
              <li>Waiting for tests</li>
              <li>Ready to deploy</li>
              <li>etc...</li>
            </ul>
            <p>
              Rudolph is only a team member. As such, he can't assign or delete
              issues, here's what a project on his projects page looks like.
            </p>
            <img src={projectFromMember} alt="" />
            <p>
              And here's the issues page. As you can see, he can still edit
              issues to update the status, assign or remove himself from an
              issue, close an issue, or create a new one, but he can't manage
              users assigned to the issue, or delete one.
            </p>
            <img src={issueFromMember} alt="" />
          </section>
          <section id="conclusion">
            <h2>Conclusion</h2>
            <p>
              If you have any questions, feel free to email me at
              corentin.briand@gmail.com. I'm also looking for a job, and you can
              see all my recent projects{" "}
              <a href="http://cbriand.fr" id="portfolio">
                on my personal website
              </a>
            </p>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Docs;
