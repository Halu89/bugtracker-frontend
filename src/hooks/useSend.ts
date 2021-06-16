import { useState } from "react";
import { apiCall } from "../utils/";

//Types
import { Tstatus, HTTPMethods, IIssue, IProject, RequestError } from "../types";

function useSend() {
  const [status, setStatus] = useState<Tstatus>("idle");
  const [response, setResponse] = useState<IProject | IIssue>();
  const [error, setError] = useState<RequestError>();

  const sendRequest = async (
    path: string,
    method: HTTPMethods,
    data?: object
  ) => {
    setStatus("pending");
    setResponse(undefined);
    setError(undefined);
    try {
      const resp = await apiCall(path, method, data);
      const jsonData = await resp.json();
      setStatus("idle");

      if (!resp.ok) {
        setError(jsonData);
      } else {
        setResponse(jsonData);
      }
    } catch (e) {
      setStatus("idle");
      setError({ statusCode: 500, message: e.message });
    }
  };
  return { status, response, error, sendRequest };
}

export default useSend;
