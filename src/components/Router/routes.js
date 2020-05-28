import Home from '../Pages/Home/Home';
import FetchJoke from '../Pages/FetchJoke/FetchJoke';
import FetchSongs from '../Pages/FetchSongs/FetchSongs';
import FetchCategories from '../Pages/FetchCategories/FetchCategories';
import Login from '../Pages/Login/Login';

const routes = [
    {
        name: 'Home',
        path: '/',
        exact: true,
        component: Home
    },
    {
        name: 'Fetch Joke',
        path: '/fetchjoke',
        exact: true,
        component: FetchJoke
    },
    {
        name: 'Fetch Songs',
        path: '/fetchsongs',
        exact: true,
        component: FetchSongs
    },
    {
        name: 'Fetch Categories',
        path: '/fetchcategories',
        exact: false,
        component: FetchCategories
    },
    {
        name: 'Login',
        path: '/login',
        exact: true,
        component: Login
    }];

export default routes;