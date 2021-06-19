import { useEffect, useState } from "react";
import useSend from "../../../hooks/useSend";
import { IIssue } from "../../../types";
import { useGlobalContext } from "../../../utils/context";

export interface ManageAssignProps {
  showManage: boolean;
  issue: IIssue;
  manageAssign: (issue: IIssue) => void;
  setShowManage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManageAssign: React.FC<ManageAssignProps> = ({
  showManage,
  setShowManage,
  issue,
  manageAssign,
}) => {
  const { cursor, setCursor } = useGlobalContext();
  const [username, setUsername] = useState("");
  const { response, sendRequest, status, error } = useSend();

  const manage = (op: "ADD" | "REMOVE") => {
    if (status === "pending") return;
    sendRequest(
      `/projects/${issue.project}/${issue._id}/${
        op === "REMOVE" ? "un" : ""
      }assignUser`,
      "PUT",
      {
        username,
      }
    );
    return "hello";
  };

  // Display a loading cursor if waiting for a server resp
  useEffect(() => {
    if (status === "idle") {
      setCursor("auto");
    }
    if (status === "pending") {
      setCursor("wait");
    }
  }, [setCursor, status]);

  // Sync the assignedTo with the backend
  useEffect(() => {
    if (response) {
      //Replace the issue with the response
      manageAssign(response as IIssue);
      setUsername("");
    }
  }, [response, manageAssign]);

  return (
    <div className={"issue__manage-assign " + (showManage ? "show" : "")}>
      <div className="inner">
        {error && <div className="error-message">{error.message}</div>}
        {/* <div className="error-message">Missing data</div> */}
        <label htmlFor="assign-username">
          Username :
          <input
            type="text"
            id="assign-username"
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
          />
        </label>
        <button
          style={{ cursor: cursor === "auto" ? "pointer" : "wait" }}
          onClick={() => manage("ADD")}
        >
          Add
        </button>
        <button
          style={{ cursor: cursor === "auto" ? "pointer" : "wait" }}
          onClick={() => manage("REMOVE")}
        >
          Remove
        </button>
        <button
          // style={{ marginLeft: "auto" }}
          onClick={() => setShowManage(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ManageAssign;
