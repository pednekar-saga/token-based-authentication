import React, { useState } from "react";
import client from "../../services/api";

const handleLogin = () => {
   const result = client
      .post("/login", {
         email: "sagar@gmail.com",
         password: "pass123"
      })
      .then(res => {
         //  console.log(res);
         localStorage.setItem("token", res.data.token);
         localStorage.setItem("refreshToken", res.data.refreshToken);
      })
      .then(_ => {
         // client
         //    .get("/secure")
         //    .then(res => console.log(res))
         //    .catch(err => console.log(err));
      });
};

const handleSecureAPI = setAuth => {
   client
      .get("/secure")
      .then(res => {
         console.log(res);
         setAuth(true);
      })
      .catch(err => console.log("err", err));
};
const Login = () => {
   const [auth, setAuth] = useState(false);
   return (
      <div>
         {auth && <span>Now I'm authorized</span>}
         {localStorage.getItem("token") ? (
            <button onClick={() => handleSecureAPI(setAuth)}>Secure</button>
         ) : (
            ""
         )}
         <button onClick={handleLogin}>Login</button>
      </div>
   );
};
export default Login;
