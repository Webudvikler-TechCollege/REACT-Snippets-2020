import React, { useState, useEffect } from "react";




const Category = props => {
    // Destructure property objektet
    const { path, title } = props;

    function handleClick(id) {
        console.log('The link was clicked.' + id);
    }

    return (
      <li onClick={handleClick(path)}>
            {title}
      </li>
    );
  }

  const Product = props => {
    // Destructure property objektet
    const { title } = props;
    return (
      <section>
            {title}
      </section>
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
            setApiProducts(response.products);
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
                            <Category key={item.title} path={item.id} title={item.title}></Category>
                        )
                    })
                }
            </ul>
            </aside>
            <section>
            {
                    apiProducts && apiProducts.length > 0 && apiProducts.map((item) => {
                        return (
                            <Product key={item.title} path={item.id} title={item.title}></Product>
                        )
                    })
                }
            </section>
        </div>
    )
}