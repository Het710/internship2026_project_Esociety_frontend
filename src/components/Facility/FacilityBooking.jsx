import React, { useState, useEffect } from 'react'
import axios from '../utils/axiosInstance'
import { toast } from 'react-toastify'

const FacilityBooking = () => {
  const [facilities, setFacilities] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))

  // ✅ LOAD RAZORPAY SCRIPT
  const loadRazorPay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true)

      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)

      document.body.appendChild(script)
    })
  }

  // ✅ FETCH FACILITIES
  const getFacilities = async () => {
    try {
      const res = await axios.get('/facilities')
      setFacilities(res.data?.data)
    } catch (error) {
      toast.error('Error fetching facilities')
    }
  }

  // ✅ FETCH BOOKINGS
  const getBookings = async () => {
    try {
      const res = await axios.get('/bookings')
      setBookings(res.data?.data)
    } catch (error) {
      toast.error('Error fetching bookings')
    }
  }

  useEffect(() => {
    getFacilities()
    getBookings()
  }, [])

  // ✅ CREATE BOOKING
  const handleBooking = async (facilityId) => {
    try {
      setLoading(true)

      await axios.post('/bookings', {
        facilityId,
        bookingDate: new Date(),
        timeSlot: '10AM-12PM'
      })

      toast.success("Booking created")
      getBookings()

    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed")
    } finally {
      setLoading(false)
    }
  }

  // ✅ HANDLE PAYMENT (RAZORPAY)
  const handlePayment = async (booking) => {
    try {
      const loaded = await loadRazorPay()

      if (!loaded) {
        toast.error("Razorpay SDK failed to load")
        return
      }

      // STEP 1: CREATE ORDER + PAYMENT
      const res = await axios.post('/razorpay/create-order', {
        bookingId: booking._id,
        amount: booking.amount,
        paymentType: "Booking",
        paymentMethod: "UPI"
      })

      const { order, paymentId } = res.data

      // STEP 2: RAZORPAY OPTIONS
      const options = {
        key: "rzp_test_SdiRFJRo48X9fM",
        amount: order.amount,
        currency: "INR",
        name: "E-Society",
        description: "Facility Booking Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            await axios.post('/razorpay/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking._id,
              paymentId: paymentId
            })

            toast.success("Payment Successful 🎉")
            getBookings()

          } catch (err) {
            toast.error("Verification Failed ❌")
          }
        },

        prefill: {
          name: user?.firstName || "User",
          email: user?.email || "test@test.com"
        },

        theme: {
          color: "#3B82F6"
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.log(error)
      toast.error("Payment Failed ❌")
    }
  }

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Facilities Booking 🏢
      </h2>

      {/* FACILITIES */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {facilities.map((f) => (
          <div key={f._id} className="bg-white shadow-lg rounded-xl p-5 hover:shadow-xl transition">

            <h3 className="text-xl font-bold text-blue-600">{f.name}</h3>
            <p className="text-gray-600 mt-2">{f.description}</p>

            <p className="mt-2 font-semibold">
              Price: ₹{f.basePrice}
            </p>

            <p className={`mt-1 text-sm ${f.availability ? "text-green-500" : "text-red-500"}`}>
              {f.availability ? "Available" : "Not Available"}
            </p>

            <button
              onClick={() => handleBooking(f._id)}
              disabled={!f.availability || loading}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Book Now
            </button>

          </div>
        ))}
      </div>

      {/* BOOKINGS */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        My Bookings 📅
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white shadow-md rounded-xl p-5">

            <h3 className="font-semibold text-lg text-blue-600">
              {b.facilityId?.name}
            </h3>

            <p className="text-gray-600">
              Date: {new Date(b.bookingDate).toLocaleDateString()}
            </p>

            <p className="text-gray-600">
              Slot: {b.timeSlot}
            </p>

            <p className="font-semibold mt-2">
              Amount: ₹{b.amount}
            </p>

            <p className="mt-1">
              Payment:
              <span className={
                b.paymentStatus === "Paid"
                  ? "text-green-500 ml-1"
                  : "text-red-500 ml-1"
              }>
                {b.paymentStatus}
              </span>
            </p>

            {b.paymentStatus === "Pending" && (
              <button
                onClick={() => handlePayment(b)}
                className="mt-3 bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
              >
                Pay Now 💳
              </button>
            )}

          </div>
        ))}
      </div>

    </div>
  )
}

export default FacilityBooking