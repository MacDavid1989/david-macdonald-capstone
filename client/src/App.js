import './App.scss';
import Home from './pages/Home'
import MyMeals from './pages/MyMeals'
import GroceryList from './pages/GroceryList'
import Nav from './components/Nav'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/my meals" component={MyMeals}/>
        <Route path="/grocery list" component={GroceryList}/>
      </Switch>
    </Router>
  );
}

export default App;