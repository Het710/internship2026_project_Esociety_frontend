import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../utils/axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ComplaintForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const submitHandler = async (data) => {
    setLoading(true)
    try {
      if (!image) {
        toast.error("Please select an image")
        setLoading(false)
        return
      }

      const formData = new FormData()
      formData.append("category", data.category)
      formData.append("description", data.description)
      formData.append("image", image)

      const res = await axios.post('/complaints/upload', formData)

      if (res.status === 201) {
        toast.success("Complaint submitted successfully ✅")
        navigate('/user/complaints')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting complaint")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Raise Complaint 🛠️</h2>
              <p className="text-blue-100 mt-1 opacity-90">We're here to help. Tell us what's wrong.</p>
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
            <label className="text-sm font-semibold text-gray-700 ml-1">Category</label>
            <select
              className={`w-full px-4 py-3 rounded-xl border ${errors.category ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/50 cursor-pointer`}
              {...register("category", { required: "Category is required" })}
            >
              <option value="">Select Issue Type</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electricity">Electricity</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Security">Security</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1 ml-1">{errors.category.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
            <textarea
              rows="3"
              placeholder="Describe your issue in detail..."
              className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/50 resize-none`}
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1 ml-1">{errors.description.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Evidence / Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-gray-500">
                    {image ? <span className="text-blue-600 font-medium">{image.name}</span> : "Tap to upload issue photo"}
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  required 
                  onChange={(e) => setImage(e.target.files[0])} 
                />
              </label>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Complaint"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ComplaintForm