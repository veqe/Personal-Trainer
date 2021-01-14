import './App.css';
import CustomerList from './Components/CustomerList';
import TrainingList from './Components/TrainingList';
import Calendar from './Components/Calendar';
import Drawer from './Components/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Link, Route } from "react-router-dom";


const useStyles = makeStyles({
  container: {
    display: "flex"
  }
})

function App() {
  const classes = useStyles();
  return (
    <div className="App">    
    <Drawer />        
      <Switch>
      <Route exact from="/Components/CustomerList" render={props => <CustomerList {...props} />} />         
      <Route exact path="/Components/TrainingList" render={props => <TrainingList {...props} />} />
      <Route exact path="/Components/Calendar" render={props => <Calendar {...props} />} /> 
      </Switch>             
    </div>
  );
}

export default App;
