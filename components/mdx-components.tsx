import CopyButton from './copy-button'
import CodeBlock from './code-block'

// Custom MDX components used when rendering docs
const mdxComponents = {
  // Override pre element to add copy button
  pre: CodeBlock,

  // Callout boxes for tips, warnings, info, danger
  Callout: ({
    type = 'info',
    children,
  }: {
    type?: 'info' | 'warning' | 'tip' | 'danger'
    children: React.ReactNode
  }) => {
    const styles = {
      info: 'bg-blue-500/10 border-l-4 border-blue-500 text-blue-200',
      warning: 'bg-yellow-500/10 border-l-4 border-yellow-500 text-yellow-200',
      tip: 'bg-green-500/10 border-l-4 border-green-500 text-green-200',
      danger: 'bg-red-500/10 border-l-4 border-red-500 text-red-200',
    }
    const icons = { info: 'ℹ️', warning: '⚠️', tip: '💡', danger: '🚨' }

    return (
      <div className={`rounded-r-lg px-5 py-4 my-6 ${styles[type]}`}>
        <span className="mr-2 text-lg">{icons[type]}</span>
        <span className="text-sm leading-relaxed">{children}</span>
      </div>
    )
  },

  // Inline command with copy button
  Command: ({ children }: { children: string }) => (
    <div className="flex items-center justify-between gap-3 bg-[#0a0a14] border border-gold/20 rounded-lg px-4 py-3 my-4 font-mono text-sm">
      <span className="text-code">
        <span className="text-muted select-none">$ </span>
        {children}
      </span>
      <CopyButton text={children} size="sm" />
    </div>
  ),

  // Step component for numbered instructions
  Step: ({ num, title, children }: { num: number; title: string; children: React.ReactNode }) => (
    <div className="flex gap-4 my-6">
      <div className="shrink-0 w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold text-sm">
        {num}
      </div>
      <div className="flex-1 pt-0.5">
        <h4 className="text-gold font-semibold mb-2 text-base">{title}</h4>
        <div className="text-dim/90 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  ),

  // Card section for grouping content
  Card: ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <div className="bg-card/50 border border-white/5 rounded-xl p-5 my-6">
      {title && <h4 className="text-gold font-semibold mb-3 text-base">{title}</h4>}
      <div className="text-dim/90 text-sm">{children}</div>
    </div>
  ),
}

export default mdxComponents
