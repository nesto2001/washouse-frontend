import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./routers/Router";

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={Routers} />
    </React.StrictMode>
  );
}

export default App;
