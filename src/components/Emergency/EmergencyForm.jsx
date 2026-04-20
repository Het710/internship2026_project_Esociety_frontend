import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../utils/axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EmergencyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  const submitHandler = async (data) => {
    setLoading(true)
    try {
      const res = await axios.post('/alerts', {
        ...data,
        sentBy: user?._id,
        role: user?.role
      })
      if (res.status === 201) {
        toast.success("Emergency alert broadcasted successfully")
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending alert")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-red-50 overflow-hidden">
        
        <div className="bg-linear-to-r from-red-600 to-rose-700 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Raise Emergency 🚨</h2>
              <p className="text-red-100 mt-1 opacity-90">Immediate alerts will be sent to authorities</p>
            </div>
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="p-8 space-y-6 bg-white">
        
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Emergency Category</label>
            <select
              className={`w-full px-4 py-3 rounded-xl border ${errors.alertType ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all bg-red-50/30 cursor-pointer`}
              {...register("alertType", { required: "Type required" })}
            >
              <option value="">Select Situation</option>
              <option value="Fire">🔥 Fire Emergency</option>
              <option value="Medical">🏥 Medical Emergency</option>
              <option value="Security">🛡️ Security Breach</option>
              <option value="Other">⚠️ Other Urgent Issue</option>
            </select>
            {errors.alertType && <p className="text-red-500 text-xs mt-1 ml-1">{errors.alertType.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Priority Level</label>
            <div className="grid grid-cols-3 gap-3">
              {['High', 'Medium', 'Low'].map((level) => (
                <label key={level} className="relative cursor-pointer">
                  <input
                    type="radio"
                    value={level}
                    className="peer sr-only"
                    defaultChecked={level === 'High'}
                    {...register("priority")}
                  />
                  <div className="w-full py-2 text-center text-sm font-medium rounded-lg border border-gray-200 bg-white peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 transition-all">
                    {level === 'High' ? '🔴' : level === 'Medium' ? '🟡' : '🟢'} {level}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Situation Details</label>
            <textarea
              rows="3"
              placeholder="Briefly describe the emergency (e.g., Smoke in Block B, Flat 402)"
              className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all bg-red-50/30 resize-none`}
              {...register("message", { required: "Message required" })}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1 ml-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-red-200 hover:bg-red-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Broadcasting...
              </>
            ) : (
              "Send Alert 🚨"
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            Misuse of emergency alerts may lead to penalties.
          </p>
        </form>
      </div>
    </div>
  )
}

export default EmergencyForm