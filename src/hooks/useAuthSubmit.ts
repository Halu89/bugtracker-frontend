import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { apiCall } from "../utils/";
//Types
import { stateType, TCustomHook, Tstatus, Tmessage, IUser } from "../types";

function useAuthSubmit(
  type: "signin" | "signup",
  state: stateType
): TCustomHook {
  const [status, setStatus] = useState<Tstatus>("idle");
  const [message, setMessage] = useState<Tmessage>();
  const [user, setUser] = useState<IUser | undefined>();
  const [jwtToken, setToken] = useState<string | undefined>();
  const history = useHistory();

  const submitForm = async () => {
    setStatus("pending");
    try {
      const resp = await apiCall(`/auth/${type}`, "POST", state);
      const jsonData = await resp.json();
      setStatus("idle");

      if (!resp.ok) {
        // Show an error message on top of the form
        setMessage({ type: "error", message: jsonData.message });
      } else {
        const { token, user: receivedUser } = jsonData;
        setToken(token);
        console.log("Decoded Token :>> ", jwt_decode(token)); // XXX
        localStorage.setItem("token", token);
        console.log(receivedUser); //XXX
        setUser(receivedUser);
        setMessage(undefined);
        history.push("/projects");
      }
    } catch (error) {
      setMessage({ type: "error", message: error.message });
    }
  };
  return [status, message, user, jwtToken, submitForm];
}

export default useAuthSubmit;
