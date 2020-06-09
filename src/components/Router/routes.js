import Home from '../Pages/Home/Home';
import FetchJoke from '../Pages/FetchJoke/FetchJoke';
import FetchGoals from '../Pages/FetchGoals/FetchGoals';
import FetchCategories from '../Pages/FetchCategories/FetchCategories';
import PostComment from '../Pages/PostComment/PostComment';
import Counter from '../Pages/Counter/Counter';
import Login from '../Pages/Login/Login';
import Product from '../Pages/Product/Product';

const routes = [
    {
        name: 'Home',
        path: '/',
        exact: true,
        display: true,
        component: Home
    },
    {
        name: 'Product page',
        path: '/product',
        exact: false,
        display: false,
        component: Product
    },
    {
        name: 'Fetch Joke',
        path: '/fetchjoke',
        exact: true,
        display: true,
        component: FetchJoke
    },
    {
        name: 'Verdensmål',
        path: '/sdg',
        exact: true,
        display: true,
        component: FetchGoals
    },
    {
        name: 'Fetch Categories',
        path: '/fetchcategories',
        exact: false,
        display: true,
        component: FetchCategories
    },
    {
        name: 'Post Comment',
        path: '/postcomment',
        exact: false,
        display: true,
        component: PostComment
    },    
    {
        name: 'Counter',
        path: '/counter',
        exact: true,
        display: true,
        component: Counter
    },
    {
        name: 'Login',
        path: '/login',
        exact: true,
        display: true,
        component: Login
    }];

export default routes;