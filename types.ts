import { Config } from "./lib.ts";

type Variables = {
  config: Config | undefined;
};

export type Env = {
  Variables: Variables;
};
