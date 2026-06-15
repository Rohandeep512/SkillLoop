import { useState } from 'react'
import api from '../api/axios'

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
    <div className='max-w-2xl'>
      <h1 className='text-3xl font-semibold tracking-tight mb-1'>Learning Roadmap</h1>
      <p className='text-sm text-muted-light dark:text-muted-dark mb-8'>AI-generated path from beginner to advanced</p>
      <div className='flex gap-3 mb-10'>
        <input className='input' placeholder='Enter a skill e.g. React' value={skill} onChange={e => setSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && generate()} />
        <button className='btn-primary whitespace-nowrap' onClick={generate}>{loading ? 'Generating...' : 'Generate'}</button>
      </div>
      {roadmap?.stages?.map((stage, i) => (
        <div key={i} className='mb-8 pl-4 border-l-2 border-accent-light dark:border-accent-dark'>
          <p className='text-xs font-medium uppercase tracking-widest text-accent-light dark:text-accent-dark mb-2'>{stage.level}</p>
          <ul className='flex flex-col gap-1 mb-2'>
            {stage.topics.map(t => <li key={t} className='text-sm'>{t}</li>)}
          </ul>
          <a href={stage.resource} target='_blank' rel='noreferrer' className='text-xs text-muted-light dark:text-muted-dark hover:text-accent-light dark:hover:text-accent-dark'>
            {stage.resource} ↗
          </a>
        </div>
      ))}
    </div>
  )
}