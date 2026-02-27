'use client'

import { useEffect, useState } from 'react'

const BANNER =
  '  \u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557  \u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2557   \u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \n  \u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\u2588\u2588\u2551 \u2588\u2588\u2554\u255d\u2588\u2588\u2554\u2550\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d \n  \u2588\u2588\u2554\u2588\u2588\u2588\u2588\u2554\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2554\u255d \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2588\u2557\n  \u2588\u2588\u2551\u255a\u2588\u2588\u2554\u255d\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u255d  \u2588\u2588\u2554\u2550\u2588\u2588\u2557 \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551\u255a\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\n  \u2588\u2588\u2551 \u255a\u2550\u255d \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551  \u2588\u2588\u2557\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2551 \u255a\u2588\u2588\u2588\u2588\u2551\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\n  \u255a\u2550\u255d     \u255a\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d\u255a\u2550\u255d  \u255a\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u255d  \u255a\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u2550\u255d'

const STEPS = [
  { delay: 0, type: 'cmd', text: 'mekong 3000' },
  { delay: 800, type: 'banner', text: BANNER },
  { delay: 1000, type: 'info', text: '  by Ing Muyleang · Founder of KhmerStack' },
  { delay: 1100, type: 'sep', text: '  ─────────────────────────────────────────────────────' },
  { delay: 1200, type: 'dim', text: '  Server     mekongtunnel.dev' },
  { delay: 1300, type: 'dim', text: '  Local      localhost:3000' },
  { delay: 1400, type: 'sep', text: '  ─────────────────────────────────────────────────────' },
  { delay: 1600, type: 'conn', text: '  →  Connecting to mekongtunnel.dev...' },
  { delay: 2200, type: 'success', text: '  ✔  Tunnel is live!' },
  { delay: 2300, type: 'url', text: '     URL      https://happy-tiger-a1b2.mekongtunnel.dev' },
  { delay: 2400, type: 'dim', text: '     Expires  Feb 28, 2027 at 15:04 UTC (or 2h idle)' },
  { delay: 2600, type: 'clip', text: '  ✔  Copied to clipboard!' },
  { delay: 3400, type: 'log', text: 'GET  /                200  12ms' },
  { delay: 3900, type: 'log', text: 'GET  /api/health      200  3ms' },
  { delay: 4400, type: 'log', text: 'POST /api/submit      201  24ms' },
  { delay: 4900, type: 'log', text: 'GET  /static/app.js   200  8ms' },
]

type LineType = 'cmd' | 'banner' | 'info' | 'sep' | 'dim' | 'conn' | 'success' | 'url' | 'clip' | 'log'

interface Line {
  type: LineType
  text: string
}

function lineColor(type: LineType): string {
  switch (type) {
    case 'cmd': return 'text-green-400'
    case 'banner': return 'text-cyan-400'
    case 'info': return 'text-yellow-400/80'
    case 'sep': return 'text-white/20'
    case 'dim': return 'text-white/50'
    case 'conn': return 'text-white/40'
    case 'success': return 'text-green-400'
    case 'url': return 'text-purple'
    case 'clip': return 'text-green-400'
    case 'log': return 'text-white/40'
  }
}

export default function TerminalWindow() {
  const [lines, setLines] = useState<Line[]>([])
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []

    STEPS.forEach(({ delay, type, text }) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, { type: type as LineType, text }])
        }, delay)
      )
    })

    // Blink cursor
    const blinkInterval = setInterval(() => setCursor((c) => !c), 530)
    timers.push(blinkInterval as unknown as NodeJS.Timeout)

    return () => timers.forEach((t) => clearTimeout(t))
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1a1a2e] rounded-t-xl border border-white/10 border-b-0">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-muted/50 text-xs font-mono">mekong — zsh</span>
      </div>

      {/* Terminal body */}
      <div className="bg-[#0a0a14] rounded-b-xl border border-white/10 border-t-0 p-5 font-mono text-xs leading-5 min-h-[340px] overflow-hidden">
        {/* Prompt line */}
        <div className="flex items-center gap-1 mb-1">
          <span className="text-green-400/80">~</span>
          <span className="text-white/30">$</span>
          <span className="text-green-400 ml-1">
            {lines.length === 0 ? (
              <span className={cursor ? 'opacity-100' : 'opacity-0'}>█</span>
            ) : (
              lines[0].text
            )}
          </span>
        </div>

        {/* Output lines */}
        {lines.slice(1).map((line, i) => (
          <div key={i} className={lineColor(line.type)} style={{ whiteSpace: 'pre' }}>
            {line.text}
          </div>
        ))}

        {/* Trailing cursor */}
        {lines.length >= STEPS.length && (
          <div className="mt-2 flex items-center gap-1">
            <span className="text-green-400/80">~</span>
            <span className="text-white/30">$</span>
            <span className={`ml-1 text-green-400 ${cursor ? 'opacity-100' : 'opacity-0'}`}>█</span>
          </div>
        )}
      </div>
    </div>
  )
}
