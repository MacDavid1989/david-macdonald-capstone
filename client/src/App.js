import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './scss/App.scss';
import Nav from './components/Nav'
import Home from './pages/Home'
import Search from './pages/Search'
import MyMeals from './pages/MyMeals'
import GroceryList from './pages/GroceryList'

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/search" component={Search}/>
        <Route path="/my meals" component={MyMeals}/>
        <Route path="/grocery list" component={GroceryList}/>
      </Switch>
    </Router>
  );
}

export default App;