import React,{useState,useEffect} from 'react'
import axios from '../utils/axiosInstance'

const ComplaintList = () => {
    const[complaints,setComplaints] = useState([])

    const user = JSON.parse(localStorage.getItem('user'))

    const fetchComplaints=async()=>{
        try {
          let res
          if(user.role === 'Admin'){
            res = await axios.get('/complaints')
          } else{
            res = await axios.get(`/complaints/resident/${user._id}`)
          }
          setComplaints(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        fetchComplaints()
    },[])

    const updateStatus = async(id,status)=>{
        try{
            await axios.put(`/complaints/status/${id}`,{status})
            fetchComplaints()
        }catch(error){
            console.error(error)
        }
    }

 return (
    <div className="p-4 md:p-6">
      <h2 className='text-3xl font-bold mb-6 text-gray-800'>Complaints</h2>

      {complaints.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No complaints found 🚫
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {complaints.map((c) => (
          <div 
            key={c._id} 
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >

            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg text-blue-600">{c.category}</h3>

              <span className={`text-xs px-3 py-1 rounded-full font-medium
                ${c.status === "Open" && "bg-red-100 text-red-600"}
                ${c.status === "In-Progress" && "bg-yellow-100 text-yellow-600"}
                ${c.status === "Resolved" && "bg-green-100 text-green-600"}
              `}>
                {c.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-1">
              👤 {c.raisedBy?.name}
            </p>

            <p className="text-gray-700 mb-3 line-clamp-3">
              {c.description}
            </p>

            {c.complainImage && (
              <img 
                src={c.complainImage} 
                alt="complaint" 
                className="w-full h-40 object-cover rounded-xl mb-3 hover:scale-105 transition"
              />
            )}

            {user.role === "Admin" && (
              <div className="flex gap-2 mt-2">

                {c.status === "Open" && (
                  <button 
                    onClick={() => updateStatus(c._id, "In-Progress")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600"
                  >
                    Start Work
                  </button>
                )}

                {c.status === "In-Progress" && (
                  <button 
                    onClick={() => updateStatus(c._id, "Resolved")}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700"
                  >
                    Resolve
                  </button>
                )}

              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default ComplaintList