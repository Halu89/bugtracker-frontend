import { useHistory } from "react-router-dom";
import useSend from "../../../hooks/useSend";
import { useGlobalContext } from "../../../utils/context";
import deleteIcon from "../../../images/icons/delete.svg";
import editIcon from "../../../images/icons/edit.svg";
import { IIssue } from "../../../types";

export interface IssueControlProps {
  issue: IIssue;
  removeIssue: () => void;
  showControls: boolean;
}

const IssueControls = ({
  issue,
  removeIssue,
  showControls,
}: IssueControlProps) => {
  const history = useHistory();

  const { sendRequest: sendDelete } = useSend();
  const { setIssue, currentProject } = useGlobalContext();

  return (
    <div className="issue__controls">
      <button
        title="Edit"
        aria-label="Edit"
        onClick={() => {
          setIssue(issue);
          history.push(`/projects/${currentProject?._id}/${issue?._id}/edit`);
        }}
      >
        <img src={editIcon} alt="edit" />
      </button>

      {showControls && (
        <button
          title="Delete"
          aria-label="Delete"        
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
      )}
    </div>
  );
};

export default IssueControls;
