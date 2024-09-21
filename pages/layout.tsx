import type { FC } from "hono/jsx";
import { css, Style } from "hono/css";

export const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <Style>
          {css`
          html {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
          
        * {
          margin: 0;
          padding: 0;
        }

        body {
          background: #1a1a1a;
          color: #fff;
          margin: 30px;
        }
        `}
        </Style>
        <title>Registry Board</title>
      </head>
      <body>{props.children}</body>
    </html>
  );
};
