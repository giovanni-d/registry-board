import { useRequestContext } from "hono/jsx-renderer";
import { Env } from "../types.ts";
import { createRegistryUrl } from "../lib.ts";
import { css } from "hono/css";

const listStyle = css`
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const itemStyle = css`
  padding: 10px 0;

  &:last-of-type {
    border-bottom: none;
  }

  border-bottom: 1px solid #cccccc71;
  width: fit-content;
`;

const infoStyle = css`
  font-style: italic;
  margin-top: 10px;
  display: flex;
  color: #cccccc71;
`;

type Repos = {
  repositories: string[];
};

export const RepoList = async () => {
  const config = useRequestContext<Env>().get("config");

  if (!config?.registryUrl) {
    return <span class={infoStyle}>Error with registry url!</span>;
  }

  try {
    const request = await fetch(
      createRegistryUrl(config.registryUrl, "/v2/_catalog"),
      { signal: AbortSignal.timeout(1000) },
    );
    const data: Repos = await request.json();

    return (
      <>
        <ul class={listStyle}>
          {data.repositories.map((repo, index) => (
            <li key={index} class={itemStyle}>{repo}</li>
          ))}
        </ul>
        <span class={infoStyle}>{data.repositories.length} repos found</span>
      </>
    );
  } catch (error) {
    if (error) {
      console.log(error);

      if (error.name === "TimeoutError") {
        return <span class={infoStyle}>Request timed out!</span>;
      }
    }

    return <span class={infoStyle}>Unable to retrieve repos!</span>;
  }
};
