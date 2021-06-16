import { IIssue, IUser } from "../../types";
import deleteIcon from "../../images/icons/delete.svg";
import editIcon from "../../images/icons/edit.svg";
import { useGlobalContext } from "../../utils/context";
import { useHistory } from "react-router";
import useSend from "../../hooks/useSend";
import { useEffect, useState } from "react";

export interface IssueControlProps {
  issue: IIssue;
  removeIssue: () => void;
}
interface IssueProps extends IssueControlProps {
  manageAssignToMe: (id: string) => void;
}

const Issue: React.FC<IssueProps> = ({
  issue,
  removeIssue,
  manageAssignToMe,
}) => {
  const createdAt = new Date(issue.createdAt).toDateString();

  const { currentProject, user } = useGlobalContext();

  // Only show buttons when admin or author
  // Must handle the case when the project author is populated from mongo or not
  const showControls =
    user.id === currentProject?.author?._id ||
    currentProject?.admins.includes(user.id) ||
    currentProject?.author;

  return (
    <div className="issue" key={issue._id}>
      <header>
        <h3 className="issue__title">{issue.title}</h3>
        {showControls && (
          <IssueControls issue={issue} removeIssue={removeIssue} />
        )}
      </header>
      <p className="issue__subtitle">
        Opened on <span className="date">{createdAt}</span> by{" "}
        <span className="author">{issue?.author?.username}</span>
      </p>

      <p className="issue__description">{issue.description}</p>
      <IssueFooter
        issue={issue}
        showControls={showControls}
        manageAssignToMe={manageAssignToMe}
      />
    </div>
  );
};

export default Issue;

const AssignedTo = ({ assignedTo }: { assignedTo: IUser[] }) => {
  let text;
  const usernames = assignedTo.map((obj) => obj.username);
  if (usernames.length > 3) {
    const [first, second, third] = [...usernames];

    text =
      [first, second, third].join(", ") + ` and ${usernames.length - 3} more`;
  } else if (usernames.length === 0) {
    text = "Nobody";
  } else {
    text = [...usernames].join(", ");
  }

  return <p className="issue__assignedTo">Assigned to : {text}</p>;
};

const IssueControls = ({ issue, removeIssue }: IssueControlProps) => {
  const history = useHistory();

  const { sendRequest: sendDelete } = useSend();
  const { setIssue, currentProject } = useGlobalContext();

  return (
    <div className="issue__controls">
      <button
        aria-label="edit"
        onClick={() => {
          setIssue(issue);
          history.push(`/projects/${currentProject?._id}/${issue?._id}/edit`);
        }}
      >
        <img src={editIcon} alt="edit" />
      </button>
      <button
        onClick={() => {
          //TODO : ask for confirmation and remove issue from issues displayed if no error
          if (window.confirm("Are you sure ?")) {
            removeIssue();
            sendDelete(
              `/projects/${currentProject._id}/${issue?._id}`,
              "DELETE"
            );
          }
        }}
      >
        <img src={deleteIcon} alt="delete" aria-label="delete" />
      </button>
    </div>
  );
};

const IssueFooter = ({
  issue,
  showControls,
  manageAssignToMe,
}: {
  issue: IIssue;
  showControls: boolean;
  manageAssignToMe: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(issue.isOpen);
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

  // Is the issue assigned to the logged in User
  const [toMe, setToMe] = useState(
    issue.assignedTo.reduce((acc, el) => {
      if (user.id === el._id) return true;
      return acc;
    }, false)
  );

  // Sync the assignedTo with the backend
  useEffect(() => {
    if (userResp) {
      manageAssignToMe(issue._id);
      setToMe((val) => !val);
    }
  }, [userResp, manageAssignToMe, issue._id]);

  // Sync the issue open or close state with the backend server
  useEffect(() => {
    if (openResp) {
      setIsOpen((isOpen) => !isOpen);
    }
  }, [openResp]);

  return (
    <div className="issue__footer">
      <AssignedTo assignedTo={issue.assignedTo} />
      {showControls && <button className="manage-assigns">Manage</button>}

      <button
        style={{ cursor: (cursor === "auto" ? "pointer" : "wait" )}}
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
        style={{ cursor: (cursor === "auto" ? "pointer" : "wait") }}
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
  );
};
