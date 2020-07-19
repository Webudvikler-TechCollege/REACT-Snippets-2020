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
    <div style={{ background: "#ececec", padding: "1rem" }}>
      <h3>Dette er en component demonstration</h3>
      <p>Med MDX kan man lave React componenter i markdown</p>
      {props.children}
    </div>
  ),
};

const compTxt = 
`const components = {
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
};`;

const mdx = `
# Hello, world! h1
## Dette er en h2
<h1>LALALA h1</h1>
<Demo />
`;

const containerTxt = `
export default function MarkDownViewer(props) {
  return (
    <>
      <MDX components={components}>{mdx}</MDX>
      <hr />
      <p>Components til styling:</p>
      <pre style={{ fontFamily: "monospace" }}>{compTxt}</pre>
      <p>Originalt MarkDown:</p>
      <pre style={{ fontFamily: "monospace" }}>{mdx}</pre>
      <p>Container:</p>
      <pre style={{ fontFamily: "monospace" }}>{containerTxt}</pre>
    </>
  );
}
`
// const components = {
//     h1: ({ children, ...props }) => (
//       <h1 style={{ color: "tomato" }} {...props}>
//         {children}
//       </h1>
//     ),
//     Demo: (props) => (
//       <div style={{background: "#ececec", padding: "1rem"}}>
//         <h3>Dette er en component demonstration</h3>
//         <p>Med MDX kan man lave React componenter i markdown</p>
//         {props.children}
//       </div>
//     ),
// };

// export default function MarkDownViewer(props) {
//   return (
//     <>
//       <MDX components={components}>{mdx}</MDX>
//       <hr />
//       <p>Components til styling:</p>
//       <pre style={{ fontFamily: "monospace" }}>{compTxt}</pre>
//       <p>Originalt MarkDown:</p>
//       <pre style={{ fontFamily: "monospace" }}>{mdx}</pre>
//       {/* <pre style={{fontFamily: "monospace"}}>{JSON.stringify(components, null, 2)}</pre> */}
//       {/* <pre style={{fontFamily: "monospace"}}>{components.Demo.toString()}</pre> */}
//     </>
//   );
// }
export default function MarkDownViewer(props) {
  return (
    <>
      <MDX components={components}>{mdx}</MDX>
      <hr />
      <p>Components til styling:</p>
      <pre style={{ fontFamily: "monospace" }}>{compTxt}</pre>
      <p>Originalt MarkDown:</p>
      <pre style={{ fontFamily: "monospace" }}>{"const mdx = `" + mdx + "`;"}</pre>
      <p>Container:</p>
      <pre style={{ fontFamily: "monospace" }}>{containerTxt}</pre>
    </>
  );
}
