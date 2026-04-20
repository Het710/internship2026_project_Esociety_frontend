import React,{useState,useEffect} from 'react'
import axios from '../utils/axiosInstance'
import { toast } from 'react-toastify'

const EmergencyList = () => {
    const [alerts, setAlerts] = useState([])
    const [loading,setLoading] = useState(true)

    const user = JSON.parse(localStorage.getItem('user'))

    const getAlerts=async()=>{
        try {
            const res = await axios.get('/alerts')
            setAlerts(res.data?.data || [])
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getAlerts()
    },[])

    const handleResolve=async(id)=>{
        try {
            await axios.put(`/alerts/resolve/${id}`,{
                role:user?.role
            })
            toast.success("Alert resolved")
            getAlerts()
        } catch (error) {
            toast.error("Resolve failed")
        }
    }

    if(loading){
        return <h2 className="text-center mt-5 text-lg">Loading...</h2>
    }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🚨 Emergency Alerts
      </h2>

      {alerts.length === 0 ? (
        <p className="text-gray-500">No alerts available</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

          {alerts.map((a) => (
            <div key={a._id} className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">

              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-red-600">
                  {a.alertType}
                </h3>

                <span className={`text-xs px-2 py-1 rounded-full
                  ${a.priority === "High" && "bg-red-100 text-red-600"}
                  ${a.priority === "Medium" && "bg-yellow-100 text-yellow-600"}
                  ${a.priority === "Low" && "bg-green-100 text-green-600"}
                `}>
                  {a.priority}
                </span>
              </div>

              <p className="text-gray-700 mb-3">
                {a.message}
              </p>

              <p className="text-sm text-gray-500 mb-2">
                Status:
                <span className={`ml-1 font-medium
                  ${a.status === "Active" ? "text-red-500" : "text-green-600"}
                `}>
                  {a.status}
                </span>
              </p>

              {(user?.role === "Admin" || user?.role === "Security") && a.status === "Active" && (
                <button
                  onClick={() => handleResolve(a._id)}
                  className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-1 rounded-lg text-sm"
                >
                  Resolve
                </button>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default EmergencyList