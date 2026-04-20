import React, { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'

const VisitorList = () => {
  const [visitors, setVisitors] = useState([])
  const [loading, setLoading] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.role

  const getVisitors = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/visitors')
      setVisitors(res.data?.data || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getVisitors()
  }, [])

  const handleApproval = async (id, status) => {
    try {
      await axios.put(`/visitors/status/${id}`, {
        approvalStatus: status
      })
      getVisitors()
    } catch (error) {
      console.log(error)
    }
  }

  const handleExit = async (id) => {
    try {
      await axios.put(`/visitors/exit/${id}`)
      getVisitors()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/visitors/${id}`)
      getVisitors()
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return <h2 className='text-center mt-5'>Loading...</h2>
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Visitors</h2>

      {visitors.length === 0 ? (
        <p className="text-gray-500">No visitors found</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {visitors.map((v) => (
            <div key={v._id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">

              <h3 className="font-semibold text-lg text-blue-600">{v.visitorName}</h3>
              <p className="text-sm text-gray-500 mb-2">{v.visitType}</p>

              {v.visitorPhoto && (
                <img
                  src={v.visitorPhoto}
                  alt="visitor"
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}

              <p className="font-semibold mb-2">
                Status:
                <span className={`ml-2 px-2 py-1 text-sm rounded-full
                  ${v.approvalStatus === "Approved" && "bg-green-100 text-green-600"}
                  ${v.approvalStatus === "Denied" && "bg-red-100 text-red-600"}
                  ${v.approvalStatus === "Pending" && "bg-yellow-100 text-yellow-600"}
                `}>
                  {v.approvalStatus}
                </span>
              </p>

              {role === "Resident" && v.approvalStatus === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApproval(v._id, "Approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleApproval(v._id, "Denied")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600"
                  >
                    Reject
                  </button>
                </div>
              )}

              {role === "Security" && v.approvalStatus === "Approved" && !v.exitTime && (
                <button
                  onClick={() => handleExit(v._id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
                >
                  Mark Exit
                </button>
              )}

              {role === "Security" && (
                <button
                  onClick={() => handleDelete(v._id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VisitorList