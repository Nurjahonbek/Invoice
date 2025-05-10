
import  Home  from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Details from "./pages/Details"

export default function App() {
  const routes = createBrowserRouter([
    {
      path:"/",
      element: <Home />
    },
    {
      path: "/:id",
      element: <Details />
    },
  ])
  return <RouterProvider router={routes}/>
}