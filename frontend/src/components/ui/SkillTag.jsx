export default function SkillTag({ label, variant = 'default' }) {
  const styles = {
    default: 'bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-primary-light dark:text-primary-dark',
    green: 'bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark border border-accent-light/20 dark:border-accent-dark/20',
  }
  return <span className={`text-xs px-2.5 py-1 rounded-full ${styles[variant]}`}>{label}</span>
}