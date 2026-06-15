import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const skills1 = ['React', 'Guitar', 'Python', 'Spanish', 'Figma', 'Node.js', 'Photography', 'DSA']
const skills2 = ['UI Design', 'MongoDB', 'Music Theory', 'TypeScript', 'Sketching', 'DevOps', 'French', 'ML']

export default function Home() {
  const { user } = useAuth()

  return (
    <div>
      {/* Hero */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 mb-24 items-center'>
        <div>
          <p className='text-xs font-medium uppercase tracking-widest text-accent-light dark:text-accent-dark mb-4'>Peer skill exchange</p>
          <h1 className='text-5xl font-extrabold tracking-tight leading-tight mb-5'>
  Trade what you <span className='text-accent-light dark:text-accent-dark'>know.</span><br />Learn what you don't.
</h1>
          <p className='text-muted-light dark:text-muted-dark mb-8 text-base'>No money. No subscriptions. Just people teaching each other what they know.</p>
          <div className='flex gap-3'>
            <Link to={user ? '/browse' : '/register'} className='btn-primary px-6 py-2.5'>Get started</Link>
            <Link to='/browse' className='btn-ghost px-6 py-2.5'>Browse skills</Link>
          </div>
        </div>

        {/* Floating match cards */}
        <div className='relative h-64 hidden md:block'>
          <div className='absolute top-0 left-8 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 w-64 shadow-lg rotate-[-2deg]'>
            <p className='text-xs text-muted-light dark:text-muted-dark mb-2'>Skill match found</p>
            <p className='text-sm font-medium'>Aryan R. <span className='text-accent-light dark:text-accent-dark'>→</span> Meera S.</p>
            <p className='text-xs text-muted-light dark:text-muted-dark mt-1'>React ↔ Python</p>
          </div>
          <div className='absolute top-16 left-24 bg-surface-light dark:bg-surface-dark border border-accent-light/30 dark:border-accent-dark/30 rounded-xl p-4 w-64 shadow-xl rotate-[1.5deg]'>
            <p className='text-xs text-accent-light dark:text-accent-dark mb-2'>Loop detected ↻</p>
            <p className='text-sm font-medium'>A → B → C → A</p>
            <p className='text-xs text-muted-light dark:text-muted-dark mt-1'>React · Python · Guitar</p>
          </div>
          <div className='absolute top-32 left-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 w-56 shadow-md rotate-[-1deg]'>
            <p className='text-xs text-muted-light dark:text-muted-dark mb-2'>AI explanation</p>
            <p className='text-xs'>"Strong match — complementary skills with aligned learning goals."</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className='flex gap-8 mb-16 border-y border-border-light dark:border-border-dark py-6'>
        {[['2,400+', 'Skills listed'], ['180+', 'Active loops'], ['940+', 'Matches made']].map(([num, label]) => (
          <div key={label}>
            <p className='text-2xl font-semibold tracking-tight'>{num}</p>
            <p className='text-xs text-muted-light dark:text-muted-dark'>{label}</p>
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div className='overflow-hidden mb-20'>
        <style>{`
          @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          @keyframes marquee-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
          .marquee { animation: marquee 20s linear infinite; display: flex; width: max-content; }
          .marquee-rev { animation: marquee-rev 20s linear infinite; display: flex; width: max-content; }
        `}</style>
        <div className='marquee gap-2 mb-2'>
          {[...skills1, ...skills1].map((s, i) => (
            <span key={i} className='text-xs px-3 py-1.5 rounded-full border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark mr-2 whitespace-nowrap'>{s}</span>
          ))}
        </div>
        <div className='marquee-rev gap-2'>
          {[...skills2, ...skills2].map((s, i) => (
            <span key={i} className='text-xs px-3 py-1.5 rounded-full border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark mr-2 whitespace-nowrap'>{s}</span>
          ))}
        </div>
      </div>

      {/* Features — asymmetric */}
      <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3 mb-20'>
        <div className='md:col-span-1 md:row-span-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6 flex flex-col justify-between'>
          <div>
            <p className='text-xs font-medium uppercase tracking-widest text-accent-light dark:text-accent-dark mb-3'>Match</p>
            <p className='text-lg font-medium tracking-tight mb-2'>Find your perfect skill exchange</p>
            <p className='text-sm text-muted-light dark:text-muted-dark'>Browse users, filter by skill, and send barter requests. No middleman, no fees.</p>
          </div>
          <Link to='/browse' className='text-xs text-accent-light dark:text-accent-dark mt-4'>Browse now →</Link>
        </div>
        <div className='md:col-span-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6'>
          <p className='text-xs font-medium uppercase tracking-widest text-accent-light dark:text-accent-dark mb-3'>Loop</p>
          <p className='text-lg font-medium tracking-tight mb-2'>No direct match? We find the chain.</p>
          <p className='text-sm text-muted-light dark:text-muted-dark'>A teaches B, B teaches C, C teaches A — everyone learns, everyone wins. Powered by graph cycle detection.</p>
        </div>
        <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6'>
          <p className='text-xs font-medium uppercase tracking-widest text-accent-light dark:text-accent-dark mb-3'>AI</p>
          <p className='text-sm font-medium mb-1'>Smart match explanations</p>
          <p className='text-xs text-muted-light dark:text-muted-dark'>Gemini AI explains why each match is a good fit.</p>
        </div>
        <div className='bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-6'>
          <p className='text-xs font-medium uppercase tracking-widest text-accent-light dark:text-accent-dark mb-3'>Learn</p>
          <p className='text-sm font-medium mb-1'>Build your resource library</p>
          <p className='text-xs text-muted-light dark:text-muted-dark'>Share links, notes, and resources. Reuse them in future barters.</p>
        </div>
      </div>
    </div>
  )
}