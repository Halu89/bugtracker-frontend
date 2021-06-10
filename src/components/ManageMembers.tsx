import React, { useState } from "react";
import useSend from "../hooks/useSend";
import TextInput from "./FormInputs";

const validate = (val: string) => {
  if (val) return false;
  return "You need to provide a username";
};
interface Props {
  projectId: string;
}
const ManageMembers = ({ projectId }: Props) => {
  const [displayBtn, setDisplayBTN] = useState(false);
  const [type, setType] = useState<"member" | "admin">("member");
  const { sendRequest } = useSend();
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | false>(false);

  const path = {
    add: type === "admin" ? "/addAdmin" : "/addUser",
    remove: type === "admin" ? "/removeAdmin" : "/removeUser",
  };

  const execute = (action: "add" | "remove") => {
    if (!username) return;

    sendRequest(`/projects/${projectId}${path[action]}`, "PUT", {
      username,
    });
  };
  console.log(projectId);
  return (
    <div className="manage-members">
      <button
        onClick={() => {
          setDisplayBTN(true);
          setType("member");
        }}
      >
        Manage members
      </button>
      <button
        onClick={() => {
          setDisplayBTN(true);
          setType("admin");
        }}
      >
        Manage admins
      </button>
      {displayBtn && (
        <>
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
          <button
            onClick={() => {
              execute("add");
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              execute("remove");
            }}
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
};

export default ManageMembers;
