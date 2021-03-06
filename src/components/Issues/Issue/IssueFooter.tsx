import { useState, useEffect } from "react";
import useSend from "../../../hooks/useSend";
import { IIssue } from "../../../types";
import { useGlobalContext } from "../../../utils/context";
import AssignedTo from "./AssignedTo";
import ManageAssign from "./ManageAssign";

const IssueFooter = ({
  issue,
  showControls,
  updateIssues,
}: {
  issue: IIssue;
  showControls: boolean;
  updateIssues: (issue: IIssue) => void;
}) => {
  const isOpen = issue.isOpen;
  const [showManage, setShowManage] = useState(false);
  const { user, currentProject } = useGlobalContext();
  const {
    sendRequest: sendOpenOrClose,
    response: openResp,
    status: openStatus,
  } = useSend();
  const {
    sendRequest: sendUsername,
    response: userResp,
    status: userStatus,
  } = useSend();
  // Is the issue assigned to the logged in User
  const toMe = issue.assignedTo.reduce((acc, el) => {
    if (user.id === el._id) return true;
    return acc;
  }, false);

  // Display a loading cursor if waiting for a server resp
  const { setCursor, cursor } = useGlobalContext();
  useEffect(() => {
    if (userStatus === "idle" && openStatus === "idle") {
      setCursor("auto");
    }

    if (openStatus === "pending" || userStatus === "pending") {
      setCursor("wait");
    }
  }, [openStatus, userStatus, setCursor]);

  // Sync the assignedTo with the backend
  useEffect(() => {
    if (userResp) {
      updateIssues(userResp as IIssue);
    }
  }, [userResp, updateIssues]);

  // Sync the issue open or close state with the backend server
  useEffect(() => {
    if (openResp) {
      updateIssues(openResp as IIssue);
    }
  }, [openResp, updateIssues]);

  return (
    <div className="issue__footer">
      <div className="container">
        <AssignedTo assignedTo={issue.assignedTo} />
        {showControls && (
          <button
            className="manage-assigns"
            onClick={() => {
              setShowManage((val) => !val);
            }}
          >
            Manage
          </button>
        )}
        <button
          style={{ cursor: cursor === "auto" ? "pointer" : "wait" }}
          className="take-issue"
          onClick={() => {
            if (userStatus === "pending") return;
            sendUsername(
              `/projects/${currentProject._id}/${issue._id}/${
                toMe ? "unassignUser" : "assignUser"
              }`,
              "PUT",
              { username: user.username }
            );
          }}
        >
          {toMe ? "Leave" : "Take"}
        </button>
        <button
          style={{ cursor: cursor === "auto" ? "pointer" : "wait" }}
          onClick={() => {
            if (openStatus === "pending") return;
            sendOpenOrClose(
              `/projects/${currentProject._id}/${issue._id}`,
              "PUT",
              {
                isOpen: !isOpen,
              }
            );
          }}
        >
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
      <ManageAssign
        showManage={showManage}
        setShowManage={setShowManage}
        issue={issue}
        updateIssues={updateIssues}
      />
    </div>
  );
};

export default IssueFooter;
