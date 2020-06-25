import React from "react";

// import Home from '../Pages/Home/Home';
// import FetchJoke from '../Pages/FetchJoke/FetchJoke';
// import SusDevGoals from '../Pages/SusDevGoals/SusDevGoals';
// import SusDevGoal from '../Pages/SusDevGoals/SusDevGoal';
// import PostComment from '../Pages/PostComment/PostComment';
// import Counter from '../Pages/Counter/Counter';
// import Login from '../Pages/Login/Login';
// import Categories from '../Pages/CatAndProds/Categories';
// import Product from '../Pages/CatAndProds/Product';
// import LineUp from '../Pages/API/LineUp/LineUp.jsx';
// import FetchTest from '../Pages/FetchTest/FetchTest';
const Home = React.lazy(() => import("../Pages/Home/Home"));
const FetchJoke = React.lazy(() => import("../Pages/FetchJoke/FetchJoke"));
const SusDevGoals = React.lazy(() =>
  import("../Pages/SusDevGoals/SusDevGoals")
);
const SusDevGoal = React.lazy(() => import("../Pages/SusDevGoals/SusDevGoal"));
const PostComment = React.lazy(() =>
  import("../Pages/PostComment/PostComment")
);
const Counter = React.lazy(() => import("../Pages/Counter/Counter"));
const Login = React.lazy(() => import("../Pages/Login/Login"));
const Categories = React.lazy(() => import("../Pages/CatAndProds/Categories"));
const Product = React.lazy(() => import("../Pages/CatAndProds/Product"));
const LineUp = React.lazy(() => import("../Pages/API/LineUp/LineUp.jsx"));
const FetchTest = React.lazy(() => import("../Pages/FetchTest/FetchTest"));

/**
 * Array til at styre routes med
 * @name String Navn som bliver vist i navbar
 * @path String Sti
 * @exact Bool Grad af match
 * @display Bool Angiver om punktet skal vises i navbar
 * @component Object Komponent som skal afvikles
 */

const routes = [
  {
    name: "Home",
    path: "/",
    exact: true,
    display: true,
    component: Home,
    subnav: [
      {
        name: "Test",
        path: "/test",
        exact: true,
        display: true,
        component: Home,
      },
    ],
  },
  {
    // Henter enkelt joke fra API
    name: "Fetches",
    path: "/fetches",
    exact: true,
    display: true,
    subnav: [
      {
        // Henter enkelt joke fra API
        name: "Fetch a joke",
        path: "/fetchajoke",
        component: FetchJoke,
        priviliged: true,
      },
      {
        // Henter kategorier og produkter ud fra API
        name: "Kategori & Produkt",
        path: "/catandprods",
        component: Categories,
      },
      {
        name: "LineUp",
        path: "/lineup",
        component: LineUp,
      },
      {
        name: "Fetch Tester",
        path: "/fetchtest",
        component: FetchTest,
      },
    ],
  },
  {
    // Henter verdensmål ud fra API
    name: "Verdensmål",
    path: "/sdg",
    exact: false,
    display: true,
    component: SusDevGoals,
  },
  {
    // Bruges til at vise verdensmål detaljer ud fra et GET param med id
    name: "Verdensmål - detaljer",
    path: "/goal",
    exact: false,
    display: true,
    component: SusDevGoal,
  },
  {
    // Bruges til at vise produkt detaljer ud fra et GET param med id
    name: "Product page",
    path: "/product",
    exact: false,
    display: false,
    component: Product,
  },
  {
    name: "Post Comment",
    path: "/postcomment",
    exact: false,
    display: true,
    component: PostComment,
  },
  {
    name: "Counter",
    path: "/counter",
    exact: true,
    display: true,
    component: Counter,
  },
  {
    name: "Login",
    path: "/login",
    exact: true,
    display: true,
    component: Login,
  },
];

export default routes;
