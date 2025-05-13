
import  Home  from "./pages/Home"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Details from "./pages/Details"
import RootLayout from "./layout/RootLayout"

export default function App() {
  const routes = createBrowserRouter([
    {
      path:"/",
      element: <RootLayout><Home></Home></RootLayout>,
      children:[
        {
        path: "/",
        element: <Home />
        },
        {
          path: "/:id",
          element: <Details/>,
        },
      ],
    },

  ])
  return <RouterProvider router={routes}/>
}