import React, { useState, useEffect } from 'react'

const getParams = search => {
  return search.split("?")[1].split("&").reduce((obj, keyvals) => {
    const [key, val] = keyvals.split("=");
    obj[key] = val;
    return obj;
  }, {})
}

export default function Product(props) {
  console.log("Product -> slug", getParams(props.location.search));
  const { id } = getParams(props.location.search)
  const [data, setData] = useState(null)
  
  useEffect(() => {
    if(!data && id) {
      fetch("https://api.mediehuset.net/bakeonline/products/" + id)
      .then(res => res.json()).then(apidata => setData(apidata))
    }
  }, [data, setData, id])

  return (
    <div>
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <p>{data.teaser}</p>

        </div>
      ) : (
        <div>
          Loading..
        </div>
      )}
    </div>
  )
}