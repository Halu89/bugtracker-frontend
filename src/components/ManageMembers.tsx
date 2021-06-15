import React, { useEffect, useState } from "react";
import useSend from "../hooks/useSend";
import { IUser } from "../types";

const validate = (val: string) => {
  if (val) return false;
  return "You need to provide a username";
};
interface Props {
  projectId: string | undefined;
  members: IUser[] | undefined;
  admins: IUser[] | undefined;
}
const ManageMembers = ({ projectId, members, admins }: Props) => {
  const [displayBtn, setDisplayBTN] = useState(false);
  const [type, setType] = useState<"member" | "admin">("member");
  const { sendRequest, error: reqError, status } = useSend();
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | false>(false);

  const [adminsArray, setAdminsArray] = useState<string[]>([]);
  useEffect(() => {
    if (admins) {
      setAdminsArray(admins.map((user) => user.username));
    }
  }, [admins]);

  const [memberArray, setMemberArray] = useState<string[]>([]);
  useEffect(() => {
    if (members) {
      setMemberArray(members.map((user) => user.username));
    }
  }, [members]);

  const path = {
    add: type === "admin" ? "/addAdmin" : "/addUser",
    remove: type === "admin" ? "/removeAdmin" : "/removeUser",
  };

  const execute = (action: "add" | "remove") => {
    if (!username) return;

    sendRequest(`/projects/${projectId}${path[action]}`, "PUT", {
      username,
    }).then(() => {
      //Update the interface
      setTouched(false);
      setError(false);

      setUsername("");
      if (type === "member") {
        if (action === "add") {
          // Avoid duplicates
          const newMembersArray = Array.from(
            new Set([...memberArray, username])
          );
          setMemberArray(newMembersArray);
        }
        if (action === "remove") {
          setMemberArray(memberArray.filter((name) => name !== username));
        }
      }
      if (type === "admin") {
        // Avoid duplicates
        if (action === "add") {
          const newArr = Array.from(new Set([...adminsArray, username]));
          setAdminsArray(newArr);
        }
        if (action === "remove") {
          setAdminsArray(adminsArray.filter((name) => name !== username));
        }
      }
    });
  };

  // Focus the username text input on showing manage member form
  useEffect(() => {
    if (displayBtn) {
      document.getElementById("username")?.focus();
    }
  }, [displayBtn]);

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
          {memberArray?.map((username) => (
            <span key={username} className="usertag">
              {username}{" "}
            </span>
          ))}
        </div>
        <div className="admins">
          Admins :{" "}
          {adminsArray.map((username) => (
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
