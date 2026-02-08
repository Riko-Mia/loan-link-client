import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import Login from "../Pages/Auth/Login/Login";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Contract from "../Pages/Contract/Contract";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Registration from "../Pages/Auth/Registration/Registration";
import AuthLayout from "../Layouts/AuthLayout";
import AddLoan from "../Pages/Manager/AddLoan/AddLoan";
import PrivateRoute from "./PrivateRoute";
import BeAManager from "../Pages/Manager/BeAManager/BeAManager";
import LoanApplication from "../Pages/LoanApplication/LoanApplication";
// import Dashboard from "../Pages/Dashboard/Dashboard";
import LoanDetails from "../Pages/LoanDetails/LoanDetails";
import AllLoans from "../Pages/Home/AllLoans/AllLoans";
import ManageUsers from "../Pages/Admin/ManageUsers";
import DashboardLayout from "../Layouts/DashboardLayout";
import AllLoansAdmin from "../Pages/Admin/AllLoansAdmin";
import AllLoanApplicationsAdmin from "../Pages/Admin/AllLoanApplicationsAdmin";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import BorrowerRoute from "./BorrowerRoute";
import ManageLoans from "../Pages/Manager/ManageLoans/ManageLoans";
import MyProfile from "../Pages/MyProfile/myProfile";
import PendingApplications from "../Pages/Manager/PendingApplications/PendingApplications";
import ApprovedApplications from "../Pages/Manager/ApprovedApplications/ApprovedApplications";
import BorrowerMyLoans from './../Pages/Borrower/BorrowerMyLoans';


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index: true,
            Component: Home
        },
        {
            path: '/contact',
            Component: Contract
        },
        {
            path: '/aboutUs',
            Component: AboutUs
        },
        {
            path: '/allLoans',
            Component: AllLoans
        }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children:[
        {
            path: 'login',
            Component: Login
        },
        {
            path: 'registration',
            Component: Registration
        },
        {
            path: 'loanApplication/:id',
            element: <PrivateRoute><LoanApplication></LoanApplication></PrivateRoute>
        },
        {
            path: '/loanDetails/:id',
            element: <PrivateRoute><LoanDetails></LoanDetails></PrivateRoute>
        },
        {
            path: 'beAManager',
            element: <PrivateRoute><BeAManager></BeAManager></PrivateRoute>
        },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
        {
            path:'manage-users',
            // Component: ManageUsers,
            element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
            path:'all-loan',
            // Component: AllLoansAdmin,
            element: <AdminRoute><AllLoansAdmin></AllLoansAdmin></AdminRoute>
        },
        {
            path:'loan-applications',
            element: <AdminRoute><AllLoanApplicationsAdmin></AllLoanApplicationsAdmin></AdminRoute>
        },
        // {
        //     path:'borrower-loans',
        //     element: <BorrowerRoute><BorrowerMyLoans></BorrowerMyLoans></BorrowerRoute>
        // },
        {
            path: 'add-loan',
            element: <ManagerRoute><AddLoan></AddLoan></ManagerRoute>
        },
        {
            path: 'manage-loans',
            element: <ManagerRoute><ManageLoans></ManageLoans></ManagerRoute>
        },
        {
            path: 'pending-loans',
            element: <ManagerRoute><PendingApplications></PendingApplications></ManagerRoute>
        },
        {
            path: 'approved-loans',
            element: <ManagerRoute><ApprovedApplications></ApprovedApplications></ManagerRoute>
        },
        {
            path: 'my-loans',
            element: <BorrowerRoute><BorrowerMyLoans></BorrowerMyLoans></BorrowerRoute>
        },
        {
            path: 'my-Profile',
            element: <MyProfile></MyProfile>
        },
    ]
  }
]);


