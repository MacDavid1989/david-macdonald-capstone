import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Spacer from './components/Spacer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Menu from './pages/Menu';
import Grocery from './pages/Grocery';
import Footer from './components/Footer';

function App() {

    return (
        <Router>
            <Nav/>
            <Spacer/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/browse" component={Browse}/>
                <Route path="/menu" component={Menu}/>
                <Route path="/grocery" component={Grocery}/>
            </Switch>
            <Footer/>
        </Router>
    );
};

export default App;