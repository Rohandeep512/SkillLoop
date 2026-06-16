import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import SkillTag from './SkillTag'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'

export default function BarterRequestCard({ request, onUpdate }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [rated, setRated] = useState(() => !!localStorage.getItem(`rated_${request._id}`))

  const isReceiver = request.receiver._id === user.id
  const other = isReceiver ? request.sender : request.receiver

  const updateStatus = async (status) => {
    await api.put(`/barter/${request._id}`, { status })
    onUpdate()
  }

  const submitRating = async () => {
    if (!rating) return
    await api.post(`/users/rate/${other._id}`, { rating })
    localStorage.setItem(`rated_${request._id}`, true)
    setRated(true)
  }

  return (
    <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-soft transition-all duration-300 hover:border-accent-light/50 hover:shadow-lg'>
      <div className='flex justify-between items-start mb-6'>
        <div>
          <p className='text-lg font-black text-gray-900 dark:text-white'>{other.name}</p>
          <div className='flex gap-2 mt-3'>
            <SkillTag label={`Offers ${request.skillOffered}`} variant='green' />
            <SkillTag label={`Wants ${request.skillWanted}`} />
          </div>
        </div>
        
        <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${
          request.status === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
          request.status === 'rejected' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
        }`}>
          {request.status}
        </span>
      </div>
      
      {/* Action Bar */}
      <div className='flex items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800'>
        {isReceiver && request.status === 'pending' ? (
          <div className='flex gap-3 w-full'>
            <button onClick={() => updateStatus('accepted')} className='flex-1 bg-accent-light hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all'>Accept</button>
            <button onClick={() => updateStatus('rejected')} className='flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 rounded-xl transition-all'>Reject</button>
          </div>
        ) : request.status === 'accepted' ? (
          <button onClick={() => navigate(`/resources/${request._id}`)} className='text-accent-light dark:text-accent-dark font-bold hover:underline flex items-center gap-1'>
            View Resources →
          </button>
        ) : <div/>}

        {/* Rating Area */}
        {request.status === 'accepted' && (
          <div className='flex items-center gap-2'>
            {!rated ? (
              <div className='flex items-center gap-1'>
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} onClick={() => setRating(s)} className={`text-2xl transition-all ${s <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-700'}`}>★</button>
                ))}
                {rating > 0 && <button onClick={submitRating} className='bg-green-500 text-white font-bold px-4 py-2 rounded-lg ml-2'>Submit</button>}
              </div>
            ) : <p className='text-sm font-bold text-green-500'>Rated ✓</p>}
          </div>
        )}
      </div>
    </div>
  )
}