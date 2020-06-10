import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Styles from './CatsAndProds.module.scss';

// Deklarerer container component
const Container = props => {
    const [categoryData, setCategoryData] = useState(null);
    return (
        <div className={Styles.container}>
            <div>
                <CategoryList setCategoryData={setCategoryData} />
            </div>
            <div>
                <ProductList data={categoryData} />
            </div>
        </div>
    )
}

// Deklarerer kategori component
const CategoryList = props => {

    // Deconstructor props
    const { setCategoryData } = props;
    // Sætter API hook
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        if(!apiData) {
            // Henter liste af kategorier
            fetch('https://api.mediehuset.net/bakeonline/categories')
                .then((res) => res.json())
                .then((data) => setApiData(data));
        }
    }, [apiData, setApiData]);

    const fetchCategoryData = id => {
            // Henter kategori detaljer + liste af produkter
            fetch('https://api.mediehuset.net/bakeonline/categories/' + id)
            .then((res) => res.json())
            .then((data) => setCategoryData(data.products.products))
    }

    return (
        <div>
            <ul>
                {/* Looper kategorier og indsætter knap til visning*/}
                {apiData && apiData?.categories.map((category) => {
                    return <li key={category.id} onClick={e => fetchCategoryData(category.id)}>
                                {category.title}
                            </li>
                })}
            </ul>
        </div>                    
    )
}

// Deklarerer product component
const ProductList = props => {
    const {data} = props;
    return (
        <div>
            {data && data.map(product => (
                <div className={Styles.product} key={"product-" + product.product_id}>
                    <img src={product.image.fullpath} alt={product.title}></img>
                    <h3>{product.title}</h3>
                    <p>{product.teaser}</p>
                    <Link to={"/product?id=" + product.product_id}>Full product</Link>
                </div>
            ))}
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