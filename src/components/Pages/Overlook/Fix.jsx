import React, { useState, useEffect } from "react";

const getParams = (url) => {
  return url
    .split("?")[1]
    .split("&")
    .reduce((obj, keyvals) => {
      const [key, val] = keyvals.split("=");
      obj[key] = val;
      return obj;
    }, {});
};

export default function City(props) {
  const { id } = getParams(props.location.search);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data && id) {
      fetch("https://api.mediehuset.net/overlook/hotels/by_city/" + id)
        .then((res) => res.json())
        .then((apidata) => setData(apidata));
    }
  }, [data, setData, id]);

  return (
    <div>
      {data ? (
        <div className="City">
            {data.items && data.items.map(hotel => {
                return (
                    <li key={hotel.id}>{hotel.title}</li>
                )
            })}            
        </div>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
}