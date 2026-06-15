import { useAuth } from '../../context/AuthContext'
import SkillTag from './SkillTag'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'

export default function BarterRequestCard({ request, onUpdate }) {
  const { user } = useAuth()
  const navigate = useNavigate()
 const isReceiver = request.receiver._id === user.id

  const updateStatus = async (status) => {
    await api.put(`/barter/${request._id}`, { status })
    onUpdate()
  }

  const other = isReceiver ? request.sender : request.receiver

  return (
    <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-5'>
      <div className='flex justify-between items-start'>
        <div>
          <p className='font-medium'>{other.name}</p>
          <div className='flex gap-2 mt-2'>
            <SkillTag label={`Offers ${request.skillOffered}`} variant='green' />
            <SkillTag label={`Wants ${request.skillWanted}`} />
          </div>
        </div>
        <div className='flex flex-col items-end gap-2'>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            request.status === 'accepted' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            request.status === 'rejected' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
          }`}>{request.status}</span>
          {isReceiver && request.status === 'pending' && (
            <div className='flex gap-2'>
              <button onClick={() => updateStatus('accepted')} className='btn-primary text-xs py-1'>Accept</button>
              <button onClick={() => updateStatus('rejected')} className='btn-ghost text-xs py-1'>Reject</button>
            </div>
          )}
          {request.status === 'accepted' && (
            <button onClick={() => navigate(`/resources/${request._id}`)} className='btn-ghost text-xs py-1'>Resources →</button>
          )}
        </div>
      </div>
    </div>
  )
}