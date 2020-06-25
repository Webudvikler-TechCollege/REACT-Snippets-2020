import React from "react";
import Styles from "./SusDevGoals.module.scss";
import useFetch from "use-http";

// Hent parametre
const getParams = (url) => {
  // Grimt hack til at give en default hvis url'en er tomt.
  // BRUG IKKE DEN HER!!
  if (!url) {
    return { id: 2 };
  }
  return url
    .split("?")[1]
    .split("&")
    .reduce((obj, keyvals) => {
      const [key, val] = keyvals.split("=");
      obj[key] = val;
      return obj;
    }, {});
};

export default function Goal(props) {
  console.log("Goal -> props", props);

  const { id } = getParams(props.location.search);
  console.log("Goal -> id", id);

  const { data } = useFetch(
    // 1. Parameter = url til api
    "/sdg/goals/" + id,
    // 2. Parameter = config objekt. Aktivere loader
    { suspense: true },
    // 3. Parameter = tom array så den fetcher on-mount
    []
  );

  return (
    <div>
      {data && (
        <div>
          <h2>{data.item.title}</h2>
          <h3>{data.item.byline}</h3>
          <p>
            <img alt="{data.item.title}" src={data.item.image}></img>
          </p>
          <p className={Styles.description}>{data.item.description}</p>
          <ul>
            {data.item.targets &&
              data.item.targets.map((target) => {
                return (
                  <li key={target.id}>
                    {target.title}
                    {target.description}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
