import Home from '../Pages/Home/Home';
import FetchJoke from '../Pages/FetchJoke/FetchJoke';
import SusDevGoals from '../Pages/SusDevGoals/SusDevGoals';
import SusDevGoal from '../Pages/SusDevGoals/SusDevGoal';
import FetchCategories from '../Pages/FetchCategories/FetchCategories';
import PostComment from '../Pages/PostComment/PostComment';
import Counter from '../Pages/Counter/Counter';
import Login from '../Pages/Login/Login';
import Product from '../Pages/Product/Product';

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
        name: 'Home',
        path: '/',
        exact: true,
        display: true,
        component: Home
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
        exact: false,
        display: true,
        component: SusDevGoals
    },
    {
        name: 'Verdensmål - detaljer',
        path: '/goal',
        exact: false,
        display: false,
        component: SusDevGoal
    },
    {
        name: 'Fetch Categories',
        path: '/fetchcategories',
        exact: false,
        display: true,
        component: FetchCategories
    },
    {
        name: 'Product page',
        path: '/product',
        exact: false,
        display: false,
        component: Product
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