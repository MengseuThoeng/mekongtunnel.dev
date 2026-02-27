'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Link from 'next/link'

interface DocContentProps {
  children: ReactNode
  title: string
  description?: string
}

export default function DocContent({ children, title, description }: DocContentProps) {
  return (
    <>
      {/* Animated breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex items-center gap-2 text-xs text-muted mb-8"
      >
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <Link href="/docs/getting-started" className="hover:text-gold transition-colors">Docs</Link>
        <span>/</span>
        <span className="text-dim">{title}</span>
      </motion.nav>

      {/* Animated header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="mb-10 pb-8 border-b border-white/5"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gold mb-3">{title}</h1>
        {description && (
          <p className="text-muted text-lg leading-relaxed">{description}</p>
        )}
      </motion.div>

      {/* Animated content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="prose max-w-none"
      >
        {children}
      </motion.div>
    </>
  )
}

interface DocNavProps {
  prev: { slug: string; title: string } | null
  next: { slug: string; title: string } | null
}

export function DocNav({ prev, next }: DocNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
      className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row gap-4"
    >
      {prev && (
        <a
          href={`/docs/${prev.slug}`}
          className="flex-1 group flex flex-col gap-1 bg-card border border-white/5 hover:border-gold/20 rounded-xl p-5 transition-all"
        >
          <span className="text-muted text-xs flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </span>
          <span className="text-dim font-semibold group-hover:text-gold transition-colors">{prev.title}</span>
        </a>
      )}
      {next && (
        <a
          href={`/docs/${next.slug}`}
          className="flex-1 group flex flex-col gap-1 bg-card border border-white/5 hover:border-gold/20 rounded-xl p-5 transition-all sm:items-end"
        >
          <span className="text-muted text-xs flex items-center gap-1">
            Next
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
          <span className="text-dim font-semibold group-hover:text-gold transition-colors">{next.title}</span>
        </a>
      )}
    </motion.div>
  )
}
