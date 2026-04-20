import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const GetApiDemo = () => {

  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const res = await axios.get("https://node5.onrender.com/user/user/")
    console.log("response...", res);
    setUsers(res.data.data)
  }

  const deleteUser=async()=>{
    const res=await axios.delete(`https://node5.onrender.com/user/user/${id}`)
    if(res.status == 204){
      toast.success("User deleted successfully")
      getUsers()
    } 
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div style={{ textAlign: "center" }}>
      <h1>GET API DEMO</h1>

      <table border="1" cellPadding="10" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className='bg-red-400 cursor-pointer hover:bg-red-600'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default GetApiDemo