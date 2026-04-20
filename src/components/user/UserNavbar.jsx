import { useState } from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };


  const isActive = (path) => location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500";

  return (
    <>
      <nav className="backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
               <span className="text-white font-bold">E</span>
            </div>
            <h1 className="text-2xl font-extrabold bg-linear-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text tracking-tight">
              E-Society
            </h1>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6 items-center text-sm font-medium">
              <li><Link to="/user/notices" className={`${isActive('/user/notices')} transition-colors`}>Notices</Link></li>
              <li><Link to="/user/visitors" className={`${isActive('/user/visitors')} transition-colors`}>Visitors</Link></li>
              <li><Link to="/user/emergency" className="text-gray-600 hover:text-red-500 transition-colors font-medium">Emergency</Link></li>
              <li><Link to="/user/discussions" className={`${isActive('/user/discussions')} transition-colors`}>Discussions</Link></li>
              <li><Link to="/user/complaints" className={`${isActive('/user/complaints')} transition-colors`}>Complaints</Link></li>
            </ul>

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <div className="flex items-center gap-3">
              <Link 
                to="/user/add-complaint" 
                className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 hover:shadow-md transition-all active:scale-95"
              >
                + Raise
              </Link>
              <Link 
                to="/user/facilities" 
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-all"
              >
                Facilities
              </Link>
              <button 
                onClick={handleLogout} 
                className="ml-2 p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* MOBILE BURGER */}
          <button
            className="md:hidden p-2 rounded-lg bg-gray-50 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-xl p-6 space-y-4 animate-in slide-in-from-top duration-300">
            <ul className="flex flex-col gap-4 font-medium text-gray-700">
              <li><Link onClick={() => setIsOpen(false)} to="/user/notices" className="flex items-center gap-2 text-lg">📢 Notices</Link></li>
              <li><Link onClick={() => setIsOpen(false)} to="/user/visitors" className="flex items-center gap-2 text-lg">🚶 Visitors</Link></li>
              <li><Link onClick={() => setIsOpen(false)} to="/user/emergency" className="flex items-center gap-2 text-lg text-red-500">🚨 Emergency</Link></li>
              <li><Link onClick={() => setIsOpen(false)} to="/user/discussions" className="flex items-center gap-2 text-lg">💬 Discussions</Link></li>
              <li><Link onClick={() => setIsOpen(false)} to="/user/complaints" className="flex items-center gap-2 text-lg">🛠️ Complaints</Link></li>
            </ul>
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link to="/user/add-complaint" className="bg-blue-600 text-white py-3 rounded-xl text-center font-bold">Raise Complaint</Link>
              <Link to="/user/facilities" className="bg-gray-100 text-gray-700 py-3 rounded-xl text-center font-bold">View Facilities</Link>
              <button onClick={handleLogout} className="text-red-600 font-semibold py-2">Logout</button>
            </div>
          </div>
        )}
      </nav>

      {/* PAGE CONTENT WRAPPER */}
      <main className="p-4 md:p-8 bg-[#f8fafc] min-h-[calc(100vh-73px)]">
        <div className="max-w-7xl mx-auto">
          <Outlet/>
        </div>
      </main>
    </>
  );
};

export default UserNavbar;