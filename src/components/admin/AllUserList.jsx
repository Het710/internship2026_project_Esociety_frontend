import React,{useState,useEffect} from 'react'
import axios from '../utils/axiosInstance'
import { toast } from 'react-toastify'

const AllUserList = () => {
  const[users,setUsers] = useState([])

  const getUsers=async()=>{
    try {
      const res=await axios.get('/user')
      setUsers(res.data.data)
    } catch (error) {
      toast.error("Error fetching users")
    }
  }

  useEffect(()=>{
    getUsers()
  },[])

 return (
    <div className="p-4 md:p-6">

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        👥 All Users
      </h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {users.map((user) => (
            <div 
              key={user._id} 
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >

              {/* USER NAME */}
              <h3 className="text-lg font-semibold text-blue-600">
                {user.firstName} {user.lastName}
              </h3>

              {/* EMAIL */}
              <p className="text-sm text-gray-500 mt-1">
                {user.email}
              </p>

              {/* ROLE BADGE */}
              <div className="mt-3">
                <span className={`px-3 py-1 text-xs rounded-full font-medium
                  ${user.role === "Admin" && "bg-purple-100 text-purple-600"}
                  ${user.role === "Resident" && "bg-blue-100 text-blue-600"}
                  ${user.role === "Security" && "bg-green-100 text-green-600"}
                `}>
                  {user.role}
                </span>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default AllUserList