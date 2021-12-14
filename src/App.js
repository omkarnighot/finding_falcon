import Home from './components/Home/Home.js';
import Planets from './components/Planets/Planets.js';
import Vehicles from './components/Vehicles/Vehicles.js';
import Result from  './components/Result/Result.js';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
   <div>
     <Switch>
       <Route path='/vehicles' component={Vehicles} />
       <Route path='/result' component={Result} />

       <Route path='/planets'>
          <Planets  />
       </Route>
       <Route path='/'>
          <Home />
       </Route>
     </Switch>
   </div>
  );
}

export default App;
