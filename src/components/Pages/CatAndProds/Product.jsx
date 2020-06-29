import React from "react";
import useFetch from "use-http";
import useUrlParams from "../../../hooks/useURLSearchParams";


export default function Product(props) {
  // const { id } = getParams(props.location.search);
  // const { id } = getParams(props.location.search);
  const { id } = useUrlParams("id");
  const { data } = useFetch(
    "/bakeonline/products/" + (id || 2),
    { suspense: true },
    [id]
  );

  return (
    <div>
      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.teaser}</p>
        </div>
      )}
    </div>
  );
}
