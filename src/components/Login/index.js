import React from "react";
import client from "../../services/api";

const handleLogin = async () => {
   const result = await client.post("/login", {
      email: "sagar@gmail.com",
      password: "pass123"
   });
   console.log(result);
};
const Login = () => <button onClick={handleLogin}>Login</button>;

export default Login;
