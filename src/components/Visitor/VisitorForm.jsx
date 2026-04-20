import React, { useState } from 'react'
import axios from '../utils/axiosInstance'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const VisitorForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null) // State for the image preview
  const navigate = useNavigate()

  // Function to handle image selection and create a preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("visitorName", data.visitorName);
      formData.append("visitType", data.visitType);
      formData.append("residentId", data.residentId);

      if (data.visitorPhoto && data.visitorPhoto[0]) {
        formData.append("visitorPhoto", data.visitorPhoto[0]);
      }

      const res = await axios.post('/visitors', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.status === 201) {
        toast.success("Visitor added successfully");
        navigate('/user/visitors');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding visitor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight">Add Visitor 🚶‍♂️</h2>
              <p className="text-blue-100 mt-1 opacity-90">Register a new entry for the society</p>
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

        <form onSubmit={handleSubmit(submitHandler)} className="p-8 space-y-5 bg-white">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Visitor Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className={`w-full px-4 py-3 rounded-xl border ${errors.visitorName ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/50`}
              {...register("visitorName", { required: "Name is required" })}
            />
            {errors.visitorName && <p className="text-red-500 text-xs mt-1 ml-1">{errors.visitorName.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Visit Type</label>
            <select
              className={`w-full px-4 py-3 rounded-xl border ${errors.visitType ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/50 cursor-pointer`}
              {...register("visitType", { required: "Type is required" })}
            >
              <option value="">Select Category</option>
              <option value="Guest">Guest</option>
              <option value="Delivery">Delivery</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            {errors.visitType && <p className="text-red-500 text-xs mt-1 ml-1">{errors.visitType.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Resident ID</label>
            <input
              type="text"
              placeholder="Flat or Member ID"
              className={`w-full px-4 py-3 rounded-xl border ${errors.residentId ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/50`}
              {...register("residentId", { required: "Resident ID is required" })}
            />
            {errors.residentId && <p className="text-red-500 text-xs mt-1 ml-1">{errors.residentId.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Visitor Photo</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors overflow-hidden">
                
                {/* DYNAMIC IMAGE PREVIEW */}
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-sm text-gray-500 font-medium">Click to upload photo</p>
                  </div>
                )}

                <input 
                  type="file" 
                  className="hidden" 
                  {...register("visitorPhoto", {
                    onChange: (e) => handleImageChange(e) // Hooks into the change event
                  })} 
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Add Visitor"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default VisitorForm;