export type stateType = { username: string; password: string; email: string };

export interface IUser {
  username: string;
  email: string;
  issues: string[];
  projects: string[];
}
export type Tstatus = "idle" | "pending";
export type Tmessage =
  | {
      type: "error" | "success";
      message: string;
    }
  | undefined;

export type TCustomHook = [
  Tstatus,
  Tmessage,
  IUser | undefined,
  string | undefined,
  () => void
];
