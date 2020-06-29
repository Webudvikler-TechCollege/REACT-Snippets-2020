import React from "react";
import Styles from "./SusDevGoals.module.scss";
import useFetch from "use-http";
import useURLSearchParams from "../../../hooks/useURLSearchParams";

export default function Goal(props) {
  const { id } = useURLSearchParams("id");

  const { data } = useFetch(
    // 1. Parameter = url til api
    "/sdg/goals/" + (id || 2),
    // 2. Parameter = config objekt. Aktivere loader
    {
      suspense: true,
    },
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
