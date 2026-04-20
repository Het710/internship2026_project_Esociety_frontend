import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import DiscussionForm from './DiscussionForm';
import DiscussionCard from './DiscussionCard';

const DiscussionFeed = () => {
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);

  const user=JSON.parse(localStorage.getItem('user'))
  const isAdmin = user?.role === 'Admin'

  const fetchDiscussions = async () => {
    try {
      const res = await axios.get('/discussions');
      setDiscussions(res.data.data);
    } catch (err) {
      console.error("Error fetching feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDiscussions(); }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Community Hub</h1>
          <p className="text-gray-500 mt-2">Discuss, Vote, and Grow together.</p>
        </header>

        <DiscussionForm onPostSuccess={fetchDiscussions} />

        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            discussions.map((item) => (
              <DiscussionCard key={item._id} discussion={item} onRefresh={fetchDiscussions} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionFeed;