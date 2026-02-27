import CopyButton from './copy-button'

// Custom MDX components used when rendering docs
const mdxComponents = {
  // Code blocks are handled by rehype-pretty-code, but inline code gets styled via CSS
  // You can add custom components here that will be available in all MDX files

  // Example of a custom callout component available in MDX:
  // <Callout type="warning">text</Callout>
  Callout: ({
    type = 'info',
    children,
  }: {
    type?: 'info' | 'warning' | 'tip' | 'danger'
    children: React.ReactNode
  }) => {
    const styles = {
      info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
      warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
      tip: 'bg-green-500/10 border-green-500/30 text-green-300',
      danger: 'bg-red-500/10 border-red-500/30 text-red-300',
    }
    const icons = { info: 'ℹ️', warning: '⚠️', tip: '💡', danger: '🚨' }

    return (
      <div className={`border rounded-lg px-4 py-3 my-4 ${styles[type]}`}>
        <span className="mr-2">{icons[type]}</span>
        {children}
      </div>
    )
  },

  // Inline command with copy button
  Command: ({ children }: { children: string }) => (
    <div className="flex items-center justify-between gap-3 bg-[#0a0a14] border border-gold/20 rounded-lg px-4 py-3 my-3 font-mono text-sm">
      <span className="text-code">
        <span className="text-muted select-none">$ </span>
        {children}
      </span>
      <CopyButton text={children} size="sm" />
    </div>
  ),
}

export default mdxComponents
