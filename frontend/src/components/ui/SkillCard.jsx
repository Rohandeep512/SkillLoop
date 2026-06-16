import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import SkillTag from './SkillTag'
import { Sparkles } from 'lucide-react'

export default function SkillCard({ user }) {
  const { user: me } = useAuth()
  const navigate = useNavigate()
  const [aiNote, setAiNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(() => user?._id ? !!localStorage.getItem(`sent_${user._id}`) : false)

  const sendRequest = async () => {
    if (!me) return navigate('/login')
    try {
        const { data: myProfile } = await api.get('/users/me')
        await api.post('/barter', {
          receiver: user._id,
          skillOffered: myProfile.skillsOffered?.[0] || 'General',
          skillWanted: user.skillsOffered?.[0] || 'General',
        })
        setSent(true)
        localStorage.setItem(`sent_${user._id}`, true)
    } catch (err) { console.error(err) }
  }

  const fetchAI = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`/users/ai-match/${user._id}`)
      setAiNote(data.explanation)
    } catch { setAiNote('Could not load explanation') }
    setLoading(false)
  }

  return (
    <div className='group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 transition-all duration-500 ease-out hover:border-green-500/30 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/40 hover:-translate-y-1'>
      <div className='flex justify-between items-start mb-4'>
        <div>
          <p className='font-bold text-lg text-gray-900 dark:text-white'>{user.name}</p>
          <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>{user.bio || 'No bio yet'}</p>
        </div>
        <div className='flex gap-2'>
          <button 
            onClick={fetchAI} 
            className='flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-gray-700 transition-colors'
          >
            <Sparkles size={14} className="text-green-500" />
            {loading ? '...' : 'AI Match'}
          </button>
          <button 
            onClick={sendRequest} 
            disabled={sent} 
            className={`text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 ${
              sent 
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 active:scale-95'
            }`}
          >
            {sent ? 'Sent ✓' : 'Request'}
          </button>
        </div>
      </div>
      
      <div className='flex flex-wrap gap-2 mb-4'>
        {user.skillsOffered?.map(s => <SkillTag key={s} label={`Teaches ${s}`} variant='green' />)}
        {user.skillsWanted?.map(s => <SkillTag key={s} label={`Wants ${s}`} />)}
      </div>
      
      {aiNote && (
        <div className='bg-green-50 dark:bg-green-900/10 border-l-2 border-green-500 pl-4 py-2 mt-4 animate-in fade-in slide-in-from-left-2 duration-500'>
          <p className='text-xs text-green-800 dark:text-green-300 italic'>{aiNote}</p>
        </div>
      )}
    </div>
  )
}