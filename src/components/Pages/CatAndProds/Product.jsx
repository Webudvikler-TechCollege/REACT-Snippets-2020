import React from "react";
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

export default function Product(props) {
  const { id } = getParams(props.location.search);
  const { data } = useFetch("/bakeonline/products/" + id, {suspense: true}, []);

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
