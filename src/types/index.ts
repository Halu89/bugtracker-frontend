export type stateType = { username: string; password: string; email: string };

export interface IUser {
  id: string;
  _id: string;
  username: string;
  email?: string;
  issues?: string[];
  projects?: string[];
}

export interface IProject {
  _id: string;
  name: string;
  description: string;
  author: IUser | string;
  issues: IIssue[] | string[];
  team: IUser[] | string[];
  admins: IUser[] | string[];
  createdAt: string;
  updatedAt: string;
}
export interface IIssue {
  _id: string;
  title: string;
  description: string;
  project: IProject | string;
  author: IUser;
  assignedTo: IUser[];
  statusText: string;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
}
export type Tstatus = "idle" | "pending";
export type RequestError = {
  statusCode: number;
  message: string;
  stack?: string;
};

export type Tmessage =
  | {
      type: "error" | "success";
      message: string;
    }
  | undefined;

export type TCustomHook = {
  status: Tstatus;
  message: Tmessage;
  user: IUser | undefined;
  token: string | undefined;
  submitForm: () => void;
};

export interface IFormState {
  username: string | false;
  email: string | false;
  password: string | false;
}

export type AuthLabels = "username" | "email" | "password";

export type HTTPMethods = "GET" | "POST" | "PUT" | "DELETE";
