import { useState } from 'react';
import axios from './utils/axiosInstance.js';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (data) => {
    try {
      const res = await axios.post('/user/login', data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success('Login successful');
      
      const role = res.data.user.role;
      if (role === 'Admin') {
        navigate('/admin/notices');
      } else {
        navigate('/user/notices'); // Resident and Security go here
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  const handleForgot = async () => {
    try {
      if (!forgotEmail) return toast.error("Enter email first");
      setLoading(true);
      const res = await axios.post('/user/forget-password', { email: forgotEmail });
      toast.success(res.data.message);
      setShowForgot(false);
      setForgotEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT SIDE: IMAGE */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
          alt="office"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-600/10 backdrop-multiply"></div>
      </div>

      {/* RIGHT SIDE: FORM */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Welcome Back 👋
            </h2>
            <p className="mt-3 text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50`}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              Sign In
            </button>
          </form>

          <div className="text-center">
            <button 
              onClick={() => setShowForgot(!showForgot)}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Forgot your password?
            </button>
          </div>

          {/* FORGOT PASSWORD SECTION */}
          {showForgot && (
            <div className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-100 animate-in fade-in slide-in-from-top-4 duration-300">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">Reset Password</h3>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter registered email"
                  className="w-full px-4 py-2 text-sm border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
                <button
                  onClick={handleForgot}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-all"
                >
                  {loading ? "Sending link..." : "Send Reset Link"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;