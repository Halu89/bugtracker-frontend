import React, { useEffect, useReducer, useState } from "react";
import useSend from "../hooks/useSend";
import { IProject } from "../types";

const validate = (val: string) => {
  if (val) return false;
  return "You need to provide a username";
};
interface Props {
  project: IProject | undefined;
}

type Init = {
  type: string;
  payload: IProject;
};

type Manage = {
  type: string;
  payload: string;
};

function reducer(
  state: { members: Set<string>; admins: Set<string> },
  action: Init | Manage
): any {
  switch (action.type) {
    case "INIT": {
      const { team, admins } = action.payload as IProject;
      return {
        ...state,
        members: new Set(team.map((user: any) => user.username)),
        admins: new Set(admins.map((user: any) => user.username)),
      };
    }

    case "ADD_MEMBER": {
      const username = action.payload as string;
      return { ...state, members: state.members.add(username) };
    }
    case "REMOVE_MEMBER": {
      const username = action.payload as string;
      const newSet = new Set(state.members);
      newSet.delete(username);
      return { ...state, members: newSet };
    }
    case "ADD_ADMIN": {
      const username = action.payload as string;
      return { ...state, admins: state.admins.add(username) };
    }
    case "REMOVE_ADMIN": {
      const username = action.payload as string;
      const newSet = new Set(state.admins);
      newSet.delete(username);
      return { ...state, admins: newSet };
    }
    default:
      return state;
  }
}

const ManageMembers = ({ project }: Props) => {
  const [displayBtn, setDisplayBTN] = useState(false);
  const [type, setType] = useState<"member" | "admin">("member");
  const { sendRequest, error: reqError, status } = useSend();
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | false>(false);

  const [state, dispatch] = useReducer(reducer, { members: [], admins: [] });

  useEffect(() => {
    if (project) {
      dispatch({ type: "INIT", payload: project });
    }
  }, [project]);

  const path = {
    add: type === "admin" ? "/addAdmin" : "/addUser",
    remove: type === "admin" ? "/removeAdmin" : "/removeUser",
  };

  const membersArray: string[] = Array.from(state.members);
  const adminsArray: string[] = Array.from(state.admins);

  const execute = (action: "add" | "remove") => {
    if (!username) return;

    const dispatchType =
      action === "add"
        ? type === "admin"
          ? "ADD_ADMIN"
          : "ADD_MEMBER"
        : type === "admin"
        ? "REMOVE_ADMIN"
        : "REMOVE_MEMBER";

    sendRequest(`/projects/${project?._id}${path[action]}`, "PUT", {
      username,
    }).then((resp) => {
      // resp is only defined if we didn't get an error
      if (resp) {
        dispatch({ type: dispatchType, payload: username });
        setTouched(false);
        setError(false);
        setUsername("");
      }
    });
  };

  // Focus the username text input on showing manage member form
  useEffect(() => {
    if (displayBtn) {
      document.getElementById("username")?.focus();
      setTouched(false);
    }
  }, [displayBtn, type]);

  // Input custom styles depending on validation
  useEffect(() => {
    const inputClass = document.getElementById("username")?.classList;
    inputClass?.remove("valid");
    inputClass?.remove("invalid");

    if (touched && error) {
      inputClass?.add("invalid");
    }
    if (touched && !error) {
      inputClass?.add("valid");
    }
  }, [error, touched]);

  return (
    <div className="manage-members">
      <div className="project__members">
        <div className="members">
          Members :{" "}
          {membersArray.map((username) => (
            <span key={username} className="usertag">
              {username}{" "}
            </span>
          ))}
        </div>
        <div className="admins">
          Admins :{" "}
          {adminsArray?.map((username: string) => (
            <span key={username} className="usertag">
              {username}
            </span>
          ))}
        </div>
      </div>
      <div
        className="controls"
        style={
          type === "admin"
            ? { border: "1px solid #c21b1b" }
            : { border: "1px solid #004e17" }
        }
      >
        <h2
          style={
            displayBtn
              ? type === "admin"
                ? { color: "#c21b1b" }
                : { color: "#004e17" }
              : { color: "black" }
          }
        >
          {displayBtn ? (type === "admin" ? "Admins" : "Members") : "Manage : "}
        </h2>
        <div className="container">
          <button
            id="members"
            onClick={() => {
              if (type === "member" || displayBtn === false) {
                setDisplayBTN(!displayBtn);
              }
              setType("member");
            }}
          >
            Members
          </button>
          <button
            id="admins"
            onClick={() => {
              if (type === "admin" || displayBtn === false) {
                setDisplayBTN(!displayBtn);
              }
              setType("admin");
            }}
          >
            Admins
          </button>
        </div>

        {displayBtn && (
          <form>
            {reqError && <div className="error">{reqError.message}</div>}
            {status === "pending" && (
              <div className="sending">Sending to the server</div>
            )}
            <label htmlFor="username">
              Username:
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setTouched(true);
                  setUsername(e.currentTarget.value);
                }}
                onBlur={(e) => {
                  setTouched(true);
                  setError(validate(username));
                }}
              />
              <span>{touched && error}</span>
            </label>
            <div className="container">
              <button
                className={type}
                onClick={(e) => {
                  e.preventDefault();
                  execute("add");
                }}
              >
                Add
              </button>
              <button
                className={type}
                onClick={(e) => {
                  e.preventDefault();
                  execute("remove");
                }}
              >
                Remove
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ManageMembers;
