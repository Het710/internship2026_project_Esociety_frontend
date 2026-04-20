import React, { useState } from 'react'
import { Link, Outlet } from "react-router-dom";

const AdminSidebar = () => {

  const [isOpen, setIsOpen] = useState(true);

  const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href='/'
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className={`bg-gray-900 text-white transition-all duration-300 flex flex-col
        ${isOpen ? "w-64 p-5" : "w-20 p-3"}`}>

        <div className="flex items-center justify-between mb-6">
          {isOpen && (
            <h1 className="text-xl font-bold text-blue-400">
              Admin Panel
            </h1>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xl hover:text-blue-400"
          >
            ☰
          </button>
        </div>

        <ul className="flex flex-col gap-3 font-medium">

          <li>
            <Link 
              to="/admin/allUsers" 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
            >
              👤 {isOpen && "Users"}
            </Link>
          </li>

          <li>
            <Link 
              to="/admin/notices" 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
            >
              📢 {isOpen && "Notices"}
            </Link>
          </li>

            <li>
            <Link 
              to="/admin/discussions" 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
            >
              💬 {isOpen && "Discussions"}
            </Link>
          </li>

          <li>
            <Link 
              to="/admin/visitors" 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
            >
              🚶 {isOpen && "Visitors"}
            </Link>
          </li>

          <li>
            <Link 
              to="/admin/alerts" 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
            >
              🚨 {isOpen && "Alerts"}
            </Link>
          </li>

          <li>
            <Link 
              to="/admin/complaints" 
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
            >
              🛠️ {isOpen && "Complaints"}
            </Link>
          </li>

        </ul>

        {/* LOGOUT (BOTTOM) */}
        <div className="mt-auto">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 py-2 rounded-lg transition"
          >
            🔓 {isOpen && "Logout"}
          </button>
        </div>

      </div>

      <div className="flex-1 p-4 md:p-6">
        <Outlet/>
      </div>

    </div>
  )
}

export default AdminSidebar