'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DOC_NAV } from '@/lib/nav'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function DocSidebar({ currentSlug }: { currentSlug: string }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const SidebarContent = () => (
    <nav className="py-6 px-4">
      <p className="text-muted/60 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
        Documentation
      </p>
      <ul className="space-y-0.5">
        {DOC_NAV.map((item) => {
          const active = currentSlug === item.slug
          return (
            <li key={item.slug}>
              <Link
                href={`/docs/${item.slug}`}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex flex-col px-3 py-2.5 rounded-lg text-sm transition-all duration-150',
                  active
                    ? 'bg-gold/10 text-gold border-l-2 border-gold pl-[10px]'
                    : 'text-muted hover:text-dim hover:bg-white/5 border-l-2 border-transparent pl-[10px]'
                )}
              >
                <span className="font-medium">{item.title}</span>
                <span className={cn('text-xs mt-0.5', active ? 'text-gold/60' : 'text-muted/60')}>
                  {item.description}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-white/5 bg-card/30">
        <SidebarContent />
      </aside>

      {/* Mobile: collapsible */}
      <div className="lg:hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-gold text-bg font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg shadow-gold/20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Docs menu
        </button>

        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-bg/70 backdrop-blur-sm z-40"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="fixed left-0 top-0 bottom-0 w-72 z-50 bg-card border-r border-white/10 overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
                <span className="text-gold font-bold tracking-wider text-sm">MEKONGTUNNEL</span>
                <button onClick={() => setMobileOpen(false)} className="text-muted hover:text-dim">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <SidebarContent />
            </aside>
          </>
        )}
      </div>
    </>
  )
}
