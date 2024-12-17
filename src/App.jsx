
import './App.css'
import HomeLayout from "./components/HomeLayout.jsx";
import CustomError from "./components/CustomError.jsx";
import Body from "./components/Body.jsx";
import Login from "./pages/Login.jsx";
import Register from './pages/Register.jsx';
import ForgetPass from "./pages/ForgetPass.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import RoleSet from './pages/RoleSet.jsx';

import {createBrowserRouter,RouterProvider} from "react-router-dom";

function App() {
  
  const router=createBrowserRouter([
    {
     path:"/",
     element:<HomeLayout/>,
     errorElement:<CustomError/>,
     children:[
      {
        index:true,
        element:<Body/>
      },
      {
        path:"/login",
        element:<Login/>
      },{
        path:"/register",
        element:<Register/>
      },
      {
        path:"/forget-pass",
        element:<ForgetPass/>
      },
      {
        path:"/admin-dash",
        element:<AdminDashboard/>
      },
      {
        path:"/patient-dash",
        element:<PatientDashboard/>
      },{
        path:"/role-set",
        element:<RoleSet/>
      }
     ]
  }
])

  return (
   <div>
     <RouterProvider router={router}/>
   </div>
  )
}

export default App
