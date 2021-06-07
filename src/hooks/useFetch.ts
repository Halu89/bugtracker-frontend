import { useState, useEffect } from "react";
import { IIssue, IProject } from "../types";

const useFetch = (
  url: string,
  method: "POST" | "GET" | "UPDATE" | "DELETE",
  data?: IIssue | IProject
) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();

  useEffect(() => {
    const sendReq = async () => {
      setLoading(true);
      console.log("sending request");
      let body;
      if (data) {
        body = JSON.stringify(data);
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${localStorage.token}`);
      const requestOptions: RequestInit = {
        method: method,
        headers: myHeaders,
        body: body,
        redirect: "follow",
        mode: "cors",
      };
      try {
        const resp = await fetch(url, requestOptions);
        setLoading(false);
        if (resp.status === 401) {
          return setResponse("Unauthorized");
        }
        const jsonResp = await resp.json();
        if (!resp.ok) {
          return setResponse(jsonResp.message);
        } else {
          return setResponse(jsonResp);
        }
      } catch (error) {
        return setResponse(error);
      }
    };
    sendReq();
  }, [data, method, url]);

  return [loading, response];
};

export default useFetch;

// [boolean, any, (data?: IIssue | IProject) => void]
