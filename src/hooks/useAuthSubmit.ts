import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
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

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const data = JSON.stringify(state);
  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
    mode: "cors",
  };
  const onSubmit = async () => {
    setStatus("pending");
    try {
      const resp = await fetch(
        "http://localhost:5050/auth/" + type,
        requestOptions
      );
      const jsonData = await resp.json();
      setStatus("idle");

      if (!resp.ok) {
        // Show an error message on top of the form
        setMessage({ type: "error", message: jsonData.message });
      } else {
        const { token, user: receivedUser } = jsonData;
        setToken(token);
        console.log("Decoded Token :>> ", jwt_decode(token));
        localStorage.setItem("token", token);
        setUser(receivedUser);
        localStorage.setItem("user", receivedUser);
        //Set the user in a localStorage cookie
        setMessage(undefined);
        history.push("/projects");
      }
    } catch (error) {
      setMessage({ type: "error", message: error.message });
    }
  };
  return [status, message, user, jwtToken, onSubmit];
}

export default useAuthSubmit;
