import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const apiUrl = 'https://api.mediehuset.net/bakeonline/categories';

const apiDataOrg = {
    "count": 7,
    "categories": [
        {
            "id": "1",
            "title": "Morgenbrød",
            "request": {
                "type": "GET",
                "url": "https://api.mediehuset.net/bakeonline/categories/1"
            }
        }
    ]    
}

const Container = props => {
    const [categoryData, setCategoryData] = useState(null);
    return (
        <div className="container">
            <div className="left">
                <CategoryList setCategoryData={setCategoryData} />
            </div>
            <div className="right">
                <ProductList data={categoryData} />
            </div>
        </div>
    )
}

const ProductList = props => {
    const {data} = props;
    return (
        <div>
            {data && data.map(product => (
                <div key={"product-" + product.id}>
                    <h6>{product.image.filename}</h6>
                    <h6>{product.title}</h6>
                    <p>{product.teaser}</p>
                    <Link to={"/product?id=" + product.product_id}>Full product</Link>
                </div>
            ))}
        </div>
    )
}

const CategoryList = props => {
    const { setCategoryData } = props;
    const [apiData, setApiData] = useState(null);
    useEffect(() => {
        if(!apiData) {
            fetch(apiUrl)
                .then((res) => res.json())
                .then((data) => setApiData(data));
        }
    }, [apiData, setApiData]);

    const fetchCategoryData = id => {
        fetch('https://api.mediehuset.net/bakeonline/categories/' + id)
            .then((res) => res.json())
            .then((data) => setCategoryData(data.products.products))
    }

    return (
        <div>
            <ul>
                {apiData && apiData?.categories.map((category) => {
                    return <li key={category.id}>
                                <button onClick={e => fetchCategoryData(category.id)}>
                                    {category.title}
                                </button>
                            </li>
                })}
            </ul>
        </div>                    
    )
}

function App() {
    return (
        <div className="App">
            <Container />
        </div>
    );
}

export default App;