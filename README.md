# Issuetracker

This website uses the [bugtracker-backend](https://github.com/Halu89/bugtracker-backend)

### Get started

```
git clone https://github.com/Halu89/bugtracker-frontend.git
yarn install
yarn start
```

# Description

This project was built by Corentin Briand as a learning project to be able to track team projects, and issues related to those projects (kind of like Jira).

## Intentions

The objectives of this project were to learn Typescript, as well as learning and practicing with "advanced" React features such as custom Hooks, and the useCallback and useContext APIs.

## Tech stack

This website is coded with Typescript, and uses React and react-router-dom for the frontend, jwt for the authentication, and Sass for the styles.

# Features

## Authentication

The authentication is handled with JSON Web Tokens (JWT). On login, the user informations are sent to the server wich verify the credentials and returns a signed JWT. The token is then added to the Local Storage, and added to every subsequent requests. The server verifies that the token is there and hasn't been tampered with.

On the frontend, the main app component populates a user state in the global context, and secured routes are protected behing a higher order component that verifies that the user state is present, and redirects to a login page otherwise.

## Projects

On login, the user is redirected to the projects page, where he can see a list of all the projects he is a member of sorted by creation date, a button to create a new project, and a list of filters where he can filter by project title, by role, or only show the project with issues open.

Clicking on a project title or issues open button brings the user to that specific project issues list.

If the user has the appropriate permissions, he can see buttons to edit or delete the project.

### Projects Members

A project has 3 types of users associated with it: The author, admins, and members.

The user can modify the users associated with it by clicking on the Edit Project button from the project list.

Project Members can access and modify the project's issues.

Admins and author can edit or delete the project, add or remove members and admins from a project, and access, modify and delete issues

## Issues

On the issues page, the user can see a list of all the issues associated with a specific project, a button to create a new issue, and a list of filters.

The issues have a title, a description, a status text, and users assigned to that issue.

Project members can create and modify issues, for instance updating the status text to "Work in progress", then later closing the issue once the issue has been resolved. They can also assign or remove themselves from an issue.

Project admins and author can delete issues, and assign or remove other users from an issue.

### Filters

The users can filter the issues list by issue name, status text, show only the open or closed issues, or only see the issues assigned to them.
