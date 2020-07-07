import React from "react";
import MDX from "@mdx-js/runtime";

// Lav custom components til markdown elementer
const components = {
  h1: ({ children, ...props }) => (
    <h1 style={{ color: "tomato" }} {...props}>
      {children}
    </h1>
  ),
  Demo: (props) => (
    <div style={{background: "#ececec", padding: "1rem"}}>
      <h3>Dette er en component demonstration</h3>
      <p>Med MDX kan man lave React componenter i markdown</p>
      {props.children}
    </div>
  ),
};

const mdx = `
  # Hello, world!
  <h1>LALALA</h1>
  <Demo />
`;

export default function MarkDownViewer(props) {
  return (
    <>
      <MDX components={components}>
        {mdx}
      </MDX>
      <hr/>
      <p>Originalt MarkDown:</p>
      <pre style={{fontFamily: "monospace"}}>{mdx}</pre>
    </>
  );
}
