import type { FC } from "hono/jsx";
import { useRequestContext } from "hono/jsx-renderer";
import { RegistryForm } from "../components/registry-form.tsx";
import { Env } from "../types.ts";
import { RepoList } from "../components/repo-list.tsx";

export const Home: FC = () => {
  const config = useRequestContext<Env>().get("config");

  if (config) {
    return <RepoList />;
  }

  return <RegistryForm />;
};
