import { useState } from 'react'
import api from '../api/axios'
import { Sparkles, BookOpen, ChevronRight } from 'lucide-react'

export default function Roadmap() {
  const [skill, setSkill] = useState('')
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    if (!skill.trim()) return
    setLoading(true)
    try {
      const { data } = await api.post('/roadmap', { skill })
      setRoadmap(data)
    } catch { alert('Could not generate roadmap') }
    setLoading(false)
  }

  return (
    <div className='max-w-4xl mx-auto px-4 py-12'>
      <div className="mb-10">
        <h1 className='text-4xl font-black tracking-tighter mb-2 text-gray-900 dark:text-white'>Learning Roadmap</h1>
        <p className='text-lg text-gray-600 dark:text-gray-400'>AI-generated path from beginner to advanced.</p>
      </div>

      <div className='flex gap-3 mb-12 bg-white dark:bg-gray-900 p-2 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm'>
        <input className='flex-1 bg-transparent px-6 py-4 outline-none text-lg' placeholder='Enter a skill e.g. React' value={skill} onChange={e => setSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && generate()} />
        <button className='bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-bold transition-all' onClick={generate}>
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </div>

      <div className="space-y-6">
        {roadmap?.stages?.map((stage, i) => (
          <div key={i} className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex gap-6 hover:border-green-500/30 transition-all'>
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400 font-black text-xl">
              {i + 1}
            </div>
            <div className='flex-1'>
              <p className='text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-400 mb-2'>{stage.level}</p>
              <ul className='flex flex-wrap gap-2 mb-4'>
                {stage.topics.map(t => <li key={t} className='text-sm font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300'>{t}</li>)}
              </ul>
              <a href={stage.resource} target='_blank' rel='noreferrer' className='inline-flex items-center gap-1 text-sm font-bold text-gray-900 dark:text-white hover:text-green-500'>
                View Resource <ChevronRight size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}