import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from '../components/utils/ProtectedRoute.jsx'
import Login from '../components/Login'
import Signup from '../components/Signup'
import UserNavbar from '../components/user/UserNavbar'
import AdminSidebar from '../components/admin/AdminSidebar'
import UserList from '../components/user/UserList.jsx'
import UserDetail from '../components/user/UserDetail.jsx'
import AllUserList from '../components/admin/AllUserList.jsx'
import NoticeList from '../components/Notice/NoticeList.jsx'
import NoticeForm from '../components/Notice/NoticeForm.jsx'
import VisitorList from '../components/Visitor/VisitorList.jsx'
import VisitorForm from  '../components/Visitor/VisitorForm.jsx'
import EmergencyForm from '../components/Emergency/EmergencyForm.jsx'
import EmergencyList from '../components/Emergency/EmergencyList.jsx'
import ComplaintForm from '../components/Complaint/ComplaintForm.jsx'
import ComplaintList from '../components/Complaint/ComplaintList.jsx'
import ResetPassword from '../pages/ResetPassword.jsx'
import FacilityBooking from '../components/Facility/FacilityBooking.jsx'
import DiscussionFeed from '../components/Discussion/DiscussionFeed.jsx'

const AppRouter = () => {
    const router = createBrowserRouter([
        {path:'/', element:<Login />},
        {path:"/signup", element:<Signup/>},
        {path:'reset-password/:token',element:<ResetPassword/>},
        {
            path:'/user',
            element:<ProtectedRoute role={['Resident','Security']}>
                <UserNavbar/>
            </ProtectedRoute>,
            children:[
                {path:'userList', element:<UserList/>},
                {path:'userDetail',element:<UserDetail/>},
                {path:'notices', element:<NoticeList/>},
                {path:'noticeForm', element:<NoticeForm/>},
                {path:'noticeForm/:id', element:<NoticeForm/>},
                {path:'visitors' ,element:<VisitorList/>},
                {path:'add-visitor', element:<VisitorForm/>},
                {path:'emergency', element:<EmergencyForm/>},
                {path:'emergency-list',element:<EmergencyList/>},
                {path:'complaints', element:<ComplaintList/>},
                {path:'add-complaint', element:<ComplaintForm/>},
                {path:'facilities', element:<FacilityBooking/>},
                {path:'discussions', element:<DiscussionFeed/>}
            ]
        },
        {path:'/admin',element:<ProtectedRoute role='Admin'>
            <AdminSidebar/>
        </ProtectedRoute>,
            children:[
                {path:'allUsers', element:<AllUserList/>},
                {path:'notices', element:<NoticeList/>},
                {path:'noticeForm', element:<NoticeForm/>},
                {path:'noticeForm/:id', element:<NoticeForm/>},
                {path:'visitors' ,element:<VisitorList/>},
                {path:'alerts' , element:<EmergencyList/>},
                {path:'complaints', element:<ComplaintList/>},
                {path:'discussions', element:<DiscussionFeed/>}
            ]
        }
    ])
  return (
   <RouterProvider router={router}></RouterProvider>
  )
}

export default AppRouter