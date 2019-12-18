import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
   return (
      <div className="App">
         <header className="App-header">App is up and running</header>
         <Switch>
            <Route exact path="/login">
               <Login />
            </Route>
         </Switch>
      </div>
   );
}

export default App;
