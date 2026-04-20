import React, { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const NoticeList = () => {
    const [notices, setNotices] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))
    const isAdmin = user?.role === "Admin"

    const getNotices = async () => {
        try {
            const response = await axios.get('/notices')
            setNotices(response.data?.data || [])
        } catch (error) {
            console.error("Fetch Error:", error)
            toast.error("Could not fetch notices")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getNotices()
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this notice?")) return;

        try {
            await axios.delete(`/notices/${id}`)
            toast.success('Notice Deleted')
            getNotices() 
        } catch (error) {
            console.error("Delete Error:", error)
            toast.error('Delete failed')
        }
    }

    const handleEdit = (id) => {
        navigate(`/admin/noticeForm/${id}`)
    }

    if (loading) {
        return <h2 className='text-center mt-5 text-xl font-semibold'>Loading Notices...</h2>
    }

    return (
        <div className="p-5 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Notice Board</h2>
                {isAdmin && (
                    <button 
                        onClick={() => navigate('/admin/noticeForm')} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
                    >
                        + Create New Notice
                    </button>
                )}
            </div>

            {notices.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed">
                    <p className="text-gray-500">No active notices found.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {notices.map((n) => (
                        <div key={n._id} className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-blue-900">{n.title}</h3>
                                    <p className="text-gray-600 mt-2 leading-relaxed">{n.description}</p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between border-t pt-4 text-sm text-gray-500">
                                <div className="space-y-1">
                                    <p>
                                        <span className="font-medium">Posted By:</span> {n.postedBy ? `${n.postedBy.firstName} ${n.postedBy.lastName}` : "Admin"}
                                    </p>
                                    {n.expiryDate && (
                                        <p className="text-red-500 font-medium">
                                            Expires: {new Date(n.expiryDate).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>

                                {isAdmin && (
                                    <div className="flex gap-3 mt-3 sm:mt-0">
                                        <button 
                                            onClick={() => handleEdit(n._id)} 
                                            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md font-medium transition-colors shadow-sm'
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(n._id)} 
                                            className='bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md font-medium transition-colors shadow-sm'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NoticeList