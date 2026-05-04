import { useState } from 'react';
import axios from '../utils/axiosInstance'
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const NoticeForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post('/notices', {
        ...data,
        role: user?.role,
        userId: user?._id
      });
      
      if (response.status === 201) {
        toast.success("Notice added successfully");
        navigate('/admin/notices');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding notice");
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
              <h2 className="text-3xl font-extrabold tracking-tight">Create Notice 📢</h2>
              <p className="text-blue-100 mt-1 opacity-90">Broadcast important updates to residents</p>
            </div>
            <button 
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
            <label className="text-sm font-semibold text-gray-700 ml-1">Notice Title</label>
            <input
              type="text"
              placeholder="e.g. Water Maintenance Update"
              className={`w-full px-4 py-3 rounded-xl border ${errors.title ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/50`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1 ml-1">{errors.title.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
            <textarea
              rows="4"
              placeholder="Provide detailed information here..."
              className={`w-full px-4 py-3 rounded-xl border ${errors.description ? 'border-red-500' : 'border-gray-200'} focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/50 resize-none`}
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1 ml-1">{errors.description.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">Expiry Date (Optional)</label>
            <div className="relative">
              <input
                type="date"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-gray-50/50 text-gray-600"
                {...register("expiryDate")}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              "Post Notice"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoticeForm;