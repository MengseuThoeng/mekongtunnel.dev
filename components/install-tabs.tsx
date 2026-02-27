'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CopyButton from './copy-button'
import { cn } from '@/lib/utils'

const BASE = 'https://github.com/MuyleangIng/MekongTunnel/releases/download/v1.0.0'

const PLATFORMS = [
  {
    label: 'macOS (Apple Silicon)',
    id: 'mac-arm',
    icon: '🍎',
    commands: [
      `sudo curl -L ${BASE}/mekong-darwin-arm64 -o /usr/local/bin/mekong`,
      'sudo chmod +x /usr/local/bin/mekong',
      'mekong 3000',
    ],
  },
  {
    label: 'macOS (Intel)',
    id: 'mac-amd',
    icon: '🍎',
    commands: [
      `sudo curl -L ${BASE}/mekong-darwin-amd64 -o /usr/local/bin/mekong`,
      'sudo chmod +x /usr/local/bin/mekong',
      'mekong 3000',
    ],
  },
  {
    label: 'Linux (amd64)',
    id: 'linux-amd',
    icon: '🐧',
    commands: [
      `sudo curl -L ${BASE}/mekong-linux-amd64 -o /usr/local/bin/mekong`,
      'sudo chmod +x /usr/local/bin/mekong',
      'mekong 3000',
    ],
  },
  {
    label: 'Linux (arm64)',
    id: 'linux-arm',
    icon: '🐧',
    commands: [
      `sudo curl -L ${BASE}/mekong-linux-arm64 -o /usr/local/bin/mekong`,
      'sudo chmod +x /usr/local/bin/mekong',
      'mekong 3000',
    ],
  },
  {
    label: 'Windows',
    id: 'windows',
    icon: '🪟',
    commands: [
      `# 1. Download mekong-windows-amd64.exe from GitHub releases`,
      `# 2. Rename to mekong.exe and add to PATH`,
      'mekong 3000',
    ],
  },
  {
    label: 'Go install',
    id: 'go',
    icon: '🐹',
    commands: [
      'go install muyleanging.com/mekongtunnel/cmd/mekong@latest',
      'mekong 3000',
    ],
  },
]

export default function InstallTabs() {
  const [active, setActive] = useState('mac-arm')
  const platform = PLATFORMS.find((p) => p.id === active) ?? PLATFORMS[0]

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Get started in seconds</p>
          <h2 className="text-3xl md:text-4xl font-bold text-dim">Install the CLI</h2>
          <p className="text-muted mt-4">One binary. No dependencies. Works on macOS, Linux, and Windows.</p>
        </motion.div>

        {/* Platform tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-wrap gap-2 mb-4 justify-center"
        >
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              className={cn(
                'px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2',
                active === p.id
                  ? 'bg-gold/15 text-gold border border-gold/30'
                  : 'bg-white/5 text-muted hover:text-dim hover:bg-white/8 border border-white/5 hover:border-white/10'
              )}
            >
              <span>{p.icon}</span>
              <span className="hidden sm:inline">{p.label}</span>
              <span className="sm:hidden">{p.id === 'go' ? 'Go' : p.id.split('-')[0]}</span>
            </button>
          ))}
        </motion.div>

        {/* Command block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="bg-[#0a0a14] border border-white/10 rounded-xl overflow-hidden"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-card/50">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="ml-2 text-xs text-muted/50 font-mono">Terminal</span>
          </div>
          <div className="p-5 space-y-3">
            {platform.commands.map((cmd, i) => (
              <div key={i} className="flex items-start justify-between gap-3 group">
                <div className="font-mono text-sm flex items-start gap-2 min-w-0">
                  {cmd.startsWith('#') ? (
                    <span className="text-muted/50 break-all">{cmd}</span>
                  ) : (
                    <>
                      <span className="text-muted/40 shrink-0 mt-px select-none">$</span>
                      <span className="text-code break-all">{cmd}</span>
                    </>
                  )}
                </div>
                {!cmd.startsWith('#') && (
                  <CopyButton text={cmd} size="sm" className="shrink-0 opacity-0 group-hover:opacity-100" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alt: raw SSH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          className="mt-8 bg-card border border-white/5 rounded-xl p-6"
        >
          <p className="text-dim font-semibold text-sm mb-3">Or use raw SSH (no install needed)</p>
          <div className="flex items-center justify-between gap-3 bg-[#0a0a14] border border-white/10 rounded-lg px-4 py-3 font-mono text-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-muted/40 select-none">$</span>
              <span className="text-code break-all">ssh -t -R 80:localhost:3000 mekongtunnel.dev</span>
            </div>
            <CopyButton text="ssh -t -R 80:localhost:3000 mekongtunnel.dev" size="sm" className="shrink-0" />
          </div>
          <p className="text-muted/60 text-xs mt-2">
            Replace <code className="text-code">3000</code> with your local port. The <code className="text-code">-t</code> flag is required.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
