import React from "react";
// import MDX from "@mdx-js/runtime";
// import ErrorBoundary from "../../Contexts/ErrorBoundary";
import Editor from "rich-markdown-editor";
import { debounce } from "lodash";
import styles from "./MarkDownEditor.module.scss";
import { useHistory } from "react-router-dom";
import { routePaths } from "../../Router/routes";
import md from "./md.js";



const MDContainer = () => {
  const [readOnly, setReadOnly] = React.useState(true);
  const [content, setContent] = React.useState(null);
  const history = useHistory();
  // const location = useLocation();
  // location.
  const handleChange = debounce((value) => {
    const text = value();
    // console.log(text);
    localStorage.setItem("saved", text);
    setContent(text);
  }, 250);

  React.useEffect(() => {
    if (content === null) {
      const saved = localStorage.getItem("saved");
      if (saved) {
        setContent(saved);
      } else {
        setContent(md);
      }
    }
  }, [content, setContent]);

  return (
    <section className={styles.container}>
      {/* <MDEditor setContent={setContent} content={content} /> */}
      <div className={styles.toolsContainer}>
        <button
          className={styles.changeBtn}
          onClick={() => setReadOnly((ro) => !ro)}
        >
          {readOnly ? "Ændre" : "Gem"}
        </button>
      </div>
      <div className={styles.editorContainer}>
        {typeof content === "string" && (
          <Editor
            readOnly={readOnly}
            defaultValue={content}
            onChange={handleChange}
            onClickLink={(href) => {
              const route = "/" + href.split("/")[3];
              const rootUrl = "http://localhost:3000/";
              if (
                route &&
                href.includes(rootUrl) &&
                (route === "/" || routePaths.has(route))
              ) {
                // Bruger react router til interne routes for ikke at reload'e siden
                history.push(route);
              } else {
                // Bruger hård redirect til at forbi gå react router
                // ellers kunne følgende url opstå: http://localhost:3000/www.google.dk
                window.location.href = href;
              }
            }}
            uploadImage={(file) => {
              console.log("File upload triggered: ", file);

              // Delay to simulate time taken to upload
              return new Promise((resolve) => {
                setTimeout(
                  () => resolve("https://loremflickr.com/1000/1000"),
                  1500
                );
              });
            }}
          />
        )}
      </div>
    </section>
  );
};

export default MDContainer;
