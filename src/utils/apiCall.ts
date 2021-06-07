export type Tmethod = "GET" | "POST" | "PUT" | "DELETE";

const apiCall = async (path: string, method: Tmethod, data: object) => {
  const baseUrl = process.env.REACT_APP_API_URL;

  //Set default headers and auth token
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${localStorage.token}`);

  const body = JSON.stringify(data);

  const requestOptions: RequestInit = {
    headers: myHeaders,
    method,
    body,
    redirect: "follow",
    mode: "cors",
  };

  return fetch(baseUrl + path, requestOptions);
};

export default apiCall;
