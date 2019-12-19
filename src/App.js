import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login";

import axios from "./services/api";
function App(props) {
   axios.interceptors.request.use(
      config => {
         console.log(config);
         const token = localStorage.getItem("token");
         if (token) {
            config.headers["Authorization"] = token;
         }
         return config;
      },
      error => Promise.reject(error)
   );

   axios.interceptors.response.use(
      response => {
         console.log(response);
         return response;
      },
      error => {
         const refreshToken = localStorage.getItem("refreshToken");

         if (
            error.response.status === 401 &&
            error.config.url == "http://127.0.0.1:4000/token"
         ) {
            console.log("url ", error.config.url);
            props.history.push("/home");
         }
         if (error.response.status === 401 || error.response.status === 403) {
            return axios
               .post("/token", {
                  refreshToken,
                  email: "sagar@gmail.com",
                  password: "pass123"
               })
               .then(response => {
                  if (response.status === 200) {
                     console.log(response.data);
                     localStorage.setItem("token", response.data.token);
                     // axios.defaults.headers.common[
                     //    "Authorization"
                     // ] = localStorage.getItem("token");
                     return axios(error.config);
                  }
               })
               .catch(error => Promise.reject(error));
         }

         // console.log(error.response.status);
         return Promise.reject(error);
      }
   );

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
