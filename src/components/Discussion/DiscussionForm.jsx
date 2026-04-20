import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const DiscussionForm = ({ onPostSuccess }) => {
  const { register, handleSubmit, reset } = useForm();
  const [type, setType] = useState('discussion');
  const [options, setOptions] = useState(['', '']);

  const submitHandler = async (data) => {
    try {
      const payload = { ...data, type, options: type === 'poll' ? options : [] };
      await axios.post('/discussions/create', payload);
      toast.success("Broadcasted to community!");
      reset();
      setOptions(['', '']);
      onPostSuccess();
    } catch (err) {
      toast.error("Failed to post");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden">
      <div className="flex border-b">
        <button 
          type="button"
          onClick={() => setType('discussion')}
          className={`flex-1 py-4 font-bold text-sm transition-all ${type === 'discussion' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-gray-400 hover:bg-gray-50'}`}
        >
          📝 Write Post
        </button>
        <button 
          type="button"
          onClick={() => setType('poll')}
          className={`flex-1 py-4 font-bold text-sm transition-all ${type === 'poll' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' : 'text-gray-400 hover:bg-gray-50'}`}
        >
          📊 Create Poll
        </button>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="p-6 space-y-4">
        <input 
          {...register("title", { required: true })} 
          placeholder="Topic Title"
          className="w-full text-lg font-bold outline-none placeholder:text-gray-300"
        />
        
        <textarea 
          {...register("content", { required: true })} 
          placeholder="What's happening in our society?"
          rows="3"
          className="w-full resize-none outline-none text-gray-600 placeholder:text-gray-300"
        />

        {type === 'poll' && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Poll Options</p>
            {options.map((opt, i) => (
              <input 
                key={i} value={opt} 
                onChange={(e) => {
                  const newOpts = [...options];
                  newOpts[i] = e.target.value;
                  setOptions(newOpts);
                }}
                placeholder={`Option ${i + 1}`}
                className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 focus:border-indigo-300 outline-none text-sm transition-all"
              />
            ))}
            <button 
              type="button" 
              onClick={() => setOptions([...options, ''])}
              className="text-indigo-600 text-xs font-bold hover:underline"
            >
              + Add another option
            </button>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button className="bg-indigo-600 text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all">
            Post to Feed
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiscussionForm;