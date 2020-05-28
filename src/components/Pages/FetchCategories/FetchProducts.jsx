import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


// Li Component
const Li = props => {
    // Destructure property objektet
    const { path, title } = props;
    return (
      <li>
        {/* NavLink bruges med fordele til referencer i menuen */}
        <Link to={'/fetchcategories/' + path}>
            {title}
        </Link>
      </li>
    );
  }

export default function Categories(props) {
    const [apiCategories, setApiCategories] = useState(null);
    const [apiProducts, setApiProducts] = useState(null);

    async function getCategory() {
        const fetchHeaders = new Headers();
        fetchHeaders.append("Accept", "application/json");
        try {
            const request = await fetch("https://api.mediehuset.net/bakeonline/categories", {headers: fetchHeaders});
            const response = await request.json();
            setApiCategories(response.categories);
            //console.log(props.match.params);
            getProducts();
        } catch (error) {
            // Fang fejl og vis hvis der er en
            console.log("getCategories -> Error", error);
        }
    }

    async function getProducts() {
        const fetchHeaders = new Headers();
        fetchHeaders.append("Accept", "application/json");
        try {
            const request = await fetch("https://api.mediehuset.net/bakeonline/categories/1", {headers: fetchHeaders});
            const response = await request.json();
            setApiProducts(response.categories);
        } catch (error) {
            // Fang fejl og vis hvis der er en
            console.log("getProducts -> Error", error);
        }
    }
 

    useEffect(() => {
        getCategory()
    }, [])

    return (        
        <div>
            <h1>Kategorier</h1>
            <aside>
            <ul>
                {
                    apiCategories && apiCategories.length > 0 && apiCategories.map((item) => {
                        return (
                            <Li key={item.title} path={item.id} title={item.title}></Li>
                        )
                    })
                }
            </ul>
            </aside>
        </div>
    )
}