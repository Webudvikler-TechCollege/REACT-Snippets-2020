import React, { useState } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Router from './components/Router/Router';

import './App.css';

function App() {
  const [catData, setCatData] = useState([]);

  return (
    <>
      <Header>
        <Nav />
      </Header>
      <Main>
        <Router />
      </Main>
      <Footer></Footer>
    </>
  );

  const handleCategory = (id) => {
    let url = `https://api.mediehuset.net/bakeonline/categories/${id}`;
    fetch(url)
      .then(response => response.json())
      .then(result => {
        setCatData(result);
      })
      .catch(error => console.error(error))
  }

}
export default App;