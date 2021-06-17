import { IUser } from "../../../types";

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

export default AssignedTo;
