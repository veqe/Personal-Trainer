import './App.css';
import CustomerList from './Components/CustomerList';
import TrainingList from './Components/TrainingList';
import Drawer from './Components/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Switch, Link, Route } from "react-router-dom";


const useStyles = makeStyles({
  container: {
    display: "flex"
  }
})

function App() {
  return (
    <div className="App">
      <Router>
      <ul>
        <li>
          <Link to="/Customer">
            Customer
          </Link>          
        </li>
        <li>
          <Link to="/Training">
            Training
          </Link>
        </li>
        <li>
          <Link to="/Calendar">
            Calendar
          </Link>
        </li>
      </ul>
      <Switch>
      <Route component={CustomerList} exact path="/Customer"> 
        </Route>
      <Route component={TrainingList} exact path="/Training">
        </Route> 
      </Switch>    
      </Router>     
      
    </div>
  );
}

export default App;
