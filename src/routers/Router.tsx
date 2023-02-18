import { createBrowserRouter } from "react-router-dom";

export const Routers = createBrowserRouter([
  {
    path: "/",
    element: <div></div>,
  },
  {
    path: "/home",
    element: <div className="">Homepage</div>,
  },
]);
