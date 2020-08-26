import React, { useState, useEffect } from 'react';

export default function SearchInput(props) {
    const [searchText, setSearchText] = useState("Search...");
    const [apiData, setApiData] = useState(null);

    async function getSearch() {
        const fetchHeaders = new Headers();
        fetchHeaders.append('Accept', 'application/json');

        try {
            const request = await fetch('https://api.mediehuset.net/overlook/search/' + searchText, { headers: fetchHeaders });
            const response = await request.json();
            console.log(response);
            setApiData(response)
        } catch (error) {
            console.log('getNews -> Error', error);
        }
    }
    useEffect(() => {
        getSearch()
    }, [])

    return(
      <div className="searcharea">
	      <input type="text" className="searchfield" onFocus={() => setSearchText("")} onChange={(e) => setSearchText(e.target.value)} value={searchText} ></input>
          <button onClick={()=>getSearch()} className="searchbutton">Search</button>
            {
              apiData && apiData.items.map(searchitem => (
                  <div key={searchitem.id}>
                      <p><b>{searchitem.title}</b><br />
                        {searchitem.teaser}</p>
                  </div>
              ))
            }
      </div>
);
}