import './App.css';
import CustomerList from './Components/CustomerList';
import TrainingList from './Components/TrainingList';
import Calendar from './Components/Calendar';
import Drawer from './Components/Drawer';
import { Switch, Route } from "react-router-dom";

function App() {
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
