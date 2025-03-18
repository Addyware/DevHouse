import { html } from "hono/html";
import type { FC, PropsWithChildren } from "hono/jsx";
import { HtmlEscapedString } from "hono/utils/html";

const Head = () => {
  return (
    <head>
      <title>DevHouse</title>
      <meta
        name="viewport"
        content="initial-scale=1,maximum-scale=1,user-scalable=no"
      />
      {html` <script src="/static/script.js"></script> `}
      <link rel="stylesheet" href="/static/index.css" />
      <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css"
      />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    </head>
  );
};

export const Layout = ({
  children,
}: PropsWithChildren<{ script?: HtmlEscapedString }>) => {
  return (
    <html>
      <Head />
      <body>{children}</body>
      <script>hljs.highlightAll();</script>
    </html>
  );
};
