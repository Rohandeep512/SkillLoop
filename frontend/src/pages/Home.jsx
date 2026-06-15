import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const skills1 = ['React', 'Guitar', 'Python', 'Spanish', 'Figma', 'Node.js', 'Photography', 'DSA', 'AWS']
const skills2 = ['UI Design', 'MongoDB', 'Music Theory', 'TypeScript', 'Sketching', 'DevOps', 'French', 'ML', 'Docker']

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16 mb-24 items-center relative'>
        
        {/* Background glow effect */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/20 dark:bg-green-500/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className='z-10'>
          <div className='inline-flex items-center px-4 py-1.5 mb-6 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm'>
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
            <p className='text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-400'>
              Peer-to-Peer Skill Exchange
            </p>
          </div>
          
          <h1 className='text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] mb-6 text-gray-900 dark:text-white'>
            Welcome to <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 dark:from-green-400 dark:to-emerald-300'>
              SkillLoop.
            </span>
          </h1>
          
          <p className='text-xl md:text-2xl font-bold tracking-tight text-gray-700 dark:text-gray-300 mb-4'>
            Trade what you know. Learn what you don't.
          </p>
          
          <p className='text-gray-600 dark:text-gray-400 mb-8 text-lg max-w-md leading-relaxed'>
            No money. No subscriptions. Just a community of learners teaching each other what they know best.
          </p>
          
          <div className='flex flex-wrap gap-4'>
            <Link to={user ? '/browse' : '/register'} className='bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-1 transition-all duration-300'>
              Get started
            </Link>
            <Link to='/browse' className='px-8 py-3.5 rounded-full font-bold border-2 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:border-green-500/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300'>
              Browse skills
            </Link>
          </div>
        </div>

        {/* Floating match cards - Glassmorphism */}
        <div className='relative h-[450px] hidden lg:block perspective-1000'>
          
          {/* Card 1 */}
          <div className='absolute top-4 left-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-6 w-80 shadow-2xl rotate-[-3deg] hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 z-20 cursor-default'>
            <div className="flex items-center justify-between mb-4">
              <p className='text-xs font-black text-gray-500 uppercase tracking-widest'>Skill Match</p>
              <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <p className='text-xl font-bold text-gray-900 dark:text-white flex items-center'>
              Rohan <span className='text-green-500 mx-2 text-2xl'>⇄</span> Aditya
            </p>
            <div className='mt-4 flex gap-2'>
              <span className="text-xs font-bold px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300">Node.js</span>
              <span className="text-xs font-bold px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300">MongoDB</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className='absolute top-40 left-28 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-green-500/30 rounded-3xl p-6 w-80 shadow-[0_0_40px_rgba(74,222,128,0.15)] rotate-[2deg] hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 z-30 cursor-default'>
            <p className='text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-widest mb-3 flex items-center gap-1.5'>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              Loop Detected
            </p>
            <p className='text-xl font-bold text-gray-900 dark:text-white tracking-tight'>A → B → C → A</p>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-2 font-medium'>React · Python · Guitar</p>
          </div>

          {/* Card 3 */}
          <div className='absolute top-80 left-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-3xl p-6 w-72 shadow-xl rotate-[-2deg] hover:rotate-0 hover:scale-105 hover:z-40 transition-all duration-500 z-10 cursor-default'>
            <p className='text-xs font-black text-blue-500 uppercase tracking-widest mb-3'>AI Explanation</p>
            <p className='text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium italic'>"Strong match — complementary skills with highly aligned learning goals."</p>
          </div>
        </div>
      </div>

      {/* Elegant Stats Banner */}
      <div className='flex flex-wrap justify-center md:justify-start gap-12 mb-20 py-8 border-y border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-sm px-8 rounded-3xl'>
        {[['2,400+', 'Skills listed'], ['180+', 'Active loops'], ['940+', 'Matches made']].map(([num, label]) => (
          <div key={label} className="text-center md:text-left">
            <p className='text-3xl font-black tracking-tight text-gray-900 dark:text-white'>{num}</p>
            <p className='text-sm font-semibold tracking-wide uppercase text-gray-500 mt-1'>{label}</p>
          </div>
        ))}
      </div>

      {/* Marquee with fade edges */}
      <div className='overflow-hidden mb-24 relative' style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <style>{`
          @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          @keyframes marquee-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
          .marquee { animation: marquee 25s linear infinite; display: flex; width: max-content; }
          .marquee-rev { animation: marquee-rev 25s linear infinite; display: flex; width: max-content; }
          .marquee:hover, .marquee-rev:hover { animation-play-state: paused; }
        `}</style>
        
        <div className='marquee gap-3 mb-3'>
          {[...skills1, ...skills1].map((s, i) => (
            <span key={i} className='text-sm font-bold px-5 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 mr-3 whitespace-nowrap shadow-sm hover:border-green-500/50 hover:text-green-500 transition-colors cursor-default'>
              {s}
            </span>
          ))}
        </div>
        <div className='marquee-rev gap-3'>
          {[...skills2, ...skills2].map((s, i) => (
            <span key={i} className='text-sm font-bold px-5 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 mr-3 whitespace-nowrap shadow-sm hover:border-green-500/50 hover:text-green-500 transition-colors cursor-default'>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Features — Bento Box Style */}
      <div className='grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 mb-12'>
        
        {/* Primary Vertical Card (Match) */}
        <div className='md:col-span-1 md:row-span-2 relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500'>
          {/* Subtle accent glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/20 dark:bg-green-500/10 rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-700"></div>
          
          <div className='relative z-10'>
            <p className='text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-400 mb-5 flex items-center gap-2'>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Match
            </p>
            <p className='text-3xl font-black tracking-tight mb-4 text-gray-900 dark:text-white leading-snug'>Find your perfect skill exchange.</p>
            <p className='text-base font-medium text-gray-600 dark:text-gray-400 leading-relaxed'>Browse users, filter by skill, and send barter requests. No middleman, no fees.</p>
          </div>
          
          <Link to='/browse' className='relative z-10 inline-flex items-center w-fit mt-10 text-sm font-bold text-green-600 dark:text-green-400 group-hover:text-emerald-500 transition-colors'>
            Browse now <span className="ml-1.5 transition-transform group-hover:translate-x-1.5">→</span>
          </Link>
        </div>

        {/* Horizontal Span Card (Loop) */}
        <div className='md:col-span-2 relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 transition-all duration-500'>
          {/* Top glowing highlight line */}
          <div className="absolute top-0 right-0 w-full h-[3px] bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <p className='text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-400 mb-4 flex items-center gap-2'>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            The Loop
          </p>
          <p className='text-2xl font-black tracking-tight mb-3 text-gray-900 dark:text-white'>No direct match? We find the chain.</p>
          <p className='text-base font-medium text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed'>A teaches B, B teaches C, C teaches A — everyone learns, everyone wins. Powered by advanced graph cycle detection.</p>
        </div>

        {/* Small Card 1 (AI) */}
        <div className='relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 transition-all duration-500'>
          <p className='text-xs font-black uppercase tracking-widest text-blue-500 mb-4 flex items-center gap-2'>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            AI Powered
          </p>
          <p className='text-xl font-black mb-3 text-gray-900 dark:text-white tracking-tight'>Smart insights</p>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed'>OpenRouter AI explains exactly why each match makes sense.</p>
        </div>

        {/* Small Card 2 (Learn) */}
        <div className='relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 group hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 transition-all duration-500'>
          <p className='text-xs font-black uppercase tracking-widest text-orange-500 mb-4 flex items-center gap-2'>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            Learn
          </p>
          <p className='text-xl font-black mb-3 text-gray-900 dark:text-white tracking-tight'>Build your library</p>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed'>Share links, notes, and resources. Reuse them in future barters.</p>
        </div>
      </div>
      
    </div>
  )
}