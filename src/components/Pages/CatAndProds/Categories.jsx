import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Styles from "./CatsAndProds.module.scss";
import useFetch from "use-http";

// Deklarerer container component
const Container = (props) => {
  const [categoryData, setCategoryData] = useState(null);
  return (
    <div className={Styles.container}>
      <div className={Styles.categories}>
        <CategoryList setCategoryData={setCategoryData} />
      </div>
      <div className={Styles.products}>
        <ProductList data={categoryData} />
      </div>
    </div>
  );
};

// Deklarerer kategori component
const CategoryList = (props) => {
  // Deconstructor props
  const { setCategoryData } = props;

  const { data } = useFetch("/bakeonline/categories", []);
  const { get: getCategoryData } = useFetch("/bakeonline/categories");

  const fetchCategoryData = useCallback(async (id) => {
    const newData = await getCategoryData(id);
    setCategoryData(newData.products.products);
  }, [setCategoryData, getCategoryData]);

  return (
    <div>
      <ul>
        {/* Looper kategorier og indsætter knap til visning*/}
        {data &&
          data?.categories.map((category) => {
            return (
              <li
                key={category.id}
                onClick={(e) => fetchCategoryData(category.id)}
              >
                {category.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

// Deklarerer product component
const ProductList = (props) => {
  const { data } = props;
  return (
    <div>
      {data &&
        data.map((product) => (
          <div className={Styles.product} key={"product-" + product.product_id}>
            <div>
              <Link to={"/product?id=" + product.product_id}>
                <img src={product.image.fullpath} alt={product.title}></img>
              </Link>
            </div>
            <div>
              <Link to={"/product?id=" + product.product_id}>
                <h4>{product.title}</h4>
              </Link>
              <p>{product.teaser}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Container />
    </div>
  );
}

export default App;
