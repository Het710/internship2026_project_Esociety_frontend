import React,{useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from '../components/utils/axiosInstance'
import {toast} from 'react-toastify'

const ResetPassword = () => {
    const {token} = useParams()
    const navigate =useNavigate()

    const[newPassword,setNewPassword] = useState('')
    const[loading,setLoading] =useState(false)

    const handleReset =async()=>{
        try {
            if(!newPassword){
                return toast.error('Enter new password')
            }
            if(newPassword.length < 6){
                return toast.error("Minimum 6 characters  required")
        }

            setLoading(true)
            const res=await axios.post('/user/reset-password',{
                newPassword,
                token
            })
            toast.success(res.data.message)

            setTimeout(()=>{
                navigate('/')
            },1500)
        } catch (error) {
            toast.error(error.response?.data?.message || "Reset failed")
        } finally{
            setLoading(false)
        }
    }

  return(
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-indigo-200 p-4">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Reset Password 🔐
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter your new password below
        </p>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </div>

      </div>


    </div>
  )
}

export default ResetPassword