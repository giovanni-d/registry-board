import { css } from "hono/css";

const formStyle = css`
display: flex;
flex-direction: column;
width: 300px;
margin-top: 10px;
`;

const titleStyle = css`
margin-bottom: 4px;
`;

const fieldStyle = css`
border: none;
padding: 5px;
width: fit-content;
`;
const buttonStyle = css`
width: fit-content;
padding: 5px 10px;
border: none;
`;

export const RegistryForm = () => {
  return (
    <form action="/api/registry-url" method="post" class={formStyle}>
      <span class={titleStyle}>Registry Url</span>
      <div>
        <input
          type="text"
          placeholder="127.0.0.1:3000"
          name="registryUrl"
          class={fieldStyle}
        />
        <button type="submit" class={buttonStyle}>Save</button>
      </div>
    </form>
  );
};
