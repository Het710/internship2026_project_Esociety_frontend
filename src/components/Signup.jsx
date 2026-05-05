import { useForm } from "react-hook-form";
import axios from './utils/axiosInstance';
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch("password");
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    const{confirmPassword,...cleanData} = req.body
    try {
      const res = await axios.post('/user/register', data);

      if (res.status === 201) {
        toast.success("User signup successful");
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error while signing up");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Signup Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-indigo-600/10 backdrop-multiply"></div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Create Account 🚀
            </h2>
            <p className="mt-3 text-gray-500">
              Join E-Society and simplify your living
            </p>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="mt-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {/* FIRST NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50`}
                  {...register("firstName", { required: "Required" })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.firstName.message}</p>
                )}
              </div>

              {/* LAST NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className={`w-full px-4 py-3 rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50`}
                  {...register("lastName", { required: "Required" })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1 ml-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-gray-50`}
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) => value === password || "Passwords do not match"
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 active:scale-95 mt-2"
            >
              Create Account
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;