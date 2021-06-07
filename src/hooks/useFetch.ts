import { useState, useEffect } from "react";
import { IIssue, IProject, RequestError } from "../types";
import { apiCall } from "../utils";

const useFetch = (
  url: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  data?: IIssue | IProject
) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState<RequestError>();

  useEffect(() => {
    setLoading(true);
    const sendReq = async () => {
      console.log("sending request"); // XXX
      try {
        const resp = await apiCall(url, method);
        setLoading(false);
        if (resp.status === 401) {
          return setError({ statusCode: 401, message: "Unauthorized" });
        }
        const jsonResp = await resp.json();
        if (!resp.ok) {
          console.log("Error from fetch", jsonResp);
          return setError(jsonResp.message);
        } else {
          return setResponse(jsonResp);
        }
      } catch (e) {
        return setError({ statusCode: 500, message: e.message });
      }
    };
    sendReq();
  }, [data, method, url]);

  return [loading, response, error];
};

export default useFetch;
