import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { RefreshCcw, User, ArrowRight } from 'lucide-react'

export default function SkillLoops() {
  const [loops, setLoops] = useState([])
  const [joined, setJoined] = useState({})
  const { user } = useAuth()

  useEffect(() => {
  api.get('/users/loops').then(r => {
    const all = r.data.loops
    const sorted = [...all].sort((a, b) => {
      const aIn = a.some(u => u._id === user?.id)
      const bIn = b.some(u => u._id === user?.id)
      return bIn - aIn
    })
    setLoops(sorted)
  })
}, [])

  const joinLoop = async (loop, i) => {
    try {
      const userIds = loop.map(u => u._id)
      await api.post('/barter/loop', { userIds })
      setJoined(p => ({ ...p, [i]: true }))
    } catch { alert('Could not join loop') }
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <div className="mb-10">
        <h1 className='text-4xl font-black tracking-tighter mb-2 text-gray-900 dark:text-white'>Skill Loops</h1>
        <p className='text-lg text-gray-600 dark:text-gray-400'>Circular skill chains where everyone teaches and learns.</p>
      </div>

      {loops.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl text-center border-dashed'>
          <div className="p-4 bg-green-50 dark:bg-green-500/10 rounded-full mb-4">
            <RefreshCcw className="w-8 h-8 text-green-500" />
          </div>
          <p className='text-xl font-bold mb-1 text-gray-900 dark:text-white'>No loops detected yet</p>
          <p className='text-sm text-gray-500 dark:text-gray-400 max-w-sm'>Keep building your profile. More users with complementary skills are needed to form a chain.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {loops.map((loop, i) => {
            const inLoop = loop.some(u => u._id === user?.id)
            return (
              <div key={i} className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5'>
                <div className="flex items-center justify-between mb-8">
                  <span className='text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full'>Loop #{i + 1}</span>
                  <RefreshCcw className="w-5 h-5 text-gray-400" />
                </div>
                <div className='flex items-center flex-wrap gap-3'>
                  {loop.map((u) => (
                    <div key={u._id} className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className='text-sm font-bold text-gray-900 dark:text-white'>{u.name}</span>
                      </div>
                      <ArrowRight className='w-5 h-5 text-green-500/50' />
                    </div>
                  ))}
                  {inLoop && (
                    <button
                      onClick={() => joinLoop(loop, i)}
                      disabled={joined[i]}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all ${joined[i] ? 'text-gray-400 border-gray-300 dark:border-gray-700 cursor-default' : 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 hover:bg-green-100 dark:hover:bg-green-500/20'}`}
                    >
                      <RefreshCcw className="w-4 h-4" />
                      {joined[i] ? 'Joined ✓' : 'Join Loop'}
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}