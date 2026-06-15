import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function SkillLoops() {
  const [loops, setLoops] = useState([])

  useEffect(() => {
    api.get('/users/loops').then(r => setLoops(r.data.loops))
  }, [])

  return (
    <div className='max-w-2xl'>
      <h1 className='text-3xl font-semibold tracking-tight mb-1'>Skill Loops</h1>
      <p className='text-sm text-muted-light dark:text-muted-dark mb-8'>Circular skill chains where everyone teaches and learns</p>
      {loops.length === 0
        ? <div className='flex flex-col items-center py-16 text-center'>
            <p className='text-3xl mb-3'>↻</p>
            <p className='font-medium mb-1'>No loops detected yet</p>
            <p className='text-sm text-muted-light dark:text-muted-dark'>More users with complementary skills needed to form a chain.</p>
         </div>
        : loops.map((loop, i) => (
          <div key={i} className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-5 mb-4'>
            <p className='text-xs font-medium uppercase tracking-widest text-muted-light dark:text-muted-dark mb-3'>Loop {i + 1}</p>
            <div className='flex items-center flex-wrap gap-2'>
              {loop.map((user, j) => (
                <span key={user._id} className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>{user.name}</span>
                  {j < loop.length - 1 && <span className='text-accent-light dark:text-accent-dark text-xs'>→</span>}
                </span>
              ))}
              <span className='text-accent-light dark:text-accent-dark text-xs'>→ back to start</span>
            </div>
          </div>
        ))
      }
    </div>
  )
}