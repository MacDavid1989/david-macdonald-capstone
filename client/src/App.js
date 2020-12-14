import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './scss/App.scss';
import Nav from './components/Nav'
import Spacer from './components/Spacer';
import Home from './pages/Home'
import Search from './pages/Search'
import MyMeals from './pages/MyMeals'
import GroceryList from './pages/GroceryList'
import Footer from './components/Footer';

function App() {

    return (
        <Router>
            <Nav/>
            <Spacer/>
            <Switch>
                <Route path="/" exact component={Home}/>
                {/* <Route path="/search" component={Search}/> */}
                {/* <Route path="/my meals" component={MyMeals}/> */}
                {/* <Route path="/grocery list" component={GroceryList}/> */}
            </Switch>
            <Footer/>
        </Router>
    );
}

export default App;