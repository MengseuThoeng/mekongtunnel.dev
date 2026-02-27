'use client'

import { useState, useRef } from 'react'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  'data-language'?: string
}

export default function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  async function handleCopy() {
    const text = preRef.current?.textContent || ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="relative group">
      <pre ref={preRef} className={className} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        title="Copy code"
        className="absolute top-2 right-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100"
        style={{
          background: copied ? '#166534' : '#1e1e38',
          color: copied ? '#4ade80' : '#ffd700',
          border: copied ? '1px solid #22c55e' : '1px solid rgba(255, 215, 0, 0.3)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {copied ? (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </span>
        )}
      </button>
    </div>
  )
}
